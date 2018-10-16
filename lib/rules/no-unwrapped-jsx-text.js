/**
 * @fileoverview No JSXText elements without FormattedMessage
 * @author Calvin Chan <calvin.chan.h@gmail.com>
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'No JSXText elements without FormattedMessage',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    const parseForImport = (globalScope, fixer) => {
      let i = 0
      let importDeclaration, importNode
      let firstImportDeclaration = globalScope.block.body[0]
      while (i < globalScope.block.body.length) {
        if (globalScope.block.body[i].type === 'ImportDeclaration') {
          firstImportDeclaration = globalScope.block.body[i]
          break
        }
        i++
      }
      
      while (i < globalScope.block.body.length && (importNode = globalScope.block.body[i++]).type === 'ImportDeclaration') {
        importDeclaration = importNode
        if (importNode.source.value === 'react-intl') {
          // add to the named imports of an existing import declaration
          // TODO: need to search for existing import here in specifiers
          return fixer.insertTextAfter(importNode.specifiers[importNode.specifiers.length - 1], ', ' + 'FormattedMessage')
        }
      }
      const importStatement = 'import { FormattedMessage } from \'react-intl\'\n'
      if (importDeclaration) {
        return fixer.insertTextAfter(importDeclaration, '\n' + importStatement)
      }
      if (firstImportDeclaration) {
        return fixer.insertTextBefore(firstImportDeclaration, importStatement)
      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // give me methods
      JSXElement: node => {
        if (node.children.length > 0) {
          node.children.map(childNode => {
            if (
              (childNode.type === 'JSXText' ||
                childNode._babelType === 'JSXText') &&
              /\S+/.test(childNode.value)
            ) {
              context.report({
                node: node,
                message:
                  'JSXText should not be rendered without FormattedMessage',
                fix: function(fixer) {
                  // adds import 
                  let importFixer = parseForImport(context.getScope(), fixer)
                  return [
                    importFixer,
                    fixer.insertTextBefore(
                      childNode,
                      '<FormattedMessage defaultMessage="'
                    ),
                    fixer.insertTextAfter(childNode, '" />'),
                  ]
                },
              })
            }
          })
        }
      },
    }
  },
}
