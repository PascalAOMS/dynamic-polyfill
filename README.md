| Size   | Support             |
| ------ | ------------------- |
| ~1 KB  | > IE8 (see below)   |

<p>
    <a href="https://www.npmjs.com/package/dynamic-polyfill"><img src="https://img.shields.io/david/pascalaoms/dynamic-polyfill.svg" alt="Dependencies"></a>
</p>

## What's the use?
Made for easier use of the [Polyfill.io API](polyfill.io) to detect browser support, offer dynamic polyfills and save an extra HTTP request.

Write modern code like fetch, Promise or Array.prototype.includes without the need to transform it or locally load a polyfill.

> _**Note:** Does not polyfill syntactic sugar like **Classes, enhanced Object literals** and features like **Arrow Functions** or **Template Strings**. Use compilers like Babel for that._

## How does it work?
The module tests the given functions in `fills` (see below) against the window object to check if the browser supports them.

If not, it creates a link to the API service (i.e.`https://cdn.polyfill.io/v2/polyfill.js?features=fetch`) to load only the needed polyfills.  
The script tag is put at the bottom of the page with the `async` attribute.

## How to use?
NPM: `npm i dynamic-polyfill`  
Yarn: `yarn add dynamic-polyfill`

```js
import polyfill from 'dynamic-polyfill';
// or use require:
// const polyfill = require('dynamic-polyfill')

polyfill({
  fills: ['fetch', 'Array.prototype.includes'],
  options: ['gated', 'always'],
  minify: false,
  rum: false,
  afterFill() {
    // callback
  }
});
```

### Fills
`['fetch', 'Array.prototype.includes']` (default: empty)  
[A list of what can be polyfilled.](https://polyfill.io/v2/docs/features/)  
Put them in an array of strings.
If empty, as default marked features on the website are being used.

### Options
`['gated', 'always']` (default: empty)

**always**  
    Polyfill should be included regardless of whether it is required by the user-agent making the request. 
    If there are multiple browser-specific variants of the polyfill, 
    the default one will be used for browser that doesn't actually require the polyfill. 
    In some cases where the only way of implementing a polyfill is to use browser-specific
    proprietary technology, the default variant may be empty. 
    Use in combination with `gated` to avoid console errors.
    
**gated**  
    If the polyfill is included in the bundle, it will be accompanied by a feature detect, which will only execute the polyfill if the native API is not present.

### Minify
`true | false` (default: true)  
Set to false for deeper insight of what is being polyfilled.


### Real User Monitoring
`rum: false` (default: true)  
Allows the polyfill service to gather performance data about itself using the [resource timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) and to perform feature detection to improve our browser targeting.

[More info under `rum`.](https://polyfill.io/v2/docs/api)


> The service will default it to true in the future hence the module default choice. Set `rum: false` if you want to opt out.


### User Agent
`agent: 'ie/11.0.0'` (default: empty)  
Used to override the `User-Agent` string.  
Set to `polyfill` to return default polyfill variants of all qualifying features.
Useful if the polyfill service is being used from the server-side, and in that scenario, this is preferable to setting an inaccurate `User-Agent` header (the `User-Agent` header should properly be set to a string identifying the client you are using to make the request - for server side requests that might be cURL, for example).


### User Agent Fallback
`agentFallback: 'polyfill` (default: empty)  
What to do when the user agent is not recognised.  
Use caution when setting this argument to `polyfill` on large feature sets, since huge polyfill bundles may cause crashes or lockups in extremely old or underpowered user agents.


### After Fill
Put your modern code in this callback to make sure the polyfills are loaded first.

Example:
```js
polyfill({
  fills: ['fetch'],
  afterFill() {
    main();
  }
});

function main() {
  fetch(url)
    .then(res => res.json());
}
```

## Usage in IE8
For usage in IE8, you need a polyfill for `Array.prototype.reduce()`.
You may copy the polyfill code from [MDN](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).  
Run it before **dynamic-polyfill**.

It is not included in this package to keep it as small as possible.

## Not supported Fills
* ~html5-elements
* ~viewport

Use `always` flag for these.  
There might be more. I have not tested all of them.  
If you find a not supported fill, please leave a quick [issue message on Github](https://github.com/PascalAOMS/dynamic-polyfill/issues).  
All the most used fills are supported.
