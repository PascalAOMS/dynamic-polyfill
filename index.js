'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var _ref$fills = _ref.fills;
    var fills = _ref$fills === undefined ? '' : _ref$fills;
    var _ref$options = _ref.options;
    var options = _ref$options === undefined ? '' : _ref$options;
    var _ref$minify = _ref.minify;
    var minify = _ref$minify === undefined ? true : _ref$minify;
    var afterFill = _ref.afterFill;


    var formattedFills = fills.replace(/\s/g, ''),
        listedFills = formattedFills.split(','),
        winObjs = [];

    listedFills.map(function (fill) {
        return winObjs.push(window[fill]);
    });

    if (winObjs.indexOf(undefined) === -1) {
        afterFill();
        return;
    }

    var min = '',
        features = '',
        flags = '';

    if (minify) min = '.min';

    if (fills) features = '?features=' + formattedFills;

    if (options) flags = '&flags=' + options.replace(/\s,|,\s|,/g, '|');

    var js = document.createElement('script');

    js.src = 'https://cdn.polyfill.io/v2/polyfill' + min + '.js' + (features + flags);

    js.onload = function () {
        return afterFill();
    };
    js.onerror = function () {
        return afterFill(new Error('Failed to load polyfill. Are the options spelled correctly?', js.src));
    };

    document.head.appendChild(js);
};