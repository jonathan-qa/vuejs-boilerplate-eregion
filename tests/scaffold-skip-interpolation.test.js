/**
 * Locks in the vue-cli scaffolding guard that keeps Vue mustaches intact.
 * Run: node tests/scaffold-skip-interpolation.test.js
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const meta = require(path.join(root, 'meta.js'));
const helloWorld = fs.readFileSync(
  path.join(root, 'template/src/components/HelloWorld.vue'),
  'utf8',
);

assert.ok(
  Array.isArray(meta.skipInterpolation),
  'meta.js must export skipInterpolation as an array',
);
assert.ok(
  meta.skipInterpolation.includes('src/**/*.vue'),
  'skipInterpolation must include src/**/*.vue so vue-cli Handlebars does not strip SFC bindings',
);
assert.ok(
  helloWorld.includes('<h1>{{ msg }}</h1>'),
  'HelloWorld.vue must keep the Vue mustache that skipInterpolation protects',
);

console.log('ok - meta.js skipInterpolation protects Vue SFC mustaches');
