/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin";

/**
 * `app-config-panel`
 *  A template element , used to create oe-ui Polymer 3 elements.
 *  By default includes `OECommonMixin` to support use of 'fire','async' and '_deepValue' functions.
 * 
 *
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class AppConfigPanel extends OECommonMixin(PolymerElement) {

  static get is() { return 'app-config-panel'; }

  static get template() {
    return html`
    <style include="iron-flex">
    </style>
    <div>
    </div>
    `;
  }

  static get properties() {
    return {};
  }

  static get observers() {
    return [];
  }

}

window.customElements.define(AppConfigPanel.is, AppConfigPanel);