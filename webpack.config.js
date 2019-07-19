module.exports = {
  mode: "development",

  entry: {
      main: "./frontend/src/main.tsx",
  },

  output: {
      filename: "[name].bundle.js",
      chunkFilename: '[name].chunk.js',
      path: __dirname + "/dist/frontend",
      publicPath: "/assets/"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"]
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          {
              test: /\.tsx?$/,
              loader: "ts-loader",
          },

          {
            test: /\.(scss)$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
      ]
  },
  optimization: {
      splitChunks: {
          chunks: "all"
      },
      usedExports: true
  },
};
