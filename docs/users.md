# Users

When a user signs up on my portal, NextAuth creates an entry in the `users` and `accounts` mongodb tables. Since these
tables are managed by NextAuth, I don't want to fiddle around with them so that future updates to the schema are
seamless and backwards compatible.

So, I have created a new table `user_info`. When a user sign's up to my portal, a new and unique entry will be created
in this table for the user. And this table will be used to store all the user specific information.
