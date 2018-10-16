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
      category: 'i18n',
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

    const parseForImport = (context, fixer) => {
      const globalScope = context.getAncestors()
      let body
      if (globalScope.length > 0) {
        body = globalScope[0].body
      } else {
        body = context.getScope().block.body
      }
      let i = 0
      let importDeclaration, importNode
      let firstImportDeclaration = body[0]
      while (i < body.length) {
        if (body[i].type === 'ImportDeclaration') {
          firstImportDeclaration = body[i]
          break
        }
        i++
      }
      
      while (i < body.length && (importNode = body[i++]).type === 'ImportDeclaration') {
        importDeclaration = importNode
        if (importNode.source.value === 'react-intl') {
          // add to the named imports of an existing import declaration
          // TODO: need to search for existing import here in specifiers
          const numSpecifiersFormattedMessage = importNode.specifiers.filter(specifier => specifier.imported.name === 'FormattedMessage').length
          if (numSpecifiersFormattedMessage === 0) {
            return fixer.insertTextAfter(importNode.specifiers[importNode.specifiers.length - 1], ', ' + 'FormattedMessage')
          } else {
            return null
          }
        }
      }

      const importStatement = 'import { FormattedMessage } from \'react-intl\'\n'
      /**
      if (importDeclaration) {
        return fixer.insertTextAfter(importDeclaration, '\n' + importStatement)
      }
      **/
      // Always import react-intl first for now
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
									const fixers = [
										fixer.insertTextBefore(
											childNode,
											'<FormattedMessage defaultMessage="'
										),
										fixer.insertTextAfter(childNode, '" />'),
									]
									let importFixer = parseForImport(context, fixer)
									if (importFixer) {
										return [
											importFixer,
											...fixers
										]
									}
									return fixers
                },
              })
            }
          })
        }
      },
    }
  },
}
