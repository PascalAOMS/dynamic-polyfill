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
      checkFillSupport(neededPolyfills, fills[i], fills[i].split('.'));
    }

    // if no polyfills are needed, run callback
    if (neededPolyfills.length === 0) {
      return afterFill();
    }


  }

  loadScript({ neededPolyfills, minify, fills, options, rum, afterFill });
}


function checkFillSupport(neededPolyfills, fill, parts) {
  const isIntl    = parts[0] === 'Intl';  // check for Intl.~locale
  const isElement = parts[0] === 'Element';  // for Element.prototype.classList
  const isPrototype = parts[1] === 'prototype';

  let isSupported = false;

  // check for special test cases, otherwise use regular reduce function against window
  if (isIntl) {
    isSupported = window[parts[0]];
  } else if (isElement) {
    if (isElement && isPrototype) {
      isSupported = ('Element' in window && parts[2] in Element.prototype);
    } else {
      isSupported = 'Element' in window;
    }
  } else {
    isSupported = parts.reduce((key, value) => key[value], window);
  }

  if (!isSupported) {
    return neededPolyfills.push(fill);
  }
}


function loadScript(args) {
  const min      = args.minify  ? '.min' : '';
  const features = args.fills   ? `features=${args.neededPolyfills.join(',')}` : '';
  const flags    = args.options ? `\&flags=${args.options.join(',')}` : '';
  const monitor  = args.rum     ? '\&rum=1' : ''; // not set to rum=0 since it loads scripts anyway

  const js = document.createElement('script');

  js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js?${features + flags + monitor}`;
  js.async = true;

  document.body.appendChild(js);

  js.onload = () => args.afterFill();
  js.onerror = () => args.afterFill(new Error('Error loading polyfill. Write an issue: https://github.com/PascalAOMS/dynamic-polyfill/issues', js.src));
}


module.exports = polyfill;
