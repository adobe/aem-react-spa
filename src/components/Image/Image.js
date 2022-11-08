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

import React from "react";
import { EditableComponent, MapTo } from "@adobe/aem-react-editable-components";

require("./Image.css");

export const ImageEditConfig = {
    emptyLabel: "Image",

    isEmpty: function (props) {
        return !props || !props.src || props.src.trim().length < 1;
    },
};

/**
 * Export the non-EditableImage object, so this can be embedded in ../Card/Card.js
 * and not supersede the Card's edit chrome.
 */
export const Image = (props) => {
    if (ImageEditConfig.isEmpty(props)) {
        return null;
    }

    return (
        <div className="Image">
            <img
                className="Image-src"
                src={props.src}
                alt={props.alt}
                title={props.title ? props.title : props.alt}
            />
        </div>
    );
};

const EditableImage = (props) => {
    return (
        <EditableComponent config={ImageEditConfig} {...props}>
            <Image {...props} />
        </EditableComponent>
    );
};

MapTo("foundation/components/image")(EditableImage)
MapTo("wcm/foundation/components/image")(EditableImage)

export default MapTo("testing-frontend-general/components/image")(EditableImage);
