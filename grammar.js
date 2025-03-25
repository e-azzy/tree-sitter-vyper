/**
 * @file A tree-sitter for Vyper language
 * @author Gustavo Oliveira
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'vyper',

  rules: {
    source_file: $ => repeat(choice(
      $.comment,
      $.import_statement,
      $.function_definition,
      $.constant_definition,
      $.whitespace
    )),

    // Basic tokens
    identifier: $ => /[a-zA-Z_]\w*/,

    comment: $ => choice(
      seq('#', /.*/),
      $.docstring
    ),

    docstring: $ => choice(
      /"""[\s\S]*?"""/,
      /'''[\s\S]*?'''/
    ),

    whitespace: $ => /\s+/,

    // Import statements
    import_statement: $ => choice(
      seq('import', $.identifier),
      seq('from', $.identifier, 'import', $.identifier)
    ),

    // Number literals
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

    // Function definition
    function_definition: $ => seq(
      'def',
      $.identifier,
      '(',
      optional($.parameter_list),
      ')',
      optional(seq('->', $.type)),
      ':'
      // Add body parsing
    ),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.identifier,
      ':',
      $.type,
      optional(seq('=', $.expression))
    ),

    // Type system
    type: $ => choice(
      $.identifier,
      $.array_type,
      $.map_type
    ),

    array_type: $ => seq(
      $.type,
      '[',
      $.expression,
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

    // Expressions (simplified)
    expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.call_expression,
      // Add more expression types
    ),

    call_expression: $ => seq(
      $.identifier,
      '(',
      optional($.argument_list),
      ')'
    ),

    argument_list: $ => seq(
      $.expression,
      repeat(seq(',', $.expression))
    ),

    string: $ => choice(
      /"[^"]*"/,
      /'[^']*'/
    ),

    // Constants
    constant_definition: $ => seq(
      'constant',
      '(',
      $.type,
      ')',
      $.identifier,
      '=',
      $.expression
    )
  },

});
