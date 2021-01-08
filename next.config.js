const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  },
  env: {
        "SERVER_IP": "145.239.83.230",
        "SERVER_PORT": 7000,
    },
})