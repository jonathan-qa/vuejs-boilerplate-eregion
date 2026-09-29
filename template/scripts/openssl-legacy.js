/**
 * Webpack 4 (Vue CLI 4) uses MD4 via OpenSSL APIs removed as defaults in
 * Node.js 17+. Enable the legacy provider only when required so Node 16 CI
 * keeps working (that flag is rejected on Node 16).
 */
function applyOpensslLegacyProvider(env, nodeVersion = process.versions.node) {
  const major = Number.parseInt(String(nodeVersion).split('.')[0], 10);
  const next = { ...env };
  if (Number.isFinite(major) && major >= 17) {
    const flag = '--openssl-legacy-provider';
    next.NODE_OPTIONS = next.NODE_OPTIONS
      ? `${next.NODE_OPTIONS} ${flag}`
      : flag;
  }
  return next;
}

module.exports = { applyOpensslLegacyProvider };
