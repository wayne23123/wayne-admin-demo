import { ref, reactive, computed } from 'vue';
import { toast } from '@/composables/util';

export function useInitTable(option = {}) {
  const isLoading = ref(false);

  // 列表，分頁，搜尋，刪除，修改狀態
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
        if (
          option.onGetListSuccess &&
          typeof option.onGetListSuccess == 'function'
        ) {
          option.onGetListSuccess(response);
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

  const handleDelete = (id) => {
    // console.log('id', id);

    isLoading.value = true;

    option
      .delete(id)
      .then((response) => {
        // console.log('response', response);

        toast('刪除成功');

        getData(1);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  // 修改狀態
  const handleStatusChange = (status, row) => {
    // console.log('status', status, 'row', row);

    row.statusLoading = true;

    option
      .updateStatus(row.id, status)
      .then((response) => {
        // console.log('response', response);

        toast('修改狀態成功');

        row.statue = status;
      })
      .finally(() => {
        row.statusLoading = false;
      });
  };

  // 多選選中 ID
  const multipleSelectionIds = ref([]);
  const handleSelectionChange = (events) => {
    // console.log('events', events);

    // console.log(
    //   'events.map(item=>item.id',
    //   events.map((item) => item.id)
    // );

    multipleSelectionIds.value = events.map((item) => {
      return item.id;
    });
  };

  // 批量刪除
  const multipleTableRef = ref(null);
  const handleMultipleDelete = () => {
    isLoading.value = true;

    // deleteSkus(multipleSelectionIds.value)
    option
      .delete(multipleSelectionIds.value)
      .then((response) => {
        toast('刪除成功');

        // 清空選中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection();
        }

        getData();
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  // 批量修改狀態 上架/下架
  const handleMultipleStatusChange = (status) => {
    isLoading.value = true;
    option
      .updateStatus(multipleSelectionIds.value, status)
      .then((response) => {
        toast('修改狀態成功');

        // 清空選中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection();
        }

        getData();
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    searchForm,
    resetSearchForm,
    isLoading,
    currentPage,
    total,
    limit,
    tableData,
    getData,
    handleDelete,
    handleStatusChange,
    handleSelectionChange,
    multipleTableRef,
    handleMultipleDelete,
    handleMultipleStatusChange,
  };
}

// 新增，修改
export function useInitForm(option = {}) {
  // 表單
  const formDrawerRef = ref(null);

  const formRef = ref(null);

  const defaultForm = option.form;

  const form = reactive({});

  const rules = option.rules || {};
  const editId = ref(0);
  const drawerTitle = computed(() => {
    return editId.value ? '修改' : '新增';
  });

  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;

      formDrawerRef.value.showLoadingButton();

      let body = {};
      if (option.onBeforeSubmit && typeof option.onBeforeSubmit == 'function') {
        body = option.beforeSubmit({ ...form });
      } else {
        body = form;
      }

      // const operation = editId.value
      //   ? updateManager(editId.value, form)
      //   : createManager(form);
      // const operation = editId.value
      // ? option.update(editId.value, form)
      // : option.create(form);
      const operation = editId.value
        ? option.update(editId.value, body)
        : option.create(body);

      // createNotice(form)
      operation(editId.value || form, form)
        .then((res) => {
          // console.log('res', res);

          toast(drawerTitle.value + '成功');

          // 修改刷新當前頁，新增刷新第一頁
          option.getData(editId.value ? false : 1);

          formDrawerRef.value.close();
        })
        .finally(() => {
          formDrawerRef.value.hideLoadingButton();
        });
    });
  };

  // 重置表單
  const resetForm = (row = false) => {
    if (formRef.value) {
      formRef.value.clearValidate();
    }

    for (const key in defaultForm) {
      form[key] = row[key];
    }
    // if (row) {
    //   for (const key in form) {
    //     form[key] = row[key];
    //   }
    // }
  };

  // 新增
  const handleCreate = () => {
    editId.value = 0;

    resetForm(defaultForm);
    // resetForm(option.form);

    formDrawerRef.value.open();
  };

  // 編輯
  const handleEdit = (row) => {
    // console.log('row', row);

    editId.value = row.id;

    resetForm(row);

    formDrawerRef.value.open();
  };

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit,
  };
}
