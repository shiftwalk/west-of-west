module.exports = {
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat',
    //   });
    // }
    
    config.module.rules.push({
      test: /csp-worker\.js$/,
      use: { loader: "worker-loader" },
    })
  
    config.output.chunkLoadingGlobal = 'this'

    return config
  },
};