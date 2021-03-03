import path from 'path';
import { Configuration } from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config: Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './ts/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.ttf?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./html/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new BundleAnalyzerPlugin()
  ],
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  // devtool: 'hidden-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    open: true,
      port: 3000
  }
};

// webpack.config.ts が指定なしで呼ばれたとき、configを実行
export default config;