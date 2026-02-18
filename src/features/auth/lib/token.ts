interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
}

export function getTokenExpiryMs(token: string): number {
  const payload = decodeJwt(token);
  if (!payload) return 0;
  return payload.exp * 1000 - Date.now();
}
