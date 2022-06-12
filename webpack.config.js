
module.exports = {
  entry: ["./src/app/app.module.ts", "./src/css/index.ts"],
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".webpack.js,", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader" 
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      { 
        test: /\.html$/i, 
        loader: "html-loader" 
      }
    ]
  },
  optimization: {
    minimize: false
  },
};