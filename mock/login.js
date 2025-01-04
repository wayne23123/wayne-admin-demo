// login.js
export default [
  // 范例
  {
    url: '/api/admin/userinfo',
    method: 'post',
    response: ({ body, headers }) => {
      const token = headers.token;
      if (token === 'mock-token-123456') {
        const { email, username } = body;
        return {
          code: 200,
          data: {
            username: username || 'admin',
            email: email || 'admin@example.com',
          },
          message: '用户资讯更新成功',
        };
      } else {
        return {
          code: 401,
          message: '操作未授权',
        };
      }
    },
  },
  // 带查询参数的范例
  {
    url: '/api/admin/items',
    method: 'get',
    response: ({ query }) => {
      // 简单判断 query 带了哪些参数
      if (query.page && query.limit) {
        return {
          code: 200,
          data: {
            items: `你查询了第 ${query.page} 页，每页显示 ${query.limit} 条数据`,
          },
        };
      } else if (query.category) {
        return {
          code: 200,
          data: {
            items: `你查询的类别是 ${query.category}`,
          },
        };
      } else {
        return {
          code: 400,
          message: '请提供正确的查询参数',
        };
      }
    },
  },
  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id
    url: /^\/api\/admin\/test\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      // 从 URL 提取动态参数（例如 id）
      const id = url.split('/').pop(); // 获取最后一段作为 id

      if (id === '1') {
        return {
          msg: 'ok',
          data: {
            list: [
              {
                id: 168,
                name: '化妆品',
                order: 1001,
                images_count: 27,
              },
            ],
            totalCount: 12,
          },
        };
      } else {
        return {
          code: 404,
          message: `Image class with id ${id} not found.`,
        };
      }
    },
  },

  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id/delete
    url: /^\/api\/admin\/test\/\d+\/delete$/,
    method: 'post', // 如果你的请求是 POST，请保留这行
    response: ({ url }) => {
      try {
        // 从 URL 提取动态参数（例如 id）
        const id = url.split('/').slice(-2, -1)[0]; // 倒数第二段作为 id

        if (id === '168') {
          return {
            msg: 'ok',
            data: {
              message: `Image class with id ${id} has been successfully deleted.`,
            },
          };
        } else {
          return {
            code: 404,
            message: `Image class with id ${id} not found.`,
          };
        }
      } catch (error) {
        return {
          code: 500,
          message: `Internal Server Error: ${error.message}`,
        };
      }
    },
  },

  // 新增 /admin/login 模拟 API
  {
    url: '/api/admin/login', // 模拟 /admin/login 路径
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          data: {
            token: 'mock-token-123456',
            message: '模拟的 mock API 登入成功',
          },
        };
      } else {
        return {
          code: 401,
          message: '帐号密码错误',
        };
      }
    },
  },

  {
    url: '/api/admin/logout',
    method: 'post',
    response: ({}) => {
      return {
        code: 200,
        data: '退出登录成功',
      };
    },
  },

  // 新增 /admin/info 模拟 API
  {
    url: '/api/admin/info', // 模拟 /admin/info 路径
    method: 'post', // 使用 POST 方法
    response: () => {
      return {
        msg: 'ok',
        code: 200,
        data: {
          id: 3,
          username: '超级管理员',
          avatar: '',
          super: 1,
          role: { id: 2, name: '超级管理员' },
          menus: [
            {
              id: 5,
              rule_id: 0,
              status: 1,
              create_time: '2023-08-11 13:36:09',
              update_time: '2023-12-21 19:31:11',
              name: '后台面板',
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
                  name: '分类管理',
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
                  name: '规格管理',
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
                  name: '优惠券管理',
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
              name: '用户管理',
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
                  name: '会员等级',
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
              name: '订单管理',
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
                  name: '订单管理',
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
                  name: '评论管理',
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
              name: '管理员管理',
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
                  name: '管理员管理',
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
                  name: '权限管理',
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
              name: '系统设定',
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
                  name: '基础设定',
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
                  name: '交易设定',
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
                  name: '物流设定',
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
              name: '分销模组',
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
                  name: '分销员管理',
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
                  name: '分销设定',
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
              name: '其他模组',
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
                  name: '图库管理',
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
    url: '/api/admin/statistics1', // 模拟 /admin/login 路径
    method: 'get', // 使用 POST 方法
    response: ({}) => {
      return {
        code: 200,
        msg: 'ok',
        data: {
          panels: [
            {
              title: '付款订单',
              value: 51,
              unit: '年',
              unitColor: 'success',
              subTitle: '总付款订单',
              subValue: 51,
              subUnit: '',
            },
            {
              title: '订单量',
              value: 555,
              unit: '周',
              unitColor: 'danger',
              subTitle: '转换率',
              subValue: '60%',
              subUnit: '',
            },
            {
              title: '销售额',
              value: 3.74,
              unit: '年',
              unitColor: '',
              subTitle: '总销售额',
              subValue: 3.74,
              subUnit: '',
            },
            {
              title: '新增用户',
              value: 17,
              unit: '年',
              unitColor: 'warning',
              subTitle: '总用户',
              subValue: 17,
              subUnit: '人',
            },
          ],
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
            x: ['07-24', '07-23', '07-22', '07-21'],
            y: [51, 0, 1, 1],
          };
          break;
        case 'week':
          data = {
            x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            y: [100, 200, 150, 300],
          };
          break;
        case 'month':
          data = {
            x: ['Jan', 'Feb', 'Mar', 'Apr'],
            y: [300, 400, 350, 450],
          };
          break;
        default:
          data = {
            x: ['07-24', '07-23', '07-22', '07-21', '07-20', '07-19', '07-18'],
            y: [51, 0, 1, 1, 0, 2, 1],
          };
      }

      return {
        code: 200,
        msg: 'ok',
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
    url: '/api/admin/statistics2', // 模拟 /admin/login 路径
    method: 'get', // 使用 POST 方法
    response: ({}) => {
      return {
        code: 200,
        msg: 'ok',
        data: {
          goods: [
            {
              label: '审核中',
              value: 0,
            },
            {
              label: '销售中',
              value: 98,
            },
            {
              label: '已下架',
              value: 48,
            },
            {
              label: '库存',
              value: 6,
            },
          ],
          order: [
            {
              label: '待付款',
              value: 171,
            },
            {
              label: '等发货',
              value: 16,
            },
            {
              label: '已发货',
              value: 1,
            },
            {
              label: '退款中',
              value: 17,
            },
          ],
        },
      };
    },
  },

  {
    url: '/api/admin/example', // 模拟 /admin/login 路径
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          data: {
            token: 'mock-token-123456',
            message: '模拟的 mock API 登入成功',
          },
        };
      } else {
        return {
          code: 401,
          message: '帐号密码错误',
        };
      }
    },
  },

  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id
    url: /^\/api\/admin\/image_class\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      // 从 URL 提取动态参数（例如 id）
      const id = url.split('/').pop(); // 获取最后一段作为 id
      if (id === '1') {
        return {
          msg: 'ok',
          data: {
            list: [
              {
                id: 168,
                name: '化妆品',
                order: 1001,
                images_count: 27,
              },
              {
                id: 133,
                name: '家电',
                order: 1001,
                images_count: 7,
              },
              {
                id: 174,
                name: '123',
                order: 50,
                images_count: 1,
              },
              {
                id: 173,
                name: '服装服饰',
                order: 50,
                images_count: 1,
              },
              {
                id: 172,
                name: '卫浴用品',
                order: 50,
                images_count: 1,
              },
              {
                id: 171,
                name: '其他',
                order: 50,
                images_count: 1,
              },
              {
                id: 170,
                name: '手机3C',
                order: 50,
                images_count: 1,
              },
              {
                id: 169,
                name: '健身用品',
                order: 50,
                images_count: 1,
              },
              {
                id: 107,
                name: '露营旅行',
                order: 9,
                images_count: 5,
              },
              {
                id: 126,
                name: '居家生活',
                order: 8,
                images_count: 2,
              },
            ],
            totalCount: 12,
          },
        };
      }
    },
  },

  {
    url: '/api/admin/image_class', // 模拟 /api/admin/image_class 路径
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      // 处理 form-data 格式的 key: name 和 order
      const { name, order } = body;

      // 返回模拟资料
      return {
        code: 200,
        msg: 'ok', // 固定消息
        data: {
          name: name || 'default-name', // 使用传入的 name 或预设值
          order: order || 'default-order', // 使用传入的 order 或预设值
          id: '1305', // 固定 id
        },
      };
    },
  },

  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id/delete
    url: /^\/api\/admin\/image_class\/\d+\/delete$/,
    method: 'post', // 如果你的请求是 POST，请保留这行
    response: ({ url }) => {
      try {
        // 从 URL 提取动态参数（例如 id）
        const id = url.split('/').slice(-2, -1)[0]; // 倒数第二段作为 id

        if (id === '168') {
          return {
            msg: 'ok',
            data: {
              message: `Image class with id ${id} has been successfully deleted.`,
            },
          };
        } else {
          return {
            code: 404,
            message: `Image class with id ${id} not found.`,
          };
        }
      } catch (error) {
        return {
          code: 500,
          message: `Internal Server Error: ${error.message}`,
        };
      }
    },
  },

  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id/image/:page
    url: /^\/api\/admin\/image_class\/\d+\/image\/\d+$/,
    method: 'get', // 改为 GET
    response: ({ url }) => {
      try {
        // 从 URL 提取动态参数（例如 id）
        const segments = url.split('/');
        const id = segments[segments.length - 3]; // 倒数第三段作为 id
        const page = segments[segments.length - 1]; // 倒数第一段作为 page

        // 返回的 mock 数据
        return {
          msg: 'ok',
          data: {
            list: [
              {
                id: 1507,
                url: 'https://picsum.photos/150/150?random=1',
                name: '龙',
                path: 'public/675fd38cca07c.jpg',
                create_time: '2024-12-16 15:15:24',
                update_time: '2024-12-16 15:15:29',
                image_class_id: parseInt(id, 10),
              },
              {
                id: 493,
                url: 'https://picsum.photos/150/150?random=2',
                name: '3.333',
                path: 'public/62af04afe39fa.jpg',
                create_time: '2022-06-19 19:12:48',
                update_time: '2024-12-16 15:08:59',
                image_class_id: parseInt(id, 10),
              },
            ],
            // page: parseInt(page, 10), // 返回 page 信息
            totalCount: 25,
          },
        };
      } catch (error) {
        return {
          msg: 'error',
          error: error.message,
        };
      }
    },
  },

  {
    url: /^\/api\/admin\/image\/\d+$/, // 使用正则表达式匹配类似 /api/admin/image/1507 的路径
    method: 'post',
    response: ({ url, body, headers }) => {
      const id = url.split('/').pop(); // 从 URL 中提取 id
      const { name } = body;

      // 验证 headers 中的 cookie 是否正确
      if (
        !headers['cookie'] ||
        !headers['cookie'].includes('admin-token=mock-token-123456')
      ) {
        return {
          code: 401,
          msg: 'Unauthorized: Invalid or missing token',
        };
      }

      // 返回模拟资料
      return {
        code: 200,
        msg: 'Image updated successfully',
        data: {
          id: id,
          name: name || 'default-name',
        },
      };
    },
  },

  {
    url: '/api/admin/image/delete_all', // 精确匹配 API 路径
    method: 'post',
    response: ({ body, headers }) => {
      const { ids } = body;

      // 验证 headers 中的 cookie 是否正确
      if (
        !headers['cookie'] ||
        !headers['cookie'].includes('admin-token=mock-token-123456')
      ) {
        return {
          code: 401,
          msg: 'Unauthorized: Invalid or missing token',
        };
      }

      // 验证 ids 是否为阵列
      if (!Array.isArray(ids) || ids.length === 0) {
        return {
          code: 400,
          msg: 'Invalid request: ids must be a non-empty array',
        };
      }

      // 模拟成功回应
      return {
        code: 200,
        msg: 'Images deleted successfully',
        data: {
          deletedIds: ids,
        },
      };
    },
  },

  {
    // 使用正则匹配动态参数，例如 /api/admin/image_class/:id
    url: /^\/api\/admin\/notice\/\d+$/,
    method: 'get',
    response: ({ url }) => {
      // 从 URL 提取动态参数（例如 id）
      const id = url.split('/').pop(); // 获取最后一段作为 id

      if (id === '1') {
        return {
          msg: 'ok',
          data: {
            list: [
              {
                id: 1226,
                title: '公告',
                content: '公告',
                order: 50,
                create_time: '2024-12-25 21:15:08',
                update_time: '2024-12-25 21:15:35',
              },
              {
                id: 1224,
                title: '安安你好',
                content: '安安你好',
                order: 50,
                create_time: '2024-12-25 20:16:54',
                update_time: '2024-12-25 20:17:00',
              },
              {
                id: 1215,
                title: '第一条公告',
                content: '第一条公告',
                order: 50,
                create_time: '2024-12-25 11:44:52',
                update_time: '2024-12-25 11:44:52',
              },
            ],
            totalCount: 3,
          },
        };
      } else {
        return {
          code: 404,
          message: `Image class with id ${id} not found.`,
        };
      }
    },
  },

  {
    url: `/api/admin/notice`,
    method: 'post',
    response: ({ body }) => {
      const { content, title } = body;
      const now = new Date().toISOString().replace('T', ' ').split('.')[0];
      return {
        msg: 'ok',
        data: {
          content,
          title,
          create_time: now,
          update_time: now,
          id: '1301', // 模拟 ID
        },
      };
    },
  },

  {
    url: /^\/api\/admin\/notice\/\d+\/delete$/, // 使用正则匹配动态路由
    method: 'post',
    response: ({ url }) => {
      // 从 URL 中提取动态参数（例如 ID）
      const id = url.split('/').slice(-2, -1)[0]; // 获取倒数第二段作为 ID
      return {
        msg: 'ok',
        data: {
          id,
        },
      };
    },
  },
];
