export default {
  // 登录
  'POST /api/user/login': (req, res) => {
    res.send({
      code: 0,
      data: {
        userId: '1616150376553798',
        username: '刘洪博',
        department: '483652557',
        avatar:
          'https://static-legacy.dingtalk.com/media/lADPD26ePpmh0z_NC9DNC9A_3024_3024.jpg',
        jobNumber: 'L3613',
      },
      message: null,
    });
  },

  // 权限校验
  'POST /api/sso/auth/check': (req, res) => {
    res.send({
      code: 0,
      data: {
        isLogin: true,
      },
      message: null,
    });
  },
  // 登出
  'POST /api/user/outLogin': (req, res) => {
    res.send({
      data: {},
      message: '',
      code: '000000',
    });
  },
};
