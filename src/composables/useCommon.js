import { ref, reactive, computed } from 'vue';
import { getManagerList } from '@/api/manager';

export function useInitTable(option = {}) {
  const isLoading = ref(false);

  // 分页
  const currentPage = ref(1);
  const total = ref(0);
  const limit = ref(10);

  let searchForm = null;

  let resetSearchForm = null;

  if (option.searchForm) {
    searchForm = reactive({
      ...option.searchForm,
    });

    resetSearchForm = () => {
      for (const key in option.searchForm) {
        searchForm[key] = option.searchForm[key];
      }

      getData();
    };
  }

  //   const searchForm = reactive({
  //     keyword: '',
  //   });
  //   const resetSearchForm = () => {
  //     searchForm.keyword = '';
  //     getData();
  //   };

  const tableData = ref([]);

  const getData = (page = null) => {
    // console.log('page', page);
    if (typeof page == 'number') {
      currentPage.value = page;
    }

    isLoading.value = true;

    // getManagerList(currentPage.value)
    // getManagerList(currentPage.value, searchForm)
    option
      .getList(currentPage.value, searchForm)
      .then((response) => {
        if (option.onSuccess && typeof option.onSuccess == 'function') {
          option.onSuccess(response);
        } else {
          tableData.value = response?.data?.data?.list;

          total.value = response?.data?.data?.totalCount;
        }

        // console.log('response', response);

        // tableData.value = response?.data?.data?.list;

        // tableData.value = response?.data?.data?.list.map((object) => {
        //   object.statusLoading = false;
        //   return object;
        // });

        // total.value = response?.data?.data?.totalCount;

        // roles.value = response?.data?.data?.roles;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };
  getData();

  return {
    searchForm,
    resetSearchForm,
    isLoading,
    currentPage,
    total,
    limit,
    tableData,
    getData,
  };
}
