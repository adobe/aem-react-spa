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

import {ModelClient} from '@adobe/aem-spa-page-model-manager';

/**
 * Used to make react-server possible (localhost development).
 */
export default class LocalDevModelClient extends ModelClient{

    fetch(modelPath) {

        if (!modelPath) {
            const err = `Fetching model rejected for path: ${modelPath}`;

            return Promise.reject(new Error(err));
        }

        // Either the API host has been provided or we make an absolute request relative to the current host
        const apihostPrefix = this._apiHost || '';
        const url = `${apihostPrefix}${modelPath}`;

        return fetch(url, {
            credentials: 'same-origin',
            headers: {
                'Authorization': process.env.REACT_APP_AEM_AUTHORIZATION_HEADER
            }
        }).then((response) => {
            if ((response.status >= 200) && (response.status < 300)) {
                return response.json() ;
            }

            return Promise.reject(response);
        }).catch((error) => {
            return Promise.reject(error);
        });

    }

}
