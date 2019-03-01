import polyfill from '../src/index.js';

polyfill({
  fills: [
    'Element.prototype.classList',
    'fetch',
    'Element.prototype.after'
  ],
  rum: false,
  minify: false,
  agent: 'ie/11.0.0',
  afterFill() {
    document.body.classList.add('test');
    fetchData();
    elementAfter();
  }
});


// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function fetchData() {
  fetch('https://api.github.com/users/pascalaoms')
    .then((res) => console.log('fetch:', res));
}


// https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after
function elementAfter() {
  const parent = document.createElement('div');
  const child = document.createElement('p');
  const span = document.createElement('span');

  parent.appendChild(child);

  child.after(span);

  console.log('Element.after:', parent.outerHTML);
}
