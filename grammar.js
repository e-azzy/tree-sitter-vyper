/**
 * @file A tree-sitter for Vyper language
 * @author Gustavo Oliveira
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'vyper',

  rules: {
    // Source file with precedence
    source_file: $ => prec.left(2, repeat(choice(
      $.comment,
      $.import_statement,
      $.constant_definition,
      $.variable_definition,
      $.decorator,
      $.function_definition,
      $.whitespace
    ))),

    // Basic tokens
    identifier: $ => /[a-zA-Z_]\w*/,

    // Whitespace and Comments
    comment: $ => choice(
      seq('#', /.*/), // Single-line comments
      $.docstring     // Multi-line docstrings
    ),

    docstring: $ => choice(
      /"""[\s\S]*?"""/,
      /'''[\s\S]*?'''/ 
    ),

    whitespace: $ => /\s+/,

    // Decorators
    decorator: $ => seq(
      '@',
      $.identifier,
      optional(seq('(', optional($.argument_list), ')'))
    ),

    // Constants and Variables
    constant_definition: $ => seq(
      $.identifier,
      ':',
      'constant',
      '(',
      $.type,
      ')',
      '=',
      $.expression
    ),

    variable_definition: $ => seq(
      $.identifier,
      optional(seq(':', optional('public'), '(', $.type, ')')),
      '=',
      $.expression
    ),

    // Function Definition with precedence
    function_definition: $ => prec.left(1, seq(
      repeat($.decorator),
      'def',
      $.identifier,
      '(',
      optional($.parameter_list),
      ')',
      optional(seq('->', $.type)),
      ':'
    )),

    // Parameters
    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter)),
      optional(',')
    ),

    parameter: $ => seq(
      $.identifier,
      ':',
      $.type,
      optional(seq('=', $.expression))
    ),

    // Type System
    type: $ => choice(
      $.identifier,
      $.array_type,
      $.map_type
    ),

    array_type: $ => seq(
      $.type,
      '[',
      optional($.expression),
      ']'
    ),

    map_type: $ => seq(
      'HashMap',
      '[',
      $.type,
      ',',
      $.type,
      ']'
    ),

    // Expressions
    expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.call_expression,
      $.binary_expression,
      $.attribute_expression,
      $.assert_expression // Add assert as a separate expression
    ),

    binary_expression: $ => prec.left(1, seq(
      $.expression,
      choice('+', '-', '*', '/', '%', '**'),
      $.expression
    )),

    call_expression: $ => seq(
      $.expression,
      '(',
      optional($.argument_list),
      ')'
    ),

    argument_list: $ => seq(
      $.expression,
      repeat(seq(',', $.expression)),
      optional(',')
    ),

    attribute_expression: $ => seq(
      $.expression,
      '.',
      $.identifier
    ),

    assert_expression: $ => seq('assert', $.expression), // Isolate assert

    // Literals
    number: $ => choice(
      $.decimal_number,
      $.hex_number,
      $.binary_number,
      $.octal_number,
      $.float_number
    ),

    decimal_number: $ => /0|[1-9]\d*/,
    hex_number: $ => /0x[\da-f]*/i,
    binary_number: $ => /0b[0-1]*/,
    octal_number: $ => /0o[0-7]*/,
    float_number: $ => /(\d+\.\d*|\.\d+)(e[-+]?\d+)?/,

    string: $ => choice(
      /"[^"]*"/,
      /'[^']*'/
    ),

    // Import statements (placeholder)
    import_statement: $ => seq(
      'import',
      $.identifier
    )
  },
});

