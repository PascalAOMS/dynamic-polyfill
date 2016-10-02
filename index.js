'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (fills, options) {
    var compress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    console.log(fills);

    var formattedFills = fills.replace(/\s/g, ''),
        listedFills = formattedFills.split(','),
        winObjs = [];

    listedFills.map(function (fill) {
        return winObjs.push(window[fill]);
    });

    console.log(winObjs);

    if (winObjs.indexOf(undefined) === -1) {
        console.log('no fill needed');
        return;
    }

    var minify = '',
        features = '',
        flags = '';

    if (compress) minify = '.min';

    if (fills) features = '?features=' + formattedFills;

    if (options) flags = '&flags=' + options.replace(/\s,|,\s|,/g, '|');

    var js = document.createElement('script');

    js.src = 'https://cdn.polyfill.io/v2/polyfill' + minify + '.js' + (features + flags);

    document.head.appendChild(js);
};