// postcss-syntax, along with postcss-jsx, is used to parse CSS within a
// css`` template literal. At the moment, no configuration aside from just
// loading the module seems necessary.
const syntax = require("postcss-syntax");

module.exports = {
  syntax,
  plugins: {
    // Allow usage of the "env(--css-var)" syntax, which is not official yet.
    // Consider an "@media()" rule. In that context, "var(--my-var)" does
    // not work. The "env(--my-bar)" syntax is being proposed as an alternative.
    "postcss-env-function": {
      importFrom: "./app/css/environment.js"
    }
  }
};
