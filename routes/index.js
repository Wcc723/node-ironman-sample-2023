const express = require('express'); // 引入 Express 框架
const router = express.Router();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3'); // 引入 AWS SDK S3 的客戶端和命令
const multer = require('multer'); // 引入 multer 用於處理上傳的檔案
require('dotenv').config(); // 載入環境變數

// 從環境變數中取得 AWS 設定
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_REGION,
  BUCKET_NAME,
} = process.env;

// 建立新的 S3 用戶端實例，設定區域和認證資訊
const s3Client = new S3Client({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// 使用 multer 設定上傳儲存和檔案過濾規則
const upload = multer({
  storage: multer.memoryStorage(), // 使用記憶體儲存，檔案將保存在 RAM 中
  fileFilter: function (req, file, cb) {
    // 驗證檔案類型，只接受 jpg 和 png 格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only jpg and png formats are allowed!'), false);
    }
    cb(null, true);
  },
});

// 建立 POST 路由用於上傳檔案到 AWS S3
router.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    const key = Date.now().toString() + '-' + req.file.originalname; // 生成檔案名稱

    try {
      // 建立並發送 PutObjectCommand
      // PutObjectCommand 用於將檔案上傳到 Amazon Simple Storage Service (Amazon S3) 的儲存桶（bucket）。
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });
      await s3Client.send(command); // 發送命令

      // 創建 S3 的 URL
      const imageUrl = `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;

      // 回傳成功訊息和圖片 URL
      res.json({
        message: '檔案上傳成功！',
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.log(error); // 錯誤訊息
      res.status(500).send('檔案上傳失敗'); // 回傳上傳失敗訊息
    }
  } else {
    res.status(400).send('沒有上傳檔案'); // 沒有上傳檔案，回傳錯誤訊息
  }
});

module.exports = router; // 導出路由器模組
