import axios from '@/axios';

// admin/image_class/:page?limit=10
export function getImageClassList(page) {
  return axios.get('/admin/image_class/' + page);
}
