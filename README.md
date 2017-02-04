| Size  | Support |
| ----- | ------- |
| 2 KB  | >= IE8  |

<p>
    <a href="https://www.npmjs.com/package/dynamic-polyfill"><img src="https://img.shields.io/david/pascalaoms/dynamic-polyfill.svg" alt="Version"></a>

    <a href="https://www.npmjs.com/package/dynamic-polyfill"><img src="https://img.shields.io/npm/v/dynamic-polyfill.svg" alt="Version"></a>

    <a href="https://www.npmjs.com/package/dynamic-polyfill"><img src="https://img.shields.io/npm/dm/dynamic-polyfill.svg" alt="Downloads"></a>
</p>

## What's the use?
Made for easier use of the [Polyfill.io API](polyfill.io) to detect browser support and offer dynamic polyfills.

Write modern code like fetch, Promise or Array.prototype.includes without the need to transform it or locally load a polyfill.

> _**Note:** Does not polyfill syntactic sugar like **Classes, enhanced Object literals** and features like **Arrow Functions** or **Template Strings**. Use compilers like Babel for that._

## How does it work?
The module tests the given functions in `fills` (see below) against the window to check if the browser supports everything.

If not, it creates a link like `https://cdn.polyfill.io/v2/polyfill.js?features=fetch`, inserts a script tag to make the HTTP request and loads only the needed polyfills.  
The tag is put at the bottom of the page with the `async` attribute.

## How to use?
NPM: `npm i dynamic-polyfill -S`  
Yarn: `yarn add dynamic-polyfill`

```javascript
import polyfill from 'dynamic-polyfill'
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
})
```

_**Note:** As of now not all available API options are supported here. [Take a look at the full reference list.](https://polyfill.io/v2/docs/api)_

### Fills
`['fetch', 'Array.prototype.includes']` (default: empty)  
[A list of what can be polyfilled.](https://polyfill.io/v2/docs/features/)  
Put them in an array of strings.
If empty, as default marked features on the website are being used.

### Options
`['gated', 'always']` (default: empty)

**always**  
    Polyfill should be included regardless of whether it is required by the user-agent making the request. If there are multiple browser-specific variants of the polyfill, the default one will be used for browser that doesn't actually require the polyfill. In some cases where the only way of implementing a polyfill is to use browser-specific proprietary technology, the default variant may be empty.

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


### After Fill
Put your modern code in this callback to make sure the polyfills are loaded first.

Example:
```javascript
polyfill({
    fills: ['fetch'],
    afterFill() {
        main()
    }
})

function main() {
    fetch(url)
        .then(res => res.json())
}
```
