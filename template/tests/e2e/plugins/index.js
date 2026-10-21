// https://docs.cypress.io/guides/guides/plugins-guide.html

/* eslint-disable import/no-extraneous-dependencies, global-require, arrow-body-style */

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on) => {
  const options = browserify.defaultOptions;

  // cypress-cucumber-preprocessor browserifies `require('cucumber')` into the
  // spec bundle. That pulls cucumber's CLI → `resolve` → `is-core-module`, which
  // throws "Unable to determine current node version" because browserify's
  // process/browser shim sets `process.versions = {}`.
  const nodeVersion = process.versions.node;
  options.browserifyOptions.insertGlobalVars = {
    process() {
      return `(function(){var p=require('process/browser');p.versions=p.versions||{};if(!p.versions.node){p.versions.node='${nodeVersion}';}return p;})()`;
    },
  };

  on('file:preprocessor', cucumber(options));
};
