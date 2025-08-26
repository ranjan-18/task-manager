// Utility to get an item from localStorage and parse JSON if needed
export const setToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

export const getFromLocalStorage = (key) => {
  if (!key) return null;
  try {
    const value = window.localStorage.getItem(key);
    // Try to parse JSON, fallback to raw value
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch {
    return null;
  }
};

export const clearLocalStorageCredentials = () => {
  setToLocalStorage("jwtToken", null);
  setToLocalStorage("userName", null);
  setToLocalStorage("userEmail", null);
};