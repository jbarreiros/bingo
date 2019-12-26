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
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "postcss-loader"]
      }
    ]
  }
};
