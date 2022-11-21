/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const proxyquire =  require('proxyquire');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// require env in order to load the .env files before the webpack config
require('react-scripts/config/env');

// require the original webpack config factory
const webpackConfigFactory = require('react-scripts/config/webpack.config');
const webpackConfigPatch = require('./webpack.config');

// delegate to the build.js script and stub the webpack.config import
proxyquire('react-scripts/scripts/start.js', {
    '../config/webpack.config': (webpackEnv) => webpackConfigPatch(webpackEnv, webpackConfigFactory(webpackEnv))
});
