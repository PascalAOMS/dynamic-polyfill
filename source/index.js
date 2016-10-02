
//export default function() {

    function fill() {

        var features = 'Promise,fetch,String.prototype.includes',
            js = document.createElement('script');

        js.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features='+features+'&flags=gated';

        document.head.appendChild(js)

    }

    window.Promise && window.fetch ? null : fill();


//}
