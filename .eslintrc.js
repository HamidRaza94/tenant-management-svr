module.exports = {
  "env": {
    "browser": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "extends": [
    "airbnb"
  ],
  "rules": {
    "indent": [0, "tab"],
    "no-tabs": 0,
    "key-spacing": [0, { "mode": "minimum" }],
    "quotes": 0,
    "semi": 0,
    "quote-props": 0,
    "react/forbid-prop-types": 0,
    "import/no-extraneous-dependencies": 0,
    "no-multi-spaces": 0,
    "no-param-reassign": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/prop-types": 0,
    "func-names": ["error", "as-needed"],
    "jsx-a11y/href-no-hash": "off",
    "import/prefer-default-export": false,
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ],
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreComments": true
      }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id",
          "_str"
        ]
      }
    ],
    "object-curly-newline": ["error", { "consistent": true }]
  }
};
