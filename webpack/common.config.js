/* eslint-disable import/no-extraneous-dependencies */
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {
  NativeFederationTestsRemote,
  // eslint-disable-next-line import/no-unresolved
} = require('@module-federation/native-federation-tests/webpack');
const {
  NativeFederationTypeScriptRemote,
  // eslint-disable-next-line import/no-unresolved
} = require('@module-federation/native-federation-typescript/webpack');
const nodePath = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PROJECT_ID } = require('./constants');
const moduleFederationConfig = require('./mfe/module-federation.config');

const path = nodePath.resolve(__dirname, '../build');
module.exports = {
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    modules: ['src', 'node_modules'],
  },
  output: {
    filename: `${PROJECT_ID}/assets/index_[contenthash].js`,
    chunkFilename: `${PROJECT_ID}/assets/chunk.[name].[contenthash].js`,
    path,
    /*
     * output.uniqueName string
     * A unique name of the webpack build to avoid multiple webpack runtimes to conflict when using globals.
     * It defaults to output.
     * Library name or the package name from package.json in the context, if both aren't found, it is set to an ''.
     * output.uniqueName will be used to generate unique globals for: output.chunkLoadingGlobal
     * more info : https://webpack.js.org/configuration/output/#outputuniquename
     * */
    uniqueName: PROJECT_ID,
    clean: true,
  },
  devtool: 'source-map',
  // force optimization false, since all module federations loads its resources on demand
  optimization: {
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        projectId: PROJECT_ID,
      },
      template: './public/template.ejs',
      cache: false,
      hash: true,
    }),
    new ModuleFederationPlugin(moduleFederationConfig),
    NativeFederationTypeScriptRemote({
      moduleFederationConfig,
      compilerInstance: 'tsc',
    }),
    NativeFederationTestsRemote({
      moduleFederationConfig: {
        ...moduleFederationConfig,
      },
      distFolder: path,
      deleteTestsFolder: true,
      additionalBundlerConfig: { format: 'esm' },
    }),
  ],
  infrastructureLogging: { level: 'log', colors: true },
};
