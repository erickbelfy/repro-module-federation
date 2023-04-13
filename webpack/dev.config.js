/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');

const {
  AUTH_HOSTNAME,
  HOST,
  PROTOCOL,
  CLIENT_PORT,
  STATIC_CDN_URL,
  PROJECT_ID,
} = require('./constants');
const commonConf = require('./common.config');
const esLintConf = require('../.eslintrc');
const { httpServer, httpsServer } = require('./security');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: `${PROTOCOL}://${HOST}:${CLIENT_PORT}/`,
    chunkFilename: 'assets/chunk.[name].[contenthash].js',
    path: path.resolve(__dirname, '../build'),
    /*
     * output.uniqueName string
     * A unique name of the webpack build to avoid multiple webpack runtimes to conflict when using globals.
     * It defaults to output.
     * Library name or the package name from package.json in the context, if both aren't found, it is set to an ''.
     * output.uniqueName will be used to generate unique globals for: output.chunkLoadingGlobal
     * more info : https://webpack.js.org/configuration/output/#outputuniquename
     * */
    uniqueName: PROJECT_ID,
  },
  // force optimization false, since all module federations loads its resources on demand
  optimization: {
    runtimeChunk: false,
  },
  devtool: false,
  devServer: {
    // if you want to emulate a custom hostname please read this doc
    // https://jira.onespan.com/confluence/x/fQAqHQ
    host: HOST,
    port: CLIENT_PORT,
    /**
     *  for more information on how to load apps on HTTPS,
     *  https://jira.onespan.com/confluence/display/EAG/How+To%3A+Configure+hostnames+on+webpack#HowTo:Configurehostnamesonwebpack-HTTPS
     */
    server: PROTOCOL === 'http' ? httpServer : httpsServer(),
    proxy: [
      {
        context: ['/authentication/**', '/api/**'],
        changeOrigin: true,
        secure: false,
        target: AUTH_HOSTNAME,
        logLevel: 'debug',
      },
      // here we are proxying the entries to look closer to cloudflare servers
      {
        context: ['/*/remoteEntry.js', '/*/assets/**/*.js'],
        changeOrigin: true,
        secure: false,
        target: STATIC_CDN_URL,
        logLevel: 'debug',
      },
    ],

    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    allowedHosts: ['.onespan-internal.com', 'localhost'],
  },
  plugins: [
    new SourceMapDevToolPlugin({}),
    new ESLintPlugin({
      cache: true,
      cwd: path.resolve(__dirname),
      emitWarning: true,
      failOnError: false,
      formatter: 'codeframe',
      useEslintrc: false,
      baseConfig: esLintConf,
    }),
  ],
};

module.exports = merge(commonConf, devConfig);
