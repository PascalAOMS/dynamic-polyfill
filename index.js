'use strict';

//export default function() {

function fill() {
    var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Promise, fetch';
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'gated';
    var minify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    var js = document.createElement('script');

    js.src = 'https://cdn.polyfill.io/v2/polyfill.' + (minify ? 'min.' : null) + 'js?features=' + features + '&flags=' + flags;

    document.head.appendChild(js);
}

window.Promise && window.fetch ? null : fill();

//}