const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// 從環境變量中獲取 GitHub 和 JWT 的配置信息
const { GITHUB_CLIENT_ID, GITHUB_SECRET, JWT_SECRET, HOST } = process.env;

// 定義 GitHub OAuth 的配置信息
const GITHUB_CONFIG = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_SECRET,
  redirectURI: `${HOST}/callback`,
};

// 路由處理 GitHub 登錄
router.post('/login', (req, res) => {
  // 建立並重定向到 GitHub 授權 URL，如果要另外取得 Email 資料需補上 scope=user:email
  // 參考：https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
  const authURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CONFIG.clientID}&redirect_uri=${GITHUB_CONFIG.redirectURI}&scope=user:email`;
  res.redirect(authURL);
});

// 路由處理 GitHub 回傳
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  // 使用授權碼換取存取 Token
  const tokenURL = `https://github.com/login/oauth/access_token`;
  const response = await axios.post(tokenURL, null, {
    params: {
      client_id: GITHUB_CONFIG.clientID,
      client_secret: GITHUB_CONFIG.clientSecret,
      code: code,
    },
    headers: {
      Accept: 'application/json',
    },
  });
  const { access_token } = response.data;

  // 使用存取 Token 獲取 GitHub 用戶資訊
  const userResponse = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${access_token}` },
  });

  // 獲取用戶電子郵件地址
  const emailResponse = await axios.get('https://api.github.com/user/emails', {
    headers: { Authorization: `token ${access_token}` },
  });
  const user = {
    ...userResponse.data,
    email: emailResponse.data[0].email,
  };

  // 可在此處將用戶資訊存儲到資料庫

  // 生成 JWT 並設置為 cookie
  const token = jwt.sign(user, JWT_SECRET);

  res.cookie('token', token);
  res.redirect('/index.html'); // 跳轉回前端頁面
});

// JWT 驗證 middleware
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // 令牌無效
      }

      req.user = user; // 附加用戶資訊到請求
      next(); // 繼續處理請求
    });
  } else {
    res.sendStatus(401); // 沒有提供令牌
  }
}

// 受保護的路由範例，需要 JWT 驗證
router.get('/user', authenticateJWT, (req, res) => {
  res.json({ user: req.user }); // 返回驗證後的用戶資訊
});

module.exports = router;
