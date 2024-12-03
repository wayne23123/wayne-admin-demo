// login.js
export default [
  // 新增 /admin/login 模擬 API
  {
    url: '/api/admin/login', // 模擬 /admin/login 路徑
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          data: {
            token: 'mock-token-123456',
            message: '模擬的 mock API 登入成功',
          },
        };
      } else {
        return {
          code: 401,
          message: '帳號密碼錯誤',
        };
      }
    },
  },

  // 新增 /admin/info 模擬 API
  {
    url: '/api/admin/info', // 模擬 /admin/info 路徑
    method: 'post', // 使用 POST 方法
    response: () => {
      return {
        msg: 'ok',
        code: 200,
        data: {
          id: 3,
          username: 'admin',
          avatar: '',
          super: 1,
          role: { id: 2, name: '超級管理員' },
          menus: [
            {
              id: 5,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:09',
              update_time: '2023-12-21 19:31:11',
              name: '後台面板',
              desc: 'index',
              frontpath: null,
              condition: null,
              menu: 1,
              order: 1,
              icon: 'help',
              method: 'GET',
              child: [
                {
                  id: 10,
                  rule_id: 5,
                  status: 1,
                  create_time: '2023-08-11 13:37:02',
                  update_time: '2023-12-21 20:21:23',
                  name: '控制台',
                  desc: 'index',
                  frontpath: '/',
                  condition: null,
                  menu: 1,
                  order: 20,
                  icon: 'home-filled',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 6,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:36',
              update_time: '2023-12-21 19:37:11',
              name: '商品管理',
              desc: 'shop_goods_list',
              frontpath: null,
              condition: null,
              menu: 1,
              order: 2,
              icon: 'shopping-bag',
              method: 'GET',
              child: [
                {
                  id: 13,
                  rule_id: 6,
                  status: 1,
                  create_time: '2023-12-28 13:42:13',
                  update_time: '2023-12-21 20:21:42',
                  name: '商品管理',
                  desc: 'shop_goods_list',
                  frontpath: '/goods/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'shopping-cart-full',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 14,
                  rule_id: 6,
                  status: 1,
                  create_time: '2023-12-28 13:44:00',
                  update_time: '2023-12-21 20:22:00',
                  name: '分類管理',
                  desc: 'shop_category_list',
                  frontpath: '/category/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'menu',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 15,
                  rule_id: 6,
                  status: 1,
                  create_time: '2023-12-28 13:44:32',
                  update_time: '2023-12-21 20:22:11',
                  name: '規格管理',
                  desc: 'shop_sku_list',
                  frontpath: '/skus/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'aim',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 157,
                  rule_id: 6,
                  status: 1,
                  create_time: '2023-06-12 21:57:02',
                  update_time: '2023-12-21 20:22:52',
                  name: '優惠券管理',
                  desc: 'shop_coupon_list',
                  frontpath: '/coupon/list',
                  condition: '',
                  menu: 1,
                  order: 50,
                  icon: 'postcard',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 173,
              rule_id: 0,
              status: 1,
              create_time: '2023-12-21 19:38:21',
              update_time: '2023-12-21 19:38:21',
              name: '用戶管理',
              desc: '',
              frontpath: '',
              condition: '',
              menu: 1,
              order: 3,
              icon: 'user',
              method: 'GET',
              child: [
                {
                  id: 21,
                  rule_id: 173,
                  status: 1,
                  create_time: '2023-12-21 13:46:45',
                  update_time: '2023-12-21 20:22:35',
                  name: '用户管理',
                  desc: 'user_user-list_list',
                  frontpath: '/user/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'user-filled',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 22,
                  rule_id: 173,
                  status: 1,
                  create_time: '2023-12-21 13:46:59',
                  update_time: '2023-12-21 20:22:44',
                  name: '會員等級',
                  desc: 'user_user-level_list',
                  frontpath: '/level/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'data-analysis',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 7,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:40',
              update_time: '2023-12-21 19:37:18',
              name: '訂單管理',
              desc: 'order_order_list',
              frontpath: null,
              condition: null,
              menu: 1,
              order: 4,
              icon: 'message-box',
              method: 'GET',
              child: [
                {
                  id: 18,
                  rule_id: 7,
                  status: 1,
                  create_time: '2023-12-21 13:45:42',
                  update_time: '2023-12-21 20:23:02',
                  name: '訂單管理',
                  desc: 'order_order_list',
                  frontpath: '/order/list',
                  condition: '',
                  menu: 1,
                  order: 1,
                  icon: 'reading',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 17,
                  rule_id: 7,
                  status: 1,
                  create_time: '2023-12-21 13:44:56',
                  update_time: '2023-12-21 20:22:26',
                  name: '評論管理',
                  desc: 'shop_comment_list',
                  frontpath: '/comment/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'comment',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 8,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:43',
              update_time: '2023-12-21 19:37:25',
              name: '管理員管理',
              desc: 'user_user-list_list',
              frontpath: null,
              condition: null,
              menu: 1,
              order: 5,
              icon: 'management',
              method: 'GET',
              child: [
                {
                  id: 25,
                  rule_id: 8,
                  status: 1,
                  create_time: '2023-12-21 13:47:39',
                  update_time: '2023-12-21 20:23:53',
                  name: '管理員管理',
                  desc: 'set_manager',
                  frontpath: '/manager/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'coordinate',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 27,
                  rule_id: 8,
                  status: 1,
                  create_time: '2023-01-03 21:05:50',
                  update_time: '2023-12-21 20:24:04',
                  name: '權限管理',
                  desc: '',
                  frontpath: '/access/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'connection',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 33,
                  rule_id: 8,
                  status: 1,
                  create_time: '2023-01-04 18:15:47',
                  update_time: '2023-12-21 20:18:11',
                  name: '角色管理',
                  desc: '',
                  frontpath: '/role/list',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'histogram',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 9,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:50',
              update_time: '2023-12-21 19:10:15',
              name: '系统設定',
              desc: 'set_base',
              frontpath: null,
              condition: null,
              menu: 1,
              order: 6,
              icon: 'setting',
              method: 'GET',
              child: [
                {
                  id: 23,
                  rule_id: 9,
                  status: 1,
                  create_time: '2023-12-21 13:47:15',
                  update_time: '2023-12-21 20:23:12',
                  name: '基础設定',
                  desc: 'set_base',
                  frontpath: '/setting/base',
                  condition: '',
                  menu: 1,
                  order: 19,
                  icon: 'baseball',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 26,
                  rule_id: 9,
                  status: 1,
                  create_time: '2023-12-21 13:47:57',
                  update_time: '2023-12-21 20:23:22',
                  name: '交易設定',
                  desc: 'set_payment',
                  frontpath: '/setting/buy',
                  condition: '',
                  menu: 1,
                  order: 20,
                  icon: 'credit-card',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 24,
                  rule_id: 9,
                  status: 1,
                  create_time: '2023-12-21 13:47:27',
                  update_time: '2023-12-21 20:20:53',
                  name: '物流設定',
                  desc: 'set_express',
                  frontpath: '/setting/ship',
                  condition: '',
                  menu: 1,
                  order: 21,
                  icon: 'bicycle',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 177,
              rule_id: 0,
              status: 1,
              create_time: '2023-06-18 00:12:10',
              update_time: '2023-06-18 00:12:10',
              name: '分銷模組',
              desc: null,
              frontpath: '',
              condition: '',
              menu: 1,
              order: 7,
              icon: 'shopping-cart',
              method: 'GET',
              child: [
                {
                  id: 178,
                  rule_id: 177,
                  status: 1,
                  create_time: '2023-06-18 00:14:58',
                  update_time: '2023-06-18 00:14:58',
                  name: '分銷員管理',
                  desc: null,
                  frontpath: '/distribution/index',
                  condition: '',
                  menu: 1,
                  order: 50,
                  icon: 'user-filled',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 179,
                  rule_id: 177,
                  status: 1,
                  create_time: '2023-06-18 00:15:25',
                  update_time: '2023-06-18 00:15:25',
                  name: '分銷設定',
                  desc: null,
                  frontpath: '/distribution/setting',
                  condition: '',
                  menu: 1,
                  order: 50,
                  icon: 'set-up',
                  method: 'GET',
                  child: [],
                },
              ],
            },
            {
              id: 172,
              rule_id: 0,
              status: 1,
              create_time: '2023-12-21 19:10:34',
              update_time: '2023-12-21 19:10:47',
              name: '其他模組',
              desc: '',
              frontpath: '',
              condition: '',
              menu: 1,
              order: 8,
              icon: 'mostly-cloudy',
              method: 'GET',
              child: [
                {
                  id: 11,
                  rule_id: 172,
                  status: 1,
                  create_time: '2023-12-28 13:38:32',
                  update_time: '2023-12-21 20:23:43',
                  name: '圖庫管理',
                  desc: 'image',
                  frontpath: '/image/list',
                  condition: null,
                  menu: 1,
                  order: 20,
                  icon: 'picture-filled',
                  method: 'GET',
                  child: [],
                },
                {
                  id: 149,
                  rule_id: 172,
                  status: 1,
                  create_time: '2023-06-11 23:21:24',
                  update_time: '2023-12-21 20:23:33',
                  name: '公告管理',
                  desc: 'set_notice',
                  frontpath: '/notice/list',
                  condition: '',
                  menu: 1,
                  order: 50,
                  icon: 'notification',
                  method: 'GET',
                  child: [],
                },
              ],
            },
          ],
          ruleNames: [
            'createRule,POST',
            'updateRule,POST',
            'deleteRule,POST',
            'getRuleList,GET',
            'updateRuleStatus,POST',
            'createRole,POST',
            'updateRole,POST',
            'deleteRole,POST',
            'getRoleList,GET',
            'updateRoleStatus,POST',
            'getGoodsList,GET',
            'getCurrentImageList,GET',
            'getImageClassList,GET',
            'createImageClass,POST',
            'updateImageClass,POST',
            'deleteImageClass,POST',
            'uploadImage,POST',
            'deleteImage,POST',
            'updateImage,POST',
            'getCategoryList,GET',
            'createCategory,POST',
            'sortCategory,POST',
            'updateCategory,POST',
            'updateCategoryStatus,POST',
            'deleteCategory,DELETE',
            'getSkusList,GET',
            'createSkus,POST',
            'deleteSkus,POST',
            'updateSkus,POST',
            'updateSkusStatus,POST',
            'getOrderList,GET',
            'deleteOrder,POST',
            'shipOrder,POST',
            'refundOrder,POST',
            'exportOrder,POST',
            'getCommentList,GET',
            'reviewComment,POST',
            'updateCommentStatus,POST',
            'getUserList,GET',
            'createUser,POST',
            'updateUser,POST',
            'updateUserStatus,POST',
            'deleteUser,POST',
            'getUserLevelList,GET',
            'createUserLevel,POST',
            'updateUserLevel,POST',
            'updateUserLevelStatus,POST',
            'deleteUserLevel,POST',
            'deleteManager,POST',
            'getManagerList,GET',
            'createManager,POST',
            'updateManager,POST',
            'updateManagerStatus,POST',
            'getSysSetting,GET',
            'sysconfigUpload,POST',
            'setSysSetting,POST',
            'getSysSetting,GET',
            'setSysSetting,GET',
            'readGoods,GET',
            'updateGoodsSkus,POST',
            'setGoodsBanner,POST',
            'restoreGoods,POST',
            'destroyGoods,POST',
            'deleteGoods,POST',
            'updateGoodsStatus,POST',
            'createGoods,POST',
            'updateGoods,POST',
            'checkGoods,POST',
            'createGoodsSkusCard,POST',
            'sortGoodsSkusCard,POST',
            'updateGoodsSkusCard,POST',
            'deleteGoodsSkusCard,POST',
            'createGoodsSkusCardValue,POST',
            'updateGoodsSkusCardValue,POST',
            'deleteGoodsSkusCardValue,POST',
            'getNoticeList,GET',
            'createNotice,POST',
            'updateNotice,POST',
            'deleteNotice,POST',
            'getCouponList,GET',
            'createCoupon,POST',
            'updateCoupon,POST',
            'updateCouponStatus,POST',
            'getCategoryGoods,GET',
            'connectCategoryGoods,POST',
            'deleteCategoryGoods,POST',
            'getStatistics1,GET',
            'getStatistics2,GET',
            'getStatistics3,GET',
            'setRoleRules,POST',
            'deleteCoupon,POST',
            'getShipInfo,GET',
            'getExpressCompanyList,GET',
            'getAgentStatistics,GET',
            'getAgentList,GET',
            'getUserBillList,GET',
            'getDistributionSetting,GET',
            'setDistributionSetting,POST',
          ],
        },
      };
    },
  },

  {
    url: '/api/admin/statistics1', // 模擬 /admin/login 路徑
    method: 'get', // 使用 POST 方法
    response: ({ }) => {
      return {
        code: 200,
        msg: "ok",
        data: {
          "panels": [
            {
              "title": "付款訂單",
              "value": 51,
              "unit": "年",
              "unitColor": "success",
              "subTitle": "總付款訂單",
              "subValue": 51,
              "subUnit": ""
            },
            {
              "title": "訂單量",
              "value": 555,
              "unit": "周",
              "unitColor": "danger",
              "subTitle": "轉換率",
              "subValue": "60%",
              "subUnit": ""
            },
            {
              "title": "銷售額",
              "value": 3.74,
              "unit": "年",
              "unitColor": "",
              "subTitle": "總銷售額",
              "subValue": 3.74,
              "subUnit": ""
            },
            {
              "title": "新增用戶",
              "value": 17,
              "unit": "年",
              "unitColor": "warning",
              "subTitle": "總用戶",
              "subValue": 17,
              "subUnit": "人"
            }
          ]
        },
      };
    },
  },

  {
    url: '/api/admin/statistics3',
    method: 'get',
    response: ({ query }) => {
      const type = query.type;
      let data;
      switch (type) {
        case 'hour':
          data = {
            x: ["07-24", "07-23", "07-22", "07-21"],
            y: [51, 0, 1, 1],
          };
          break;
        case 'week':
          data = {
            x: ["Week 1", "Week 2", "Week 3", "Week 4"],
            y: [100, 200, 150, 300],
          };
          break;
        case 'month':
          data = {
            x: ["Jan", "Feb", "Mar", "Apr"],
            y: [300, 400, 350, 450],
          };
          break;
        default:
          data = {
            "x": [
              "07-24",
              "07-23",
              "07-22",
              "07-21",
              "07-20",
              "07-19",
              "07-18"
            ],
            "y": [
              51,
              0,
              1,
              1,
              0,
              2,
              1
            ]
          };
      }

      return {
        code: 200,
        msg: "ok",
        // data: {
        //   "x": [
        //     "07-24",
        //     "07-23",
        //     "07-22",
        //     "07-21",
        //     "07-20",
        //     "07-19",
        //     "07-18"
        //   ],
        //   "y": [
        //     51,
        //     0,
        //     1,
        //     1,
        //     0,
        //     2,
        //     1
        //   ]
        // },
        data: data,
      };
    },
  },

  {
    url: '/api/admin/statistics2', // 模擬 /admin/login 路徑
    method: 'get', // 使用 POST 方法
    response: ({ }) => {
      return {
        code: 200,
        msg: "ok",
        data: {
          "goods": [
            {
              "label": "審核中",
              "value": 0
            },
            {
              "label": "銷售中",
              "value": 98
            },
            {
              "label": "已下架",
              "value": 48
            },
            {
              "label": "庫存",
              "value": 6
            }
          ],
          "order": [
            {
              "label": "待付款",
              "value": 171
            },
            {
              "label": "等發貨",
              "value": 16
            },
            {
              "label": "已發貨",
              "value": 1
            },
            {
              "label": "退款中",
              "value": 17
            }
          ]
        },

      };

    },
  },

  {
    url: '/api/admin/example', // 模擬 /admin/login 路徑
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          data: {
            token: 'mock-token-123456',
            message: '模擬的 mock API 登入成功',
          },
        };
      } else {
        return {
          code: 401,
          message: '帳號密碼錯誤',
        };
      }
    },
  },
];
