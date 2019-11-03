const baseConfig = require('./webpack-config')
const productionMode = 'production'

module.exports = [
  baseConfig('esm-bundled', productionMode),
  baseConfig('es5-bundled', productionMode),
  baseConfig('es6-bundled', productionMode)
]