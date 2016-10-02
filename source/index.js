
export default function(fills, options, compress = true) {


    console.log(fills);

    let formattedFills = fills.replace(/\s/g, ''),
        listedFills    = formattedFills.split(','),
        winObjs        = [];

    listedFills.map(fill => winObjs.push(window[fill]));

    console.log(winObjs);

    if( winObjs.indexOf(undefined) === -1 ) {
        console.log('no fill needed');
        return;
    }


    let minify   = '',
        features = '',
        flags    = '';

    if( compress ) minify = '.min';

    if( fills ) features = `?features=${formattedFills}`;

    if( options ) flags = `&flags=${options.replace(/\s,|,\s|,/g, '|')}`;


    let js = document.createElement('script');

    js.src = `https://cdn.polyfill.io/v2/polyfill${minify}.js${features + flags}`;

    document.head.appendChild(js)


}
