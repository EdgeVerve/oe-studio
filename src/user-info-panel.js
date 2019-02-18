/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { OEAjaxMixin } from "oe-mixins/oe-ajax-mixin.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/social-icons.js";
import "@polymer/paper-button/paper-button.js";


/**
 * `user-info-panel`
 *  
 *  By default includes `OECommonMixin` to support use of 'fire','async' and '_deepValue' functions.
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class UserInfoPanel extends OEAjaxMixin(OECommonMixin(PolymerElement)) {

    static get is() { return 'user-info-panel'; }

    static get template() {
        return html`
        <style include="iron-flex">
            .user-details {
                padding: 16px;
                height: 100px;
                background: var(--light-primary-color);
                color: var(--text-primary-color);
            }

            .user-icon {
                background: var(--default-primary-color);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 16px;
            }

            .user-icon iron-icon {
                --iron-icon-width: 30px;
                --iron-icon-height: 30px;
            }

            .user-name {
                font-size: 18px;
                letter-spacing: 0.7px;
            }

            #logOut-btn span {
                margin: 0px 6px;
                font-family: 'Roboto Medium';
            }

            .module-selection-list {
                padding: 0px 16px;
                margin: 8px 0px;
                color:var(--secondary-text-color);
            }

            .module-item {
                padding: 0px 8px;
                height: 30px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            }
        </style>
        <div class="component-container">
            <div class="user-details layout horizontal center">
                <div class="user-icon layout horizontal center-center">
                    <iron-icon icon="social:person"></iron-icon>
                </div>
                <div class="user-name">[[currentSession.username]]</div>
            </div>
            <div class="module-selection-list">
                <template is="dom-repeat" items="[[modules]]">
                    <div class="module-item layout horizontal center">
                        <label>[[item.name]]</label>
                    </div>
                </template>
            </div>
            <div>
                <paper-button id="logOut-btn" on-tap="_logOut">
                    <iron-icon icon="icons:power-settings-new"></iron-icon>
                    <span>Log Out</span>
                </paper-button>
            </div>
        </div>
    `;
    }

    static get properties() {
        return {
            modules: {
                type: Object,
                value: function () {
                    return [];
                }
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.makeAjaxCall('api/BaseUsers/session', "GET", null, null, null, null, function (err, response) {
            if (err) {
                this.fire('oe-show-error', 'Unable to fetch user information');
                return;
            }
            this.set('currentSession', response);
            localStorage.setItem('tenantId', response.tenantId);
            this.set('selectedTenant', response.tenantId);
            this.set('currentSession.isAdmin', (response.roles.indexOf('admin') != -1));
            this.fire('session-fetched', this.currentSession);
        }.bind(this));

    }
    _logOut() {
        var url = 'api/BaseUsers/logout';
        this.makeAjaxCall(url, 'POST', {}, null, null, null, function (err, response) {
            this.set('currentSession', {});
            this._logoutRedirect();
        }.bind(this));
    }
    _logoutRedirect() {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('currentTenant');
        sessionStorage.removeItem('tenantId');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('swagger_accessToken');
        location.assign('/login');
    }

}

window.customElements.define(UserInfoPanel.is, UserInfoPanel);