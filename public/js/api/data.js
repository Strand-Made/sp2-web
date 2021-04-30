export const url = "http://localhost:1337";
const userKey = "username";
const tokenKey = "token";
const cartKey = "cart";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getStorage(tokenKey);
}

export function getUsername() {
  const user = getStorage(userKey);
  if (user) {
    return user.username;
  }
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function logOutUser() {
  return clearStorage(userKey), clearStorage(tokenKey);
}

export function storageKey(key) {}

export function setStorage(key, content) {}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}

export function clearStorage(key) {
  localStorage.removeItem(key);
}

export function removeFromStorage(key, value) {
  localStorage.removeItem(key, value);
}

export function saveItem(key, products) {
  localStorage.setItem(key, JSON.stringify(products));
}
