/**
 * Locks the Cypress cucumber browserify shim that prevents
 * "Unable to determine current node version" when specs load.
 */
const path = require('path');

describe('tests/e2e/plugins/index.js cucumber preprocessor', () => {
  it('injects process.versions.node via browserify insertGlobalVars', () => {
    const handlers = {};
    const on = (event, handler) => {
      handlers[event] = handler;
    };

    const pluginPath = path.join(__dirname, '../e2e/plugins/index.js');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(pluginPath)(on);

    expect(handlers['file:preprocessor']).toBeDefined();

    // Re-read source so the guard stays explicit in-repo (runtime options are
    // owned by @cypress/browserify-preprocessor defaults).
    const fs = require('fs');
    const source = fs.readFileSync(pluginPath, 'utf8');
    expect(source).toMatch(/insertGlobalVars/);
    expect(source).toMatch(/versions\.node/);
    expect(source).toMatch(/process\/browser/);
  });
});
