#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { applyOpensslLegacyProvider } = require('./openssl-legacy');

const env = applyOpensslLegacyProvider(process.env);
const vueCliService = require.resolve('@vue/cli-service/bin/vue-cli-service.js');
const result = spawnSync(process.execPath, [vueCliService, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env,
});

process.exit(result.status === null ? 1 : result.status);
