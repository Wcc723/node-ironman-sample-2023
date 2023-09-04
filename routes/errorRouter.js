var express = require('express');
var router = express.Router();

const catchError = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next)
      .catch((err) => {
        console.log('錯誤捕捉:', err)
        res.status(500)
          .send({
            message: '伺服器錯誤'
          })
      }) // Promise
  };
}

// catchError(errorController(req, res, next));

const errorController = async function (req, res, next) { // 錯誤
  a; // 未定義
  res.send({
    message: '正常狀態',
  });
};
const someController = async function (req, res, next) { // 正常
  res.send({
    message: '正常狀態',
  });
};

// 獨立 controller
// 錯誤捕捉 => 回傳 500
router.get('/', catchError(errorController));

router.get('/no-catch', errorController);

router.get('/normal', catchError(someController)); // 也要能正確運作

module.exports = router;
