module.exports = {
    style: {
        postcss: {
            mode: "extends",
            loaderOptions: {
                plugins: [
                  require("postcss-env-function")({
                    // Allow usage of the "env(--css-var)" syntax, which is not official yet.
                    // Consider an "@media()" rule. In that context, "var(--my-var)" does
                    // not work. The "env(--my-bar)" syntax is being proposed as an alternative.
                    importFrom: "./src/postcss-environment-variables.js"
                  })
                ]
            }
        }
    }
};
