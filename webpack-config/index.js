const HtmlWebpackPlugin = require('html-webpack-plugin');
const getBabelTarget = require('./getBabelTarget')
const GenerateSW = require('workbox-webpack-plugin').GenerateSW
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (option) => {

  const outDir = path.resolve(process.cwd(), `server/build/${option}`)

  return {
    mode: 'production',
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
          test: /\.js$|.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
                '@babel/plugin-proposal-class-properties',
              ],
              presets: [
                "@babel/preset-typescript",
                [
                  '@babel/preset-env',
                  {
                    targets: getBabelTarget(option)
                  },
                ],
              ],
            },
          },
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
          base: '/' + option + '/'
        }
      }),
      new GenerateSW({
        navigateFallback: 'index.html',
        importWorkboxFrom: 'local'
      }),
      new CopyPlugin([
        { from: 'manifest.json', to: path.resolve(outDir, 'manifest.json') },
        { from: 'images', to: path.resolve(outDir, 'images') },
      ]),
      new ManifestPlugin({
        fileName: 'push-manifest.json',
        filter: (fileDescriptior) => fileDescriptior.isInitial,
        generate: (seed, files) => (
          files.reduce((manifest, { name, path }) => {
            const fileName = '/' + name
            const fileData = {
              weight: 1,
              type: 'script' // UPGRADE TO DETECT OTHER FILE TYPES!
            }
            return ({ ...manifest, [fileName]: fileData })
          }, seed)
        )
      })
    ]
  }
}