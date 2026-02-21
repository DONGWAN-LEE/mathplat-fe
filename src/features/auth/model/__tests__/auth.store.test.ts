import { useAuthStore, type AuthUser } from '../auth.store';

const mockUser: AuthUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  picture: 'https://example.com/pic.jpg',
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,
    });
  });

  it('should have correct initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set auth with user and tokens', () => {
    useAuthStore.getState().setAuth(mockUser, 'access-123', 'refresh-456');
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.accessToken).toBe('access-123');
    expect(state.refreshToken).toBe('refresh-456');
    expect(state.isAuthenticated).toBe(true);
  });

  it('should update tokens only with setTokens', () => {
    useAuthStore.getState().setAuth(mockUser, 'old-access', 'old-refresh');
    useAuthStore.getState().setTokens('new-access', 'new-refresh');
    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('new-access');
    expect(state.refreshToken).toBe('new-refresh');
    expect(state.user).toEqual(mockUser);
  });

  it('should clear all state on logout', () => {
    useAuthStore.getState().setAuth(mockUser, 'access', 'refresh');
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set isHydrated to true', () => {
    expect(useAuthStore.getState().isHydrated).toBe(false);
    useAuthStore.getState().setHydrated();
    expect(useAuthStore.getState().isHydrated).toBe(true);
  });

  it('should handle setAuth then logout flow', () => {
    useAuthStore.getState().setAuth(mockUser, 'a', 'r');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('should handle setAuth then setTokens sequentially', () => {
    useAuthStore.getState().setAuth(mockUser, 'a1', 'r1');
    useAuthStore.getState().setTokens('a2', 'r2');
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.accessToken).toBe('a2');
    expect(state.refreshToken).toBe('r2');
    expect(state.isAuthenticated).toBe(true);
  });

  it('should use "auth-storage" as persist key', () => {
    // The persist middleware uses 'auth-storage' as the storage key
    // We verify by checking the persist configuration
    const persistOptions = (useAuthStore as unknown as { persist: { getOptions: () => { name: string } } }).persist;
    expect(persistOptions.getOptions().name).toBe('auth-storage');
  });
});
