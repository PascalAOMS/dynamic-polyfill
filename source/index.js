
//export default function() {

    function fill(features = 'Promise, fetch',
                  flags = 'gated',
                  minify = true) {


        let js = document.createElement('script');

        js.src = `https://cdn.polyfill.io/v2/polyfill.${minify ? 'min.' : null}js?features=${features}&flags=${flags}`;

        document.head.appendChild(js)

    }

    window.Promise && window.fetch ? null : fill();


//}
