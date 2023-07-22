# SPL (Simple Programming Language)

**SPL** is a programming language which has syntax closer to the English Grammar. [Playground][demo]

## Why SPL?

I built this language because I wanted to know what it takes to build a programming language without knowing or
understanding much of compiler design. I challenged myself to do this and I am pretty happy with the result and have
created this README and [Playground][demo] just to share this with you all.

## Syntax

> Fun Fact: The syntax is heavily influenced by Python and Javascript.

## Primitive data-types

You have three primitive types at your disposal:

- `number`: `123`, `45.67`
- `string`: `'I am a string'`
- `boolean`: `true` and `false`

> Note: `string` can only be defined using single quotes.

## Non-primitive data-types

### Array

Here, I am using the term `array` but this behaves like an `ArrayList` or a vector.

- Array can be of 3 types: `number`, `string` or `boolean`.
- No support for jagged or multi-dimensional arrays.
- Non-numeric arrays cannot be accessed via indices.

Example:

- `[ 1, 2, 3 ]`
- `[true, false, false]`

#### Operations on array

- `pop from` will remove the last element from the array.
- `push`-`into` will push an item at the last of the array.
- `length of` will return the length of the array

![Imgur](https://i.imgur.com/ANvmuJd.png)

- If you want to use `length of` in a complex arithmetic expression, make sure to wrap it in parentheses. eg:
  `1 * (2 + (length of numberArray))`
- Finding length of a naked array does not work. eg., `length of [1, 2, 3, 4]` won't work. Store the array in some
  variable first and then use that variable to get the length

## Variable Declaration

You can declare variables as shown below.

![Imgur](https://i.imgur.com/viep2v5.png)

- Don't forget the punctuation mark, comma, in declaration of an array.
- You must initialize the variable to some value when declaring it.

## Updates to a variable

To modify the values in the variables, you use the `set` keyword.

![Imgur](https://i.imgur.com/L8DVsX3.png)

## Printing

To output something, use the `display` keyword. By default, a new line character will be added by the `display` command
at the end.

![Imgur](https://i.imgur.com/BcUJXgw.png)

The output of the above commands will be

```
Hello World
123
A number less than 1000, is: 200.
1,2,3,4
true
```

> To display more than one values on the same line, pass them as comma separated values to the display command.

## Arithmetic operations

Supports `+`, `-`, `*`, `/` and `%` operators.

![Imgur](https://i.imgur.com/TLljJ7Q.png)

## Conditionals

Notice the punctuation, comma, after the boolean expression.

![Imgur](https://i.imgur.com/UlPUXvy.png)

> Note: If you want to use arithmetic expressions in the boolean expression, then use them without having any whitespace
> between them and no parentheses in arithmetic expressions inside a boolean expression, or unexpected things may occur.
> eg. `1 + 2 * 3 * 1 < 4` won't work but `1+2*3*1 < 4` will. It is recommended to store the result of the arithmetic
> expression in a variable and then use that variable to compare.

## Loops

### Repeated Execution

Three variations

- `loop for x times`
- `loop for x times with i as counter`
- `loop while <EXPRESSION_IS_TRUE>`

![Imgur](https://i.imgur.com/exjT29r.png)

### Iterating over arrays

Two variations

- `for every item in arr`
- `for every item in arr with i as index`

![Imgur](https://i.imgur.com/EXr747m.png)

## Functions

![Imgur](https://i.imgur.com/no2mrSj.png)

To invoke a function, use the `result of` command if the function returns something, else, use `execute` command to just
execute the function.

![Imgur](https://i.imgur.com/DEy2zR0.png)

> You cannot call the function inside any expression. To use the return value of any function, you first store it in
> some variable, and then use that variable expression. Example,
> `let number a be result of add(1,  (result of add(2, 3)))` or `let number b be 1 + (result of add(2, 3))` won't work.

## Language Notes and Caveats

- Output will be printed all at once instead of printing when display is called.
- Indentation is extremely important (just like Python)
- 4-spaces or 1 tab character for indentation
- Comments are not supported in this iteration
- Errors may not be that helpful as of now, but it will at least try to point you to the line where the error is, or the
  starting line of the block, that has error.
- Escape character is not supported in this iteration
- Bitwise operators don't work
- Cannot take inputs from the user
- Cannot declare a variable as a constant
- Arithmetic expressions in boolean expressions are supported, **only without spaces**
- Ternary operators are not supported
- Lastly, you cannot do Object oriented programming in this language

## Notes for people, who are familiar with programming

- I have tried to handle a lot of scenarios and tested a lot as well. But, I may have missed something, and I request
  you that if you find something which is not expected or is not documented, please let me know, so I can fix that.

- If you are already familiar with programming, then you may often find some errors because the style of this language
  is a bit different from the popular programming languages like Python, Javascript, etc. You might miss out some
  punctuation mark, or maybe you forgot to add `resut of` operator before calling a function, though it is valid in
  other languages, but it won't be parsed in this language. I myself struggle to write a simple program in SPL. So, I
  recommend that instead of starting from scratch, choose from one of the examples, which can be found beside the
  editor, and modify them accordingly. This way, you will encounter fewer errors.

  [demo]: https://vighnesh153.dev/projects/spl
