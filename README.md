# Spreadsheets interpreter with references

## Problem

Create the necessary code to process a CSV file and output the evaluation of
it's cells, allowing operations and cell references in their cells.

## Environment

For simplicity, this was developed to run in a Deno environment

## Execution

In this project the entrypoint is the file `./spreadsheet.ts`, which gets a CSV
filepath as an argument.

```shell
$ deno run --allow-read spreadsheet.ts input.csv
```

# Explanation

Since any cell could contain a reference to any other cell, it is acceptable to
approach this problem with a recursive implementation.

## Cell evaluation

After transforming the CSV file into a matrix (`string[][]` in this context),
this matrix is iterated with the function `evaluateCell`, which is going to
execute the following steps:

- Ensuring this cell hasn't been visited, which would be a circular reference
- Validate if it is a cell with a value previously computed, if it was computed
  before, it returns the known value.
- If this cell contains a Numeric value, just parse it if necessary and return
  it
- If none of the previous cases apply evaluates the postfix notation expression.

## Numeric Postfix notation expression

This popular data structures exercise, involves the use of a stack where the
numeric values are stored and then when an operator is found, it is executed
with the last 2 elements of the stack.

When the evaluation of the expression finished, there should be only one numeric
value as the result of this expression.

## Postfix notation expression with spreadsheet references

In this particular case, we also need to retrieve referenced values in this
expression, for this reason, we can find some kind of expressions in this
function:

- Numeric value, which is parsed
- Numeric operation.
- Cell reference, in this case the method `evaluateCell` is called recursively,
  to retrieve the value of the referenced cell.

_Notice that in the last case, the value of the referenced cell could be an
expression itself, which could lead to a nested call of the method
`evaluatePostfix`._

# Limitations

Since the iteration of a matrix has a high order of time complexity and the are
possible recursive calls with in the evaluation of each cell, it is important to
estate that this solution will require much more resources as the CSV file
grows. However, the use of dynamic programming in the evaluation of the cells,
reduces the impact of this.

There isn't any validation of the shape of the spreadsheets received, which
could lead to unexpected behaviour if the CSV isn't rectangular.

# Next steps

- Improve typing, bundling them for maintainability.
- Test thoroughly.
- The reference between cells is done via the string transformation to
  coordinates, this could improve if it was needed to make this code interactive
  (Reactive).
- Validate performance (?).
