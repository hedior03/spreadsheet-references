# Directory content

In this directory `./src/validation` there are two utility functions that allow
us know the type of string that we are processing in runtime. For example,

```typescript
isNumeric("3.1415"); // returns: true

isNumeric("-3.1415"); // returns: true

isNumeric("+3.1415"); // returns: true

isNumeric("+-3.1415"); // returns: false

isNumeric("a1"); // returns: false

isNumeric("1 2 +"); // returns: false
```
