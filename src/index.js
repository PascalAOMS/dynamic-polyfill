function polyfill({
  fills,
  options = '',
  minify = true,
  rum = true,
  agent,
  agentFallback,
  afterFill
}) {
  if (!fills) {
    throw new Error('No fills specified.');
  }

  const fillAnyway = options.indexOf('always') >= 0 || agent; // check if 'always' flag or agent is set
  const neededPolyfills = fillAnyway ? fills : checkSupport(fills);


  if (neededPolyfills.length > 0) {
    return loadScript({
      neededPolyfills, minify, fills, options, rum, agent, agentFallback, afterFill
    });
  }

  return afterFill();
}


function checkSupport(fills) {
  let unsupportedFills = [];

  for (let i = 0; i < fills.length; i++) {
    const fill = fills[i];
    const parts = fill.split('.'); // i.e. ['Array', 'prototype', 'includes']
    const type = parts[0];
    const prototype = parts[1] === 'prototype';
    const method = parts[2];

    let isSupported = false;

    // check for special test cases, otherwise use regular reduce function against window
    switch (type) {
      case 'Intl':
        isSupported = window[type];
        break;

      case 'Element':
        isSupported = 'Element' in window;
        if (prototype && isSupported) {
          isSupported = method in Element.prototype;
        }
        break;

      default:
        isSupported = parts.reduce((key, value) => key[value], window);
    }

    if (!isSupported) {
      unsupportedFills.push(fill);
    }
  }

  return unsupportedFills;
}


function loadScript(args) {
  const min      = args.minify  ? '.min' : '';
  const features = args.fills   ? `features=${args.neededPolyfills.join(',')}` : '';
  const flags    = args.options ? `\&flags=${args.options.join(',')}` : '';
  const monitor  = args.rum     ? '\&rum=1' : ''; // not set to rum=0 since it loads RUM scripts anyway
  const agent    = args.agent   ? `\&ua=${args.agent}` : '';
  const fallback = args.agentFallback ? `\&unknown=${args.agentFallback}` : '';

  const js = document.createElement('script');

  js.src = `https://cdn.polyfill.io/v2/polyfill${min}.js?${features + flags + monitor + agent + fallback}`;
  js.async = true;

  document.body.appendChild(js);

  js.onload = () => args.afterFill();
  js.onerror = () => { throw new Error('Error loading polyfills. Open a ticket: https://github.com/PascalAOMS/dynamic-polyfill/issues') };
}


module.exports = polyfill;
