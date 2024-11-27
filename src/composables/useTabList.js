import { ref } from 'vue';

import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

import { useCookies } from '@vueuse/integrations/useCookies';

export function useTabList() {
  const route = useRoute();

  const router = useRouter();

  const cookie = useCookies();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: '後台首頁',
      path: '/',
    },
  ]);

  const addTab = (tab) => {
    let noTab =
      tabList.value.findIndex((item) => {
        return item.path == tab.path;
      }) == -1;
    if (noTab) {
      tabList.value.push(tab);
    }

    cookie.set('tabList', tabList.value);
  };

  const changeTab = (tab) => {
    // console.log('tab', tab);
    activeTab.value = tab;
    router.push(tab);
  };

  const removeTab = (value) => {
    // console.log('value', value);

    let tabs = tabList.value;
    let active = activeTab.value;

    if (active == value) {
      tabs.forEach((item, index) => {
        if (item.path == value) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            active = nextTab.path;
          }
        }
      });
    }

    activeTab.value = active;

    changeTab(active);

    tabList.value = tabList.value.filter((item) => item.path != value);

    cookie.set('tabList', tabList.value);
  };

  // 初始化 tab 導覽列
  const initTabList = () => {
    let tabs = cookie.get('tabList');
    if (tabs) {
      tabList.value = tabs;
    }
  };
  initTabList();

  const handleClose = (value) => {
    // console.log('value', value);

    if (value == 'clearAll') {
      // 切換回首頁
      activeTab.value = '/';

      // 過濾只剩下首頁
      tabList.value = [
        {
          title: '後台首頁',
          path: '/',
        },
      ];
    } else if (value == 'clearOther') {
      // 過濾只剩下首頁和當前頁面
      tabList.value = tabList.value.filter((item) => {
        return item.path == '/' || item.path == activeTab.value;
      });
    }

    cookie.set('tabList', tabList.value);
  };

  onBeforeRouteUpdate((to, from) => {
    // console.log('to', to);
    // console.log({
    //   title: to.meta.title,
    //   path: to.path,
    // });

    activeTab.value = to.path;

    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose,
  };
}
