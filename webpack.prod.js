const baseConfig = require('./webpack-config')

module.exports = [baseConfig('esm-bundled'), baseConfig('es5-bundled'), baseConfig('es6-bundled')]