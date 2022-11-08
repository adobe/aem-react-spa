const proxyquire =  require('proxyquire');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// require env in order to load the .env files before the webpack config
require('react-scripts/config/env');

// require the original webpack config factory
const webpackConfigFactory = require('react-scripts/config/webpack.config');
const webpackConfigPatch = (webpackEnv, webpackConfig) => {
    // TODO: patch webpack configuration
    return webpackConfig;
}

// delegate to the build.js script and stub the webpack.config import
proxyquire('react-scripts/scripts/build.js', {
    '../config/webpack.config': (webpackEnv) => webpackConfigPatch(webpackEnv, webpackConfigFactory(webpackEnv))
});
