const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: 'production',
  entry: {
    "forms-flow-webcomponent": glob.sync("build/static/js/main.*.js").map(f => path.resolve(__dirname, f)),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "forms-flow-webcomponent.js",
    library: 'FormsFlowWebComponent',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    axios: 'axios',
    'keycloak-js': 'Keycloak',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug'],
          },
          mangle: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};