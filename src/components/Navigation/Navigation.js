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

import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import {Link} from "react-router-dom";

const NavigationEditConfig = {

  emptyLabel: 'Navigation',
  isEmpty: function(props) {
    return !props || !props.items || props.items.length < 1;
  }
};

/**
 * Navigation Class
 */
export default class Navigation extends Component {

  baseCss = 'Navigation';

  renderGroupNav(children) {

    if(children === null || children.length < 1 ) {
      return null;
    }
    return (<ul className={this.baseCss + '__group'}>
        {children.map(
          (item,index) => { return this.renderNavItem(item,index)}
        )}
      </ul>
    );
  }

  renderNavItem(item, index) {
    const cssClass = this.baseCss + '__item ' +
      this.baseCss + '__item--level-' + item.level + ' ' +
      (item.active ? ' ' + this.baseCss + '__item--active' : '');
    return (
      <li key={this.baseCss + '__item-' + index} className={cssClass}>
        { this.renderLink(item) }
        { this.renderGroupNav(item.children) }
      </li>
    );
  }

  renderLink(item){
    return (
      <Link to={item.link.url} title={item.title} aria-current={item.active && 'page'}
            className={this.baseCss + '__item-link'}>{item.title}</Link>
    );
  }

  render() {
    console.log(this.props)
    if(NavigationEditConfig.isEmpty(this.props.model)) {
      console.log('here')
      return <div>Null</div>;
    }

    return (
      <nav className="Navigation">
        { this.renderGroupNav(this.props.model?.items) }
      </nav>
    );
  }
}

MapTo("wknd-spa-react/components/navigation")(Navigation, NavigationEditConfig);
