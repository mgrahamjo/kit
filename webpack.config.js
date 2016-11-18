module.exports = {
  entry: ['./universal/routes.js'],
  output: {
    path: __dirname,
    filename: './universal/dist/bundle.js'
  },
  devtool: 'cheap-module-source-map',
  loaders: [
    {
      test: /\.js$/,
      include: './universal',
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
      }
    }
  ]
};
