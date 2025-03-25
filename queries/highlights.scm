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
  (identifier) @function)

; Types
(type 
  (identifier) @type)

; Numbers
(number) @number
(decimal_number) @number
(hex_number) @number
(binary_number) @number
(octal_number) @number
(float_number) @number

; Strings
(string) @string

; Comments
(comment) @comment
(docstring) @comment.documentation