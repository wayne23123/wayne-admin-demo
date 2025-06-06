import axios from '@/axios';
import { buildQueryParams } from '@/composables/util';

export function getGoodsList(page, query = {}) {
  let queryString = buildQueryParams(query);

  // let q = [];
  // for (const key in query) {
  //   if (query[key]) {
  //     q.push(`${key}=${encodeURIComponent(query[key])}`);
  //   }
  // }

  // let r = q.join('&');
  // r = r ? '?' + r : '';

  return axios.get(`/admin/goods/${page}${queryString}`);
}

// 批量上架/下架 0禁用 1啟用
export function updateGoodsStatus(ids, status) {
  return axios.post(`/admin/goods/changestatus`, {
    ids,
    status,
  });
}

export function createGoods(data) {
  return axios.post(`/admin/goods`, data);
}

export function updateGoods(id, data) {
  return axios.post(`/admin/goods/${id}`, data);
}

export function deleteGoods(ids) {
  return axios.post(`/admin/goods/delete_all`, { ids });
}

export function readGoods(id) {
  return axios.get(`/admin/goods/read/${id}`);
}

export function setGoodsBanner(id, data) {
  return axios.post(`/admin/goods/${id}`, data);
}

export function updateGoodsSkus(id, data) {
  return axios.post(`/admin/goods/updateskus/${id}`, data);
}
