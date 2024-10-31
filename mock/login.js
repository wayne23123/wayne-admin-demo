// login.js
export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          id: 1,
          name: 'John Doe',
          age: 30,
        },
      };
    },
  },
  {
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Doe', age: 25 },
        ],
      };
    },
  },
  // 新增 /admin/login 模擬 API
  {
    url: '/api/admin/login', // 模擬 /admin/login 路徑
    method: 'post', // 使用 POST 方法
    response: ({ body }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'password') {
        return {
          code: 200,
          data: {
            token: 'mock-token-123456',
            message: 'Login successful',
          },
        };
      } else {
        return {
          code: 401,
          message: 'Invalid username or password',
        };
      }
    },
  },
];
