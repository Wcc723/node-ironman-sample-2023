const express = require('express');
const router = express.Router();

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, JWT_SECRET, HOST } = process.env;

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/callback`,
});

// 授權路由
router.post('/login', (req, res) => {
  // 產生 Google 授權 URL，如果要取得額外資訊，須在 scope 參數中加入對應欄位
  // 參考：https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  res.redirect(authorizeUrl); // 重定向至 Google 授權頁面
});

// 回傳路由
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // 用授權碼換取 token
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // 透過 Google API 取得用戶資訊
    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });

    // 創建 JWT
    const token = jwt.sign(userInfo.data, JWT_SECRET);
    // 將 JWT 儲存在 Cookie，前端可從 Cookie 中讀取值
    res.cookie('token', token);
    res.redirect('/'); // 跳轉回前端頁面
  } catch (error) {
    console.error(error);
    res.status(400).send('Error fetching Google user info');
  }
});

// 驗證 JWT
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);

  // 驗證 JWT token
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next(); // 驗證成功，進行下一個處理程序
    });
  } else {
    res.sendStatus(401);
  }
}

router.get('/user', authenticateJWT, async (req, res) => {
  try {
    // 使用保存在 req.user 的資料重新取得用戶個人資料
    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    res.json(userInfo.data); // 回傳用戶資訊
  } catch (error) {
    console.error(error);
    res.status(400).send('Error fetching user info');
  }
});

module.exports = router;
