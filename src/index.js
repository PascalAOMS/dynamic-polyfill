function polyfill({ fills, options = '', minify = true, rum = true, afterFill }) {

  // contains list of all to be polyfilled features
  let needsPolyfill = [];

  // check if 'always' flag is set
  // if yes, no need to check for support since polyfills are loaded anyway
  if (options.indexOf('always') === -1) {

    if (fills !== undefined) {

      for (let i = 0; i < fills.length; i++) {
        const fill = fills[i];

        // set the fill against the window object
        const reducedFill = (fill.indexOf('~') !== -1)
          ? window[fill.split('.')[0]]
          : fill.split('.').reduce((k, v) => k[v], window);

        // check if window supports the fill
        if (reducedFill === undefined) {
          needsPolyfill.push(fill);
        }

      }

      // if no polyfills are needed, run callback
      if (needsPolyfill.length === 0) {
        return afterFill();
      }
    }

  } else {
    needsPolyfill = fills
  }

  const min      = minify  ? '.min' : '';
  const features = fills   ? `features=${needsPolyfill.join(',')}` : '';
  const flags    = options ? `\&flags=${options.join(',')}` : '';
  const monitor  = rum     ? '\&rum=1' : ''; // not set to rum=0 since it loads scripts anyway

  const js = document.createElement('script');

  js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js?${features + flags + monitor}`;
  js.async = true;

  document.body.appendChild(js);

  js.onload = () => afterFill();
  js.onerror = () => afterFill(new Error('Failed to load polyfill. Please write an issue here: https://github.com/PascalAOMS/dynamic-polyfill/issues', js.src));

}

module.exports = polyfill;
