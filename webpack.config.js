const path = require('path');

module.exports = {
  entry: './src/dutu.jsx',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader", 
        query:
            {
                presets:['@babel/react']
            }
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  optimization: {
		// We don't want a min version for this open source app
		minimize: false
	},

  output: {
    filename: 'dutu.js',
    path: path.resolve(__dirname, 'dist'),
  },
};