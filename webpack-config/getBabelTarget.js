const findSupportedBrowsers = require('./findSupportedBrowsers')

module.exports = function getBabelTarget(options) {
  if (options === 'esm-bundled') {
    return {
      esmodules: true
    }
  }

  if (options === 'es5-bundled') {
    return {
      browsers: 'ie 11'
    }
  }

  return {
    browsers: findSupportedBrowsers()
  }
}