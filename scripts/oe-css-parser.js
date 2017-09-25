/**
*
* ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
* Bangalore, India. All Rights Reserved.
*
*/
(function () {
    'use strict';
    window.OEUtils = window.OEUtils || {};
    window.OEUtils.designer = window.OEUtils.designer || {};

    window.OEUtils.designer._getElementName = function (selector) {
        var _elemName = '';
        var idx = selector.indexOf('.');
        if (idx > 0) {
            _elemName = selector.substring(0, idx);
        }
        return _elemName;
    }

    window.OEUtils.snakeToCamel = function (s) {
        return s.replace(/(\-\w)/g, function (m) {
            return m[1].toUpperCase();
        });
    }

    window.OEUtils.camelToSnake = function(str){
	   return str.replace(/([A-Z])/g, function($1){
         return "-"+$1.toLowerCase();
       });
    };

    var extracter = function (styleSheet, styleList) {
        if (styleSheet.cssRules) {
            for (var r = 0; r < styleSheet.cssRules.length; r++) {
                var rule = styleSheet.cssRules[r];
                if (rule.constructor.name == 'CSSMediaRule') {
                    //extracter(rule, styleList)
                } else if (rule.constructor.name == 'CSSStyleRule') {
                    var selectors = rule.selectorText.replace(/\:not\(\[style-scope\]\)\:not\(\.style-scope\)/g, '')
                    var regexp = /^[a-zA-Z0-9\-_]*\.[a-zA-Z0-9\-_]+$|^\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/
                    //for getting three scenarios .btn, .btn.ripple, div.ripple
                    selectors = selectors.split(',').map(function (item) {
                        return item.trim()
                    });
                    selectors.forEach(function (selector) {
                        if (regexp.test(selector) && rule.style.cssText.length > 0) {
                            var obj = {
                                selector: selector,
                                className: window.OEUtils.designer._getClassName(selector),
                                elementName: null,
                                mediaQuery: null,
                                userdefined: false,
                                value: '{\n\t' + rule.style.cssText + '\n}'
                            };
                            var jsonStr = obj.value.replace(/{\n\s/, '{"').replace(/;\s/g, '","').replace(/","}/, '"}').replace(/:\s/g, '":"')

                            var classObj = JSON.parse(jsonStr);
                            var newObj = {};
                            Object.keys(classObj).forEach(function (k) {
                                newObj[OEUtils.snakeToCamel(k)] = classObj[k]
                            });

                            obj.classObject = newObj;
                            var iselem = window.OEUtils.designer._getElementName(selector);
                            if (iselem) {
                                obj.elementName = iselem;
                            }
                            var hasMedia = (rule.parentRule && rule.parentRule.constructor.name == 'CSSMediaRule')
                            if (hasMedia) {
                                obj.mediaQuery = rule.parentRule.media.mediaText
                            }
                            styleList.push(obj);
                        }
                    });
                }
            }
        }
    }

    window.OEUtils.designer._getClassName = function (selector) {
        // only three scenarios are there to extract class names. ex: .a, div.a, .a.b
        var _className = '';
        if (/^\.[a-zA-Z0-9\-_]+$/.test(selector)) {
            _className = selector.substring(1);
            //ex: .a, in this case always start index of substring starts with 1.
        } else if (/^\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/.test(selector)) {
            //ex: .a.b
            _className = selector.split('.').join(' ').trim();
        } else if (/^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/.test(selector)) {
            _className = selector.substring(selector.indexOf('.') + 1);
            //ex: div.a, in this case always start index of substring starts of first occurence of . till end
        }
        return _className;
    }

    window.OEUtils.designer.xExtractCSS = function (xSourceFiles) {
        var styles = [];
        for (var i = 0; i < xSourceFiles.length; i++) {
            var styleSheet = xSourceFiles[i];
            extracter(styleSheet, styles);
        }
        return styles;
    }
})();
