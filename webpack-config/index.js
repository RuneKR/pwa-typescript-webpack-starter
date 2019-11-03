const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateSW = require('workbox-webpack-plugin').GenerateSW
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

const getBabelConfig = require('./getBabelConfig')

module.exports = (option, mode) => {

  const babelConfig = getBabelConfig(option)
  const outDir = path.resolve(process.cwd(), `server/build/${option}`)

  return {
    mode: mode,
    entry: './src/ords-app.ts',
    resolve: {
      extensions: ['.ts', '.js', '.mjs']
    },
    module: {
      rules: [
        {
          test: /\.(webp|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.m?js$|.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: babelConfig.babelPlugins,
              presets: [
                "@babel/preset-typescript",
                [
                  '@babel/preset-env',
                  babelConfig.preset,
                ],
              ],
            },
          },
        },
        {
          test: /\.m?js$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              plugins: babelConfig.babelPlugins,
              presets: [
                [
                  '@babel/preset-env',
                  babelConfig.preset,
                ],
              ],
            },
          }
        }
      ]
    },
    output: {
      filename: '[name].js',
      chunkFilename: 'chunk-[id].js',
      path: outDir,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        templateParameters: {
          base: mode === 'development' ? '/' : '/' + option + '/'
        }
      }),
      mode === 'production' ? new GenerateSW({
        navigateFallback: 'index.html',
        clientsClaim: true,
        importWorkboxFrom: 'local'
      }) : undefined,
      mode === 'production' ? new CopyPlugin([
        { from: 'manifest.json', to: path.resolve(outDir, 'manifest.json') },
        { from: 'images', to: path.resolve(outDir, 'images') },
      ]) : undefined,
      mode === 'production' ? new ManifestPlugin({
        fileName: 'push-manifest.json',
        filter: (fileDescriptior) => fileDescriptior.isInitial,
        generate: (seed, files) => (
          files.reduce((manifest, { name }) => {
            const fileName = '/' + name
            const fileData = {
              weight: 1,
              type: 'script' // UPGRADE TO DETECT OTHER FILE TYPES!
            }
            return ({ ...manifest, [fileName]: fileData })
          }, seed)
        )
      }) : undefined
    ].filter(Boolean),
    devServer: {
      historyApiFallback: true
    }
  }
}