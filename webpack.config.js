import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

// const stylesHandler = MiniCssExtractPlugin.loader;

/** @type {import("webpack").Configuration} */
const config = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve('./dist'),
    asyncChunks: true,
    filename: 'js/[name].bundle.js',
  },
  mode: 'development',
  target: 'web',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    liveReload: true,
    static: {
      directory: path.resolve('./client/public'),
    },
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        router: () => 'http://localhost:8000',
        logLevel: 'debug',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./client/public/index.html'),
    }),
    // new MiniCssExtractPlugin(),
  ],
};

export default config;
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const isProduction = process.env.NODE_ENV == "production";

// const stylesHandler = MiniCssExtractPlugin.loader;

// const config = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//   },
//   devServer: {
//     open: true,
//     host: "localhost",
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "index.html",
//     }),

//     new MiniCssExtractPlugin(),

//     // Add your plugins here
//     // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/i,
//         loader: "babel-loader",
//       },
//       {
//         test: /\.css$/i,
//         use: [stylesHandler, "css-loader", "postcss-loader"],
//       },
//       {
//         test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//         type: "asset",
//       },

//       // Add your rules for custom modules here
//       // Learn more about loaders from https://webpack.js.org/loaders/
//     ],
//   },
// };

// module.exports = () => {
//   if (isProduction) {
//     config.mode = "production";
//   } else {
//     config.mode = "development";
//   }
//   return config;
// };
