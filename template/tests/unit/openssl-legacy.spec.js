const { applyOpensslLegacyProvider } = require('../../scripts/openssl-legacy');

describe('applyOpensslLegacyProvider', () => {
  it('does not set NODE_OPTIONS on Node 16', () => {
    const env = applyOpensslLegacyProvider({}, '16.20.2');
    expect(env.NODE_OPTIONS).toBeUndefined();
  });

  it('enables the legacy OpenSSL provider on Node 17+', () => {
    const env = applyOpensslLegacyProvider({}, '18.20.8');
    expect(env.NODE_OPTIONS).toBe('--openssl-legacy-provider');
  });

  it('preserves existing NODE_OPTIONS when appending the flag', () => {
    const env = applyOpensslLegacyProvider(
      { NODE_OPTIONS: '--max-old-space-size=2048' },
      '22.14.0',
    );
    expect(env.NODE_OPTIONS).toBe(
      '--max-old-space-size=2048 --openssl-legacy-provider',
    );
  });
});
