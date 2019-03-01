/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction polyfill({\r\n  fills,\r\n  options = '',\r\n  minify = true,\r\n  rum = true,\r\n  agent,\r\n  agentFallback,\r\n  afterFill\r\n}) {\r\n  if (!fills) {\r\n    throw new Error('No fills specified.');\r\n  }\r\n\r\n  const fillAnyway = options.indexOf('always') >= 0 || agent; // check if 'always' flag or agent is set\r\n  const neededPolyfills = fillAnyway ? fills : checkSupport(fills);\r\n\r\n\r\n  if (neededPolyfills.length > 0) {\r\n    return loadScript({\r\n      neededPolyfills, minify, fills, options, rum, agent, agentFallback, afterFill\r\n    });\r\n  }\r\n\r\n  return afterFill();\r\n}\r\n\r\n\r\nfunction checkSupport(fills) {\r\n  let unsupportedFills = [];\r\n\r\n  for (let i = 0; i < fills.length; i++) {\r\n    const fill = fills[i];\r\n    const parts = fill.split('.'); // i.e. ['Array', 'prototype', 'includes']\r\n    const type = parts[0];\r\n    const prototype = parts[1] === 'prototype';\r\n    const method = parts[2];\r\n\r\n    let isSupported = false;\r\n\r\n    // check for special test cases, otherwise use regular reduce function against window\r\n    switch (type) {\r\n      case 'Intl':\r\n        isSupported = window[type];\r\n        break;\r\n\r\n      case 'Element':\r\n        isSupported = 'Element' in window;\r\n        if (prototype && isSupported) {\r\n          isSupported = method in Element.prototype;\r\n        }\r\n        break;\r\n\r\n      default:\r\n        isSupported = parts.reduce((key, value) => key[value], window);\r\n    }\r\n\r\n    if (!isSupported) {\r\n      unsupportedFills.push(fill);\r\n    }\r\n  }\r\n\r\n  return unsupportedFills;\r\n}\r\n\r\nfunction loadScript(args) {\r\n  const min      = args.minify  ? '.min' : '';\r\n  const features = args.fills   ? `features=${args.neededPolyfills.join(',')}` : '';\r\n  const flags    = args.options ? `\\&flags=${args.options.join(',')}` : '';\r\n  const monitor  = args.rum     ? '\\&rum=1' : ''; // not set to rum=0 since it loads RUM scripts anyway\r\n  const agent    = args.agent   ? `\\&ua=${args.agent}` : '';\r\n  const fallback = args.agentFallback ? `\\&unknown=${args.agentFallback}` : '';\r\n\r\n  const js = document.createElement('script');\r\n\r\n  js.src = `https://polyfill.io/v2/polyfill${min}.js?${features + flags + monitor + agent + fallback}`;\r\n  js.async = true;\r\n\r\n  document.body.appendChild(js);\r\n\r\n  js.onload = () => args.afterFill();\r\n  js.onerror = () => { throw new Error('Error loading polyfills. Open a ticket: https://github.com/PascalAOMS/dynamic-polyfill/issues') };\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (polyfill);\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index.js */ \"./src/index.js\");\n\r\n\r\nObject(_src_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\r\n  fills: [\r\n    'Element.prototype.classList',\r\n    'fetch',\r\n    'Element.prototype.after'\r\n  ],\r\n  rum: false,\r\n  minify: true,\r\n  agent: 'ie/11.0.0',\r\n  afterFill() {\r\n    document.body.classList.add('test');\r\n    fetchData();\r\n    elementAfter();\r\n  }\r\n});\r\n\r\n\r\n// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch\r\nfunction fetchData() {\r\n  fetch('https://api.github.com/users/pascalaoms')\r\n    .then((res) => console.log('fetch:', res));\r\n}\r\n\r\n\r\n// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after\r\nfunction elementAfter() {\r\n  const parent = document.createElement('div');\r\n  const child = document.createElement('p');\r\n  const span = document.createElement('span');\r\n\r\n  parent.appendChild(child);\r\n\r\n  child.after(span);\r\n\r\n  console.log('Element.after:', parent.outerHTML);\r\n}\r\n\n\n//# sourceURL=webpack:///./test/test.js?");

/***/ })

/******/ });