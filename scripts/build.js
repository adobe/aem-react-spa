const proxyquire =  require('proxyquire');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// require env in order to load the .env files before the webpack config
require('react-scripts/config/env');

// require the original webpack config factory
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfigFactory = require('react-scripts/config/webpack.config');
const webpackConfigPatch = (webpackEnv, webpackConfig) => {
    // adjust file names
    webpackConfig.optimization.splitChunks.name = true;
    webpackConfig.optimization.runtimeChunk.name = 'bundle';
    webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';
    webpackConfig.output.filename = 'static/js/[name].js';
    
    const cssPlugin = webpackConfig.plugins.find(plugin => plugin instanceof MiniCssExtractPlugin);
    cssPlugin.options.chunkFilename = 'static/css/[name].chunk.css';
    cssPlugin.options.filename = "static/css/[name].css";

    return webpackConfig;
}

// delegate to the build.js script and stub the webpack.config import
proxyquire('react-scripts/scripts/build.js', {
    '../config/webpack.config': (webpackEnv) => webpackConfigPatch(webpackEnv, webpackConfigFactory(webpackEnv))
});
