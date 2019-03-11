/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
window.OEUtils = window.OEUtils || {};
window.OEUtils._getRestApiUrl = function(path){
    var restApiRoot = (window.OEUtils && window.OEUtils.restApiRoot) ? window.OEUtils.restApiRoot : '/api';
    return restApiRoot + path;
};


//Fix for nested dialog box with modal property
window.addEventListener('iron-overlay-opened',function(e){
    //handle backdrop;
    var dialog = e.target;
    if(dialog.tagName.toLowerCase() !== 'paper-dialog'){
        return;
    }
    var parentEle = dialog.parentNode;
    var overlay = document.querySelector('iron-overlay-backdrop');
    if(overlay){
        parentEle.insertBefore(overlay,dialog);
    }
});

window.addEventListener('iron-overlay-closed',function(e){
    //handle backdrop
    var dialog = e.target;
    if(dialog.tagName.toLowerCase() !== 'paper-dialog'){
        return;
    }
    var overlay = document.querySelector('iron-overlay-backdrop');
    if(overlay){
        overlay.parentNode.removeChild(overlay);
    }
});