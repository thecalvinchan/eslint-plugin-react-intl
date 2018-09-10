/**
 * @fileoverview No JSXText elements without FormattedMessage
 * @author Calvin Chan <calvin.chan.h@gmail.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "No JSXText elements without FormattedMessage",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // give me methods
            JSXElement: (node) => {
              if (node.children.length > 0) {
                node.children.map((childNode) => {
                  if ((childNode.type === 'JSXText' || childNode._babelType === 'JSXText') && /\S+/.test(childNode.value)) {
                    context.report({
                        node: node,
                        message: "JSXText should not be rendered without FormattedMessage",
                    });
                  }
                })
              }
            }
        };
    }
};
