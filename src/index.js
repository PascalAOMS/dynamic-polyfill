
export default function({fills = '', options = '', minify = true, afterFill}) {

    let formattedFills = fills.replace(/\s/g, ''),
        listedFills    = formattedFills.split(','),
        winObjs        = [];

    listedFills.map(fill => winObjs.push(window[fill]));

    if( winObjs.indexOf(undefined) === -1 ) {
        afterFill()
        return
    }


    let min      = '',
        features = '',
        flags    = '';

    if( minify ) min = '.min';

    if( fills ) features = `?features=${formattedFills}`;

    if( options ) flags = `&flags=${options.replace(/\s,|,\s|,/g, '|')}`;


    let js = document.createElement('script');

    js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js${features + flags}`;

    js.onload = () => afterFill();
    js.onerror = () => afterFill(new Error('Failed to load polyfill. Are the options spelled correctly?', js.src));

    document.head.appendChild(js);

}
