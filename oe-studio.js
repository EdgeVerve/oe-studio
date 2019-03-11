/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { OEAjaxMixin } from "oe-mixins/oe-ajax-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-route/app-location.js";
import "@polymer/font-roboto/roboto.js";
import "oe-app-route/oe-app-route.js";
import "oe-message-handler/oe-message-handler.js";
import "./src/studio-bottom-panel.js";
import "./src/user-info-panel.js";
import "./styles/app-theme.js";
import "./oe-studio-utils.js";
/**
 * `oe-studio`
 *  A shell element that loads the other oe-studio modules and displays them
 *  
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class OeStudio extends OEAjaxMixin(OECommonMixin(PolymerElement)) {

  static get is() { return 'oe-studio'; }

  static get template() {
    return html`
    <style include="iron-flex app-theme">
    :host {
       position: relative;
       display: block;
       box-sizing: border-box;
       height: 100vh;
       width: 100vw;
       overflow: hidden;
       font-family: 'Roboto';
   }

   iron-pages {
       height: calc(100vh - 40px);
       width: 100vw;
   }

   app-header-layout {
       z-index: unset;
   }

   app-header-layout #contentContainer {
       z-index: unset;
   }

   app-drawer {
       z-index: 100
   }

   studio-bottom-panel {
       height: 40px;
       width: 100vw;
   }
</style>
<div class="studio-container">
   <app-location route="{{route}}" use-hash-as-path></app-location>
   <app-drawer-layout fullbleed force-narrow>
       <app-drawer id="leftDrawer" slot="drawer">
           <user-info-panel modules="{{studioRoutes}}"></user-info-panel>
       </app-drawer>
       <!-- app-drawer id="rightDrawer" align="end" slot="drawer">
           <app-config-panel id="appConfig" on-close-drawer="toggleRightDrawer"></app-config-panel>
       </app-drawer -->
       <div class="main-app-content">
            <oe-app-route route="{{route}}" id="modulePanel" config-url="" routes-list="[[studioRoutes]]">
                <iron-pages route-target id="studioSwitcher"></iron-pages>
            </oe-app-route>
            <studio-bottom-panel id="footerPanel" selected-route="{{route}}" modules="[[studioRoutes]]"></studio-bottom-panel>
        </div>
   </app-drawer-layout>
</div>
<oe-message-handler fit-bottom duration=3000></oe-message-handler>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('oe-route-change', this._routeChangeHandler.bind(this));
    this.addEventListener('toggle-left-drawer', this._toggleLeftDrawer.bind(this));
    this.addEventListener('toggle-right-drawer', this._toggleRightDrawer.bind(this));

    this.makeAjaxCall("designer/config", "GET", null, null, null, null, function (err, response) {
      if (err) {
        this.fire("oe-show-error", 'Unable to get studio configuration');
        return;
      }
      if (response.restApiRoot) {
        window.OEUtils = window.OEUtils || {};
        var OEUtils = window.OEUtils;
        OEUtils.restApiRoot = response.restApiRoot || '/api';
      }

    //   if (response.imports) {
    //     OEUtils.uiDesignerData = OEUtils.uiDesignerData || {};
    //     OEUtils.uiDesignerData.iframeImports = response.imports;
    //   }

      if (response.modules) {
        var modulesList = response.modules.map(function (module) {
          module.type = "elem";
          module.retainInstance = true;
          module.group = "";
          return module;
        });
        this.set('studioRoutes', modulesList);
      }

    }.bind(this));
  }

  _routeChangeHandler() {
    var selectedModule = this.$.studioSwitcher.selectedItem;
    var footerEle;
    if (selectedModule) {
      var routePath = selectedModule.getAttribute('route-path');
      footerEle = selectedModule.shadowRoot.querySelector('[studio-footer]');
      if (footerEle) {
        footerEle.setAttribute('route-path', routePath);
      }
    }
    this.$.footerPanel._setFooter(footerEle);
  }

  _toggleLeftDrawer() {
    this.$.leftDrawer.toggle();
  }

  _toggleRightDrawer() {
    this.$.rightDrawer.toggle();
  }

}

window.customElements.define(OeStudio.is, OeStudio);