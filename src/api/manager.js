import axios from '@/axios';

export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password,
  });
}

export function getinfo() {
  return axios.post('/admin/info');
}

export function logout() {
  return axios.post('/admin/logout');
}

export function updatepassword(data) {
  return axios.post('/admin/updatepassword', data);
}

export function getManagerList(page, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }

  let r = q.join('&');
  r = r ? '?' + r : '';

  // limit = 10 & keyword = ceshi

  return axios.get(`/admin/manager/${page}${r}`);
}

// 0禁用 1啟用
export function updateManagerStatus(id, statue) {
  return axios.post(`/admin/manager/${id}/${statue}`);
}

export function createManager(data) {
  return axios.post(`/admin/manager`, data);
}

export function updateManager(id, data) {
  return axios.post(`/admin/manager/${id}`, data);
}

export function deleteManager(id) {
  return axios.post(`/admin/manager/${id}/delete`);
}
