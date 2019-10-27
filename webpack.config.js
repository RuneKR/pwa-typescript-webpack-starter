const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
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
                  targets: {
                    esmodules: true
                  }
                },
              ],
            ],
          },
        },
      }
    ]
  },
  output: {
    filename: '[name].development.js',
    chunkFilename: 'chunk-[id].development.js'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      templateParameters: {
        base: '/'
      }
    })
  ]
};