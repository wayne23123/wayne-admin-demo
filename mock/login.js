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
        code: 200,
        data: {
          avatar: '',
          id: 3,
          menu: [{}],
          role: { id: 2, name: '超級管理員' },
          ruleNames: ['createRule,POST', 'updateRule,POST', 'deleteRule,POST'],
          super: 1,
          username: 'admin',
        },
      };
    },
  },
];
