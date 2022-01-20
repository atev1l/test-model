module.exports = {
  reactStrictMode: true,
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      }
    })
    config.module.rules.push({
      test: /\.(bin)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: "/_next/static/images",
          outputPath: "static/images/",
          name: '[name].[ext]' // keep the original name
        }
      },
    });
    return config
  }
}
