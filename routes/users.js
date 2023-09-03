const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router();

const key = 'Hexschool'

const users = {
  "aaa@gmail.com": {
    username: "123",
    password: ''
  }
}

// 1. 註冊
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);

  if (users[email]) {
    return res.status(400).send({ error: '用戶已存在'})
  }

  // 1-1 加密密碼
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  // 1-2 資料儲存
  users[email] = {
    password: hashPassword,
    username
  };

  // 1-3 回應
  res.status(201).send({
    message: '註冊成功'
  })

})


// 2. 登入
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 2-1 驗證用戶是否存在
  const user = users[email]
  if (!user) {
    return res.status(401).send({
      error: '用戶不存在'
    })
  }

  // 2-2 密碼驗證 密碼, 加密後的密碼
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({
      error: '登入錯誤',
    });
  } 


  // 2-3 JWT 簽章
  const token = jwt.sign({
    email, 
    username: user.username
  }, key); // key 原則上會儲存在環境變數
  console.log(token);

  // 2-4 回應
  res.send({
    message: '成功',
    token
  })
});


// 3. 驗證用戶（同時取得用戶資料）
router.get('/profile', (req, res) => {
  const token = req.headers['authorization']

  // 3-1 驗證用戶有送
  if (!token) {
    return res.status(401).send({
      error: '未登入'
    })
  }

  // 3-2 進行驗證
  jwt.verify(token, key, (err, user) => { // user 是剛剛儲存在 JWT Payload
    if (err) {
      return res.status(403).send({
        error: '驗證錯誤',
      });
    }

    console.log(users[user.email]);


    res.send({
      message: '成功',
      user
    })
  })
})


module.exports = router;
