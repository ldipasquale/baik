const env = require('./env.js')

module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    [
      "transform-define",
      env
    ],
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "components": "./components",
          "config": "./config",
          "constants": "./constants",
          "services": "./services",
          "stylesheets": "./stylesheets",
          "util": "./util"
        }
      }
    ]
  ]
}
