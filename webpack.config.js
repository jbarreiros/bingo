const path = require("path");

module.exports = {
  mode: "production",
  entry: "./app/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
