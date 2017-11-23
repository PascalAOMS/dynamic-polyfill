function polyfill({ fills, options = '', minify = true, rum = true, afterFill }) {


    let needsPolyfill = [] // contains list of all to be polyfilled features


    // check if 'always' flag is set
    // if yes, no need to check for support since polyfills are loaded anyway
    if( options.indexOf('always') === -1 ) {


        if( fills !== undefined ) {

            fills.forEach(fill => {

                // set the fill against the window object
                var reducedFill = (fill.indexOf('~') !== -1)
                    ? window[fill.split('.')[0]]
                    : fill.split('.').reduce(function (k, v) {
                        return k[v];
                    }, window)

                // check if window supports the fill
                if( reducedFill === undefined ) {
                    needsPolyfill.push(fill)
                }

            })

            // if no polyfills are needed, run callback
            if( needsPolyfill.length === 0 ) {
                afterFill()
                return
            }
        }

    } else {
        needsPolyfill = fills
    }


    let min      = minify ? '.min' : '',

        features = fills ? `features=${needsPolyfill.join(',')}` : '',

        flags    = options ? `\&flags=${options.join(',')}` : '',

        monitor  = rum ? '\&rum=1' : '', // not set to rum=0 since it loads scripts anyway

        js       = document.createElement('script')


    js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js?${features + flags + monitor}`
    js.async = true

    document.body.appendChild(js)

    js.onload = () => afterFill()
    js.onerror = () => afterFill(new Error('Failed to load polyfill. Please write an issue here: https://github.com/PascalAOMS/dynamic-polyfill/issues', js.src))


}

module.exports = polyfill
