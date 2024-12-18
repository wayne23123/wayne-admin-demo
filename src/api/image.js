import axios from '@/axios';

export function getImageList(id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`);
}

export function updateImageList(id, name) {
  return axios.post(`/admin/image/${id}`, { name });
}

export function deleteImageList(ids) {
  return axios.post(`/admin/image/delete_all`, { ids });
}
