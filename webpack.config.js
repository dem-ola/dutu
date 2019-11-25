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
		minimize: true
	},

  output: {
    filename: 'dutu.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
