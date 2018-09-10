# eslint-plugin-react-intl

ESLint rules for using react intl

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-intl`:

```
$ npm install eslint-plugin-react-intl --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-intl` globally.

## Usage

Add `react-intl` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-intl"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-intl/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





