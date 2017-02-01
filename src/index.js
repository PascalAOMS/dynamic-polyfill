function polyfill({ fills, options, minify = true, rum = true, afterFill }) {


    let formattedFills,
        listedFills,
        winObjs


    if( fills !== undefined ) {

        formattedFills = fills.replace(/\s/g, ''),
        listedFills    = formattedFills.split(',')
        winObjs        = []

        listedFills.map(fill => winObjs.push(window[fill]))


        if( winObjs.indexOf(undefined) === -1 ) {
            afterFill()
            return
        }
    }


    let min      = minify ? '.min' : '',

        features = fills ? `features=${formattedFills}` : '',

        flags    = options ? `&flags=${options.replace(/\s/g, '')}` : '',

        monitor  = rum ? '&rum=1' : '', // not set to rum=0 since it loads scripts anyway

        js       = document.createElement('script')


    js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js?${features + flags + monitor}`
    js.async = true

    document.body.appendChild(js)

    js.onload = () => afterFill()
    js.onerror = () => afterFill(new Error('Failed to load polyfill. Please write an issue here: https://github.com/PascalAOMS/dynamic-polyfill/issues', js.src))


}

module.exports = polyfill
