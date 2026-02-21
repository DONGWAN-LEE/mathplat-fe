import { ApiRequestError } from '../types';

describe('ApiRequestError', () => {
  it('should set code, message, status, and details', () => {
    const err = new ApiRequestError('AUTH_001', 'Unauthorized', 401, { reason: 'expired' });
    expect(err.code).toBe('AUTH_001');
    expect(err.message).toBe('Unauthorized');
    expect(err.status).toBe(401);
    expect(err.details).toEqual({ reason: 'expired' });
  });

  it('should have name === "ApiRequestError"', () => {
    const err = new ApiRequestError('ERR', 'msg', 500);
    expect(err.name).toBe('ApiRequestError');
  });

  it('should be an instance of Error', () => {
    const err = new ApiRequestError('ERR', 'msg', 500);
    expect(err).toBeInstanceOf(Error);
  });

  it('should have details as undefined when not provided', () => {
    const err = new ApiRequestError('ERR', 'msg', 400);
    expect(err.details).toBeUndefined();
  });

  it('should pass message to Error superclass', () => {
    const err = new ApiRequestError('ERR', 'test message', 500);
    expect(err.message).toBe('test message');
  });

  it('should have a stack trace', () => {
    const err = new ApiRequestError('ERR', 'msg', 500);
    expect(err.stack).toBeDefined();
    expect(err.stack).toContain('ApiRequestError');
  });

  it('should store details object correctly', () => {
    const details = { field: 'email', constraint: 'isEmail' };
    const err = new ApiRequestError('REQ_001', 'Validation failed', 400, details);
    expect(err.details).toEqual(details);
    expect(err.details?.field).toBe('email');
  });
});
