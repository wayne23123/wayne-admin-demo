import { ref } from 'vue';

// 當前商品 id
export const goodsId = ref(0);

// 規格選項列表
export const sku_card_list = ref([]);

// 初始化規格選項列表
export function initSkuCardList(data) {
  // console.log('data', data);

  sku_card_list.value = data.goodsSkusCard.map((item) => {
    item.text = item.name;
    item.loading = false;
    item.goodsSkusCardValue.map((value) => {
      value.text = value.value || '屬性值';
      return value;
    });
    return item;
  });
}

export function initSkusCardItem(id) {
  // console.log('id', id);

  const item = sku_card_list.value.find((item) => item.id === id);

  return {
    item,
  };
}

export function createGoodsSkusCard(data) {
  // console.log('data', data);

  return axios.post(`/admin/goods_skus_card`, data);
}
