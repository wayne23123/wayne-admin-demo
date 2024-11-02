import { useCookies } from '@vueuse/integrations/useCookies';

const tokenKey = 'admin-token';

const cookie = useCookies();

// 獲取 token
export function getToken() {
  return cookie.get(tokenKey);
}

// 設置 token
export function setToken(token) {
  cookie.set(tokenKey, token);
}

// 清除 token
export function removeToken() {
  cookie.remove(tokenKey);
}
