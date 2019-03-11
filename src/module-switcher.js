/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import "@polymer/iron-icon/iron-icon.js";
import "./oe-studio-iconset.js";

/**
 * `module-switcher`
 *  A template element , used to create oe-ui Polymer 3 elements.
 *  By default includes `OECommonMixin` to support use of 'fire','async' and '_deepValue' functions.
 * 
 *
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class ModuleSwitcher extends OECommonMixin(PolymerElement) {

    static get is() { return 'module-switcher'; }

    static get template() {
        return html`
     <style include="iron-flex">
     :host {
        display: block;
        max-width: 285px;
        background: var(--light-primary-color);
        border-left: 1px solid var(--secondary-divider-color);
        border-right: 1px solid var(--secondary-divider-color);
      }

      iron-icon {
        --iron-icon-width: 20px;
        --iron-icon-height: 20px;
      }

      paper-tabs {
        --paper-tabs-selection-bar-color: var(--accent-color);
        --paper-tabs-selection-bar: {
          border-width: 3px;
        }
        ;
        --paper-tabs: {
          height: 40px;
          overflow: visible;
        }
        ;
        --paper-tabs-content: {
          overflow: visible;
        }
        ;
      }

      paper-tab {
        --paper-tab: {
          overflow: visible;
        }
      }

      paper-tab.iron-selected {
        background: var(--accent-color);
      }

      paper-tabs ::content #tabsContainer {
        overflow: visible;
      }

      .tooltip {
        position: fixed;
        visibility: hidden;
        background: #696969;
        padding: 6px;
        z-index: 100;
        margin-top: -40px;
        border-radius: 2px;
        opacity: 0;
        font-size: 11px;
        color: #fff;
      }

      .tooltip:before {
        content: '';
        border-top: 5px solid #696969;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        width: 0;
        height: 0;
        position: absolute;
        bottom: -10px;
        right: 50%;
      }

      paper-tab {
        z-index: 20;
      }

      paper-tab:hover .tooltip {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.5s ease-in;
      }

      .module-icon {
        --iron-icon-width: 16px;
        --iron-icon-height: 16px;
      }
    </style>
    <paper-tabs align-bottom selected="{{selectedRoute.path}}" attr-for-selected="datavalue">
      <template is="dom-repeat" items="{{modules}}">
        <paper-tab datavalue="{{item.path}}">
          <iron-icon icon$="[[_getIcon(item)]]" class="module-icon"></iron-icon>
          <div class="tooltip">
            [[item.name]]
          </div>
        </paper-tab>
      </template>
    </paper-tabs>
     `;
    }

    static get properties() {
        return {
            "modules": {
                type: Object,
                value: function () {
                    return [];
                }
            },
            "selectedRoute": {
                type: Object,
                notify: true
            }

        };
    }

    _getIcon(item) {
        return item.icon ? item.icon : ("oe-studio-icons:" + item.name);
    }

}

window.customElements.define(ModuleSwitcher.is, ModuleSwitcher);