## Parsing
Here's a list of parsers from easiest to make to hardest.

* Parser combinators <- You could have invented this yourself
* Recursive descent
* Pratt / operator precedence <- The example in the book
* Table driven LL(k)
* LALR and its ilk (table-driven bottom-up) <- From here on it's easier to make a program that generates the parsing code for you because it's easier to reason about a parser generator than it is to trace the contents of the parsing tables manually
* GLR / concurrent parsers of ambiguous grammars