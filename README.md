Made for easier use of the [Polyfill.io API](polyfill.io) to detect browser support and offer dynamic polyfills.

**Size: < 1 KB**  
**Dependencies: none**

## What's the use?
Write ES2015+ like fetch, Promise or Array.prototype.includes for modern browsers without the need to compile it.

Using the API it detects what browser is being used and polyfills only what is not supported. So modern browsers do not need to download old ES5 code.

_**Note:** Does not polyfill synthetic sugar like **Arrow Functions** or **Template Strings**. Use compilers like Babel for that._

## How does it work?
Giving a list of ES2015+ features the script checks if they are supported in the target browser. If not, it creates a link like `https://cdn.polyfill.io/v2/polyfill.js?features=fetch` and inserts a script tag to make the HTTP request to load only the needed polyfills.

## How to use?
```javascript
import polyfill from es-dynamic-polyfill

polyfill({
    fills: 'fetch, Promise',
    options: 'gated',
    minify: false,
    afterFill() {
        main();
    }
})
```

### Fills
`fetch, Promise` (default: empty)  
[A list of what can be polyfilled.](https://polyfill.io/v2/docs/features/)  
Put them in a comma-separated string.
If empty, as default marked features are being used.

### Options
`gated, always` (default: empty)

**always**  
    Polyfill should be included regardless of whether it is required by the user-agent making the request. If there are multiple browser-specific variants of the polyfill, the default one will be used for browser that doesn't actually require the polyfill. In some cases where the only way of implementing a polyfill is to use browser-specific proprietary technology, the default variant may be empty.

**gated**  
    If the polyfill is included in the bundle, it will be accompanied by a feature detect, which will only execute the polyfill if the native API is not present.

### Minify
`true | false` (default: true)  
Set to false for deeper insight of what is being polyfilled.

### After Fill
Put your ES2015+ code in this callback to make sure the polyfills are loaded first.

Example:
```javascript
polyfill({
    fills: 'default, fetch'
    afterFill() {
        main()
    }
})

function main() {
    fetch(url)
        .then(res => res.json())
}
```
