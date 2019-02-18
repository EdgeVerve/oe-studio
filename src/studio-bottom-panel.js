/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { DomApi, flush } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icon/iron-icon.js";
import "./module-switcher.js";

/**
 * `studio-bottom-panel`
 *  A template element , used to create oe-ui Polymer 3 elements.
 *  By default includes `OECommonMixin` to support use of 'fire','async' and '_deepValue' functions.
 * 
 *
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class StudioBottomPanel extends OECommonMixin(PolymerElement) {

    static get is() { return 'studio-bottom-panel'; }

    static get template() {
        return html`
            <style include="iron-flex">
            :host {
                color: var(--default-text-color);
                display: block;
            }
        
            app-toolbar {
                height: 40px;
                background: var(--default-primary-color);
                padding: 0px;
            }
        
        
            .application-logo {
                padding: 6px 9px;
                cursor: pointer;
                background: var(--dark-primary-color);
                height: 40px;
                width: 48px;
                box-sizing: border-box;
            }
            </style>  
            <app-toolbar>
                <iron-icon src="node_modules/oe-studio/images/Logo.png" class="application-logo" on-tap="toggleLeftDrawer"></iron-icon>
                <module-switcher modules=[[modules]] selected-route="{{selectedRoute}}"></module-switcher>
                <div id="customize-panel" class="flex">
                    <iron-pages id="footer-content-panel" attr-for-selected="route-path"></iron-pages>
                </div>
                <!--<tenant-info></tenant-info>-->
            </app-toolbar>
        `;
    }

    static get properties() {
        return {
            modules: {
                type: Object,
                value: function () { return []; }
            },
            selectedRoute: {
                type: Object,
                notify: true
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        var ironPage = this.shadowRoot.querySelector('#footer-content-panel');
        this.set('_target', ironPage);
    }
    toggleLeftDrawer() {
        this.fire('toggle-left-drawer');
    }
    _setFooter(footerElem) {
        if (footerElem) {
            footerElem.set('hidden', false);
            (new DomApi(this._target)).appendChild(footerElem);
            flush();
        }
        this._target.set('selected', this.selectedRoute.path);
    }
}

window.customElements.define(StudioBottomPanel.is, StudioBottomPanel);