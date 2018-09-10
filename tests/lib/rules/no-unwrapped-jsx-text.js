/**
 * @fileoverview No JSXText elements without FormattedMessage
 * @author Calvin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unwrapped-jsx-text"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
});
ruleTester.run("no-unwrapped-jsx-text", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "const a = <div>asdf</div>",
            errors: [{
                message: "JSXText should not be rendered without FormattedMessage",
                type: "JSXElement"
            }]
        }
    ]
});
