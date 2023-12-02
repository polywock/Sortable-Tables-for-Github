const { resolve } = require("path")
const { env } = require("process")

const common = {
  target: "browserslist",
  entry: {
    content: "./src/content.ts"
  },
  output: {
    path: resolve(__dirname, "build", "unpacked")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  }
}

if (env.NODE_ENV === "production") {
  module.exports = {
    ...common,
    mode: "production"
  }
} else {
  module.exports = {
    ...common,
    mode: "development",
    devtool: false
  }
}