const { resolve } = require('core-js/fn/promise')
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
}