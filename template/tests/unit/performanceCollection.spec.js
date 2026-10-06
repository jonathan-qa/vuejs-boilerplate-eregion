const collection = require('../performance/trweb-app-performance-test.postman_collection.json');

describe('performance Postman collection', () => {
  it('uses an absolute http URL so Newman can resolve the request', () => {
    const { url } = collection.item[0].request;
    const raw = typeof url === 'string' ? url : url.raw;

    expect(raw).toMatch(/^https?:\/\//);
    expect(url.protocol).toMatch(/^https?$/);
    expect(url.host.join('.')).toBe('127.0.0.1');
    expect(url.port).toBe('8080');
  });
});
