function polyfill({
  fills,
  options = '',
  minify = true,
  rum = true,
  afterFill
}) {
  const fillAlways = options.indexOf('always') >= 0;   // check if 'always' flag is set

  let neededPolyfills = []; // contains list of all features to be polyfilled

  if (fillAlways) {
    neededPolyfills = fills
  } else {
    if (fills === undefined) {
      return new Error('No fills specified.')
    }

    for (let i = 0; i < fills.length; i++) {
      const fill  = fills[i];
      const parts = fill.split('.');

      const isIntl    = parts[0] === 'Intl';  // check for Intl.~locale
      const isElement = parts[0] === 'Element';  // for Element.prototype.classList

      let isSupported = false;

      if (isIntl) {
        isSupported = window[parts[0]];
      } else if (isElement) {
        isSupported = ('Element' in window && 'classList' in Element.prototype);
      } else {
        parts.reduce((key, value) => key[value], window);
      }

      if (!isSupported) {
        neededPolyfills.push(fill);
      }

    }

    // if no polyfills are needed, run callback
    if (neededPolyfills.length === 0) {
      return afterFill();
    }


  }

  const min      = minify  ? '.min' : '';
  const features = fills   ? `features=${neededPolyfills.join(',')}` : '';
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
