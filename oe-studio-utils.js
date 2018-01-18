/*
  ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
  Bangalore, India. All Rights Reserved.
*/

// EVENT NAMES
const SUCCESS_TOAST = 'oe-show-success';
const ERROR_TOAST = 'oe-show-error';
const WARNING_TOAST = 'oe-show-warning';

// URL
const STUDIO_CONFIG_URL = '/designer/config';
const USER_SESSION_URL = '/BaseUsers/session';

window.OEUtils = window.OEUtils || {};
window.OEUtils._getRestApiUrl = function(path){
    var restApiRoot = (window.OEUtils && window.OEUtils.restApiRoot) ? window.OEUtils.restApiRoot : '/api';
    return restApiRoot + path;
}