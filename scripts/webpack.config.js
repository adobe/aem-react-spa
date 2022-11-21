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

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (webpackEnv, webpackConfig) => {
    // adjust file names
    webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';
    webpackConfig.output.filename = 'static/js/[name].js';
    
    const cssPlugin = webpackConfig.plugins.find(plugin => plugin instanceof MiniCssExtractPlugin);
    if (cssPlugin) {
        cssPlugin.options.chunkFilename = 'static/css/[name].chunk.css';
        cssPlugin.options.filename = "static/css/[name].css";
    }

    // set public path to auto and reset it to / for the htmlPlugin
    webpackConfig.output.publicPath = 'auto';

    const htmlPlugin = webpackConfig.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin);
    if (htmlPlugin) {
        htmlPlugin.userOptions.publicPath = '/'
    }

    return webpackConfig;
}
