const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');
require('dotenv').config();

// 初始化 Firebase Admin SDK
// 載入 Firebase Admin 資源配置
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_STORAGE_BUCKET,
} = process.env;

const serviceAccount = {
  type: 'service_account',
  project_id: FIREBASE_PROJECT_ID,
  private_key_id: FIREBASE_PRIVATE_KEY_ID,
  private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

// 設定 Multer 的存儲設定
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ------------------------------
// 定義 '/upload' 路由，用於上傳圖片
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);

  // 檢查是否有文件被上傳
  if (!req.file) {
    res.status(400).send('沒有檔案上傳');
    return;
  }

  // 創建一個參考到 Firebase Storage 的文件，使用上傳的文件名
  const blob = bucket.file(req.file.originalname);

  // 創建一個寫入流來上傳文件到 Firebase Storage
  const blobStream = blob.createWriteStream({
    metadata: {
      // 設定文件的 MIME 類型
      contentType: req.file.mimetype,
    },
  });

  // 如果上傳過程中出現錯誤，返回 500 狀態碼和錯誤訊息
  blobStream.on('error', (error) => {
    res.status(500).send(error);
  });

  // 當文件上傳完成時，回傳文件在 Firebase Storage 的公開 URL
  blobStream.on('finish', () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURI(blob.name)}?alt=media`;
    res.status(200).send(publicUrl);
  });

  // 開始上傳文件，使用上傳的文件 buffer
  blobStream.end(req.file.buffer);
});

module.exports = router;
