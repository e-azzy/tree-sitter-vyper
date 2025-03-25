; Identifiers
(identifier) @variable

; Keywords and Special Words
[
  "def"
  "import"
  "constant"
  "public"
] @keyword

; Decorators
(decorator 
  "@" @punctuation.special
  (identifier) @decorator)

; Function Definitions
(function_definition 
  name: (identifier) @function)

; Parameters
(parameter 
  name: (identifier) @parameter
  type: (type (identifier) @type))

; Types
(type (identifier) @type)

; Literals
(number) @number
(string) @string

; Comments
(comment) @comment
(docstring) @comment.documentation

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
] @operator

; Punctuation
[
  "("
  ")"
  ":"
  ","
  "."
] @punctuation.delimiter