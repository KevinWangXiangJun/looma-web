/**
 * Get current user ID from localStorage
 * Falls back to 'unknown' if not available
 */
export const getUserId = (): string => {
  try {
    const authUser = localStorage.getItem('AUTH_USER');
    if (authUser) {
      const user = JSON.parse(authUser);
      if (user && typeof user.id === 'string') {
        return user.id;
      }
    }
  } catch (e) {
    // ignore
  }

  // Default fallback
  return 'unknown';
};

/**
 * Get current user info from localStorage
 */
export const getCurrentUser = () => {
  try {
    const authUser = localStorage.getItem('AUTH_USER');
    if (authUser) {
      return JSON.parse(authUser);
    }
  } catch (e) {
    // ignore
  }

  return null;
};
