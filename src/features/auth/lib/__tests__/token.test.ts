import { decodeJwt, isTokenExpired, getTokenExpiryMs } from '../token';

function createJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.signature`;
}

describe('decodeJwt', () => {
  it('should decode a valid JWT payload', () => {
    const payload = { sub: '1', email: 'a@b.com', iat: 100, exp: 200 };
    const token = createJwt(payload);
    expect(decodeJwt(token)).toEqual(payload);
  });

  it('should return null for token with wrong number of parts', () => {
    expect(decodeJwt('only.two')).toBeNull();
    expect(decodeJwt('one')).toBeNull();
  });

  it('should return null for invalid base64 payload', () => {
    expect(decodeJwt('a.!!!invalid!!!.c')).toBeNull();
  });

  it('should handle base64url characters (- and _)', () => {
    const payload = { sub: '1', email: 'test@example.com', iat: 100, exp: 200 };
    const json = JSON.stringify(payload);
    const base64url = btoa(json).replace(/\+/g, '-').replace(/\//g, '_');
    const token = `header.${base64url}.sig`;
    expect(decodeJwt(token)).toEqual(payload);
  });

  it('should return null for empty string', () => {
    expect(decodeJwt('')).toBeNull();
  });
});

describe('isTokenExpired', () => {
  it('should return false for a non-expired token', () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    const token = createJwt({ sub: '1', email: 'a@b.com', iat: 100, exp: futureExp });
    expect(isTokenExpired(token)).toBe(false);
  });

  it('should return true for an expired token', () => {
    const pastExp = Math.floor(Date.now() / 1000) - 3600;
    const token = createJwt({ sub: '1', email: 'a@b.com', iat: 100, exp: pastExp });
    expect(isTokenExpired(token)).toBe(true);
  });

  it('should return true for an invalid token', () => {
    expect(isTokenExpired('invalid.token.here')).toBe(true);
  });
});

describe('getTokenExpiryMs', () => {
  it('should return positive milliseconds for non-expired token', () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    const token = createJwt({ sub: '1', email: 'a@b.com', iat: 100, exp: futureExp });
    const ms = getTokenExpiryMs(token);
    expect(ms).toBeGreaterThan(0);
    expect(ms).toBeLessThanOrEqual(3600 * 1000);
  });

  it('should return 0 for an invalid token', () => {
    expect(getTokenExpiryMs('bad')).toBe(0);
  });
});
