const targetOptions = require('./targetOptions').targetOptions
const findSupportedBrowsers = require('./findSupportedBrowsers')

module.exports = function getBabelConfig(option) {

  const babelPlugins = [
    '@babel/plugin-syntax-dynamic-import',
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
    '@babel/plugin-proposal-class-properties'
  ]

  const preset = {}

  if (option !== targetOptions['esm-bundled']) {
    babelPlugins.push(['@babel/plugin-transform-runtime', {
      useESModules: true,
      corejs: false,
    }])

    preset.loose = true
    preset.useBuiltIns = 'entry'
    preset.corejs = 3
    preset.modules = false

    if (option === targetOptions['es5-bundled']) {
      preset.targets = findSupportedBrowsers()
    } else {
      preset.targets = 'IE 11'
    }

  } else {
    preset.targets = {
      esmodules: true
    }
  }

  return {
    babelPlugins,
    preset
  }
}