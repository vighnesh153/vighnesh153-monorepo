# Dealing with duplicate messages in SQS

It is not possible to prevent duplicate messages coming through from SQS. Most of the time, your messages will be handed
over to one of your consumers only once, but you will run into duplicates at some stage.

There is no simple solution to this other than coming up with a proper architecture that can cope with duplicates. To
discuss an approach to handle this we will take an example of a problem that I was solving a few days back.

### Problem

I had a _sign-up_/_sign-in_ mechanism on my `vighnesh153.com` portal where users could _sign up_/_sign in_ using their
Google accounts. Now, whenever they registered for the first time, I wanted to send them a welcome email only once.

### Solution

My approach to avoid duplicate message processing includes the following mechanisms

#### Message State Store

This store which will hold the latest state of the message whether it is in `MessageReceived`, `ProcessingInProgress` or
`ProcessingComplete` state.

This store should ideally be a SQL database because in a SQL database, you can have unique constraints and locks which
would help fight the race conditions where multiple workers get the same message at the same time.

> In my solution, I have used MongoDB as the StateStore because SQL DBs are a bit painful (& expensive) to set up for a
> personal project. Might do this in future though.

#### `UserRegistered` SNS topic

Whenever a new user registered, I create a `UserRegistered` notification

#### `WelcomeEmail` SQS Queue

This SQS queue is subscribed to the `UserRegistered` notification. On new message, it triggers a lambda

#### `WelcomeEmailWorker` Lambda

This lambda is triggered when there is a new message in the SQS queue. When this lambda receives a new message, it does
the following:

- Checks if there is an entry for this message in the `StateStore`
  - If it is in the `ProcessingInProgress` state, and it has not expired yet, then it just exits without processing the
    message.
  - If it is in `ProcessingComplete` state, then also it exits without processing the message
- Creates an entry in a table in Database.
  - Sets the state to `ProcessingInProgress`
  - Sets to expiry duration. (5 minutes from now)
- Drafts the email and sends it to the new user
- Sets the state of the current message in `StateStore` as `ProcessingComplete`
- Removes the message from the SQS queue

> Expiry is required so that if there is some failure in the intermediate steps, this message should get processed again

## What about SQS FIFO queues

Unlike standard queues, FIFO queues don't introduce duplicate messages. FIFO queues help you avoid sending duplicates to
a queue. If you send the same message within the 5-minute deduplication interval, it won't introduce any duplicates into
the queue

### Cons

- 3000 transactions per second throughput
- No customization for the 5-minute deduplication interval
- 20% expensive than Standard queues

If your project has less than 3000 TPS or if you don't need customization for the default deduplication interval, FIFO
queues would be perfect for your project

## Conclusion

This is how I have approached handling duplicates message in an SQS queue.

Is this the best way to handle duplicates? **I don't know**.

Does this solve the duplicate message processing problem completely? **Certainly not**.

In what scenarios will this fail?

- If after sending the email, there is some failure in updating the `StateStore`, this message might get processed again
  in the future which would send a duplicate email to the user
- There could be a race condition where 2 workers would get the same message at the same time, and they both read/write
  from and to the `StateStore` at the same time, the user might get a duplicate email

The above 2 scenarios are very rare and hence not a major cause of concern to me.
