; Identifiers
(identifier) @variable

; Keywords
[
  "def"
  "import"
  "from"
  "constant"
  "struct"
  "event"
] @keyword

; Function definitions
(function_definition 
  name: (identifier) @function)

; Types
(type (identifier) @type)

; Numbers
(number) @number

; Strings
(string) @string

; Comments
(comment) @comment
(docstring) @comment.documentation