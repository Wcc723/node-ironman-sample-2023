# AWS S3 Node.js 上傳範例

## 安裝及運行

1. 建立環境變數

請自行至 [AWS 網站](https://aws.amazon.com/tw/) 透過 IAM 申請專屬 Access key 以及建立儲存桶(Bucket)，並將 .env.sample 轉為 `.env` 檔案，且按照需求填入。

2. 終端機輸入：

```
npm install
npm start
```

並直接開啟服務 `{host}/index.html` 即可體驗靜態檔案上傳功能。

## 專案檔案說明

<table>
  <thead>
    <tr>
      <th>檔案路徑</th>
      <th>用途</th>
      <th>備註</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.env | .env.sample</td>
      <td>環境變數 | 環境變數範例檔案</td>
      <td></td>
    </tr>
    <tr>
      <td>/routes/index.js</td>
      <td>主要檔案上傳範例檔案</td>
      <td></td>
    </tr>
    <tr>
      <td>/public/index.html</td>
      <td>入口前端檔案</td>
      <td></td>
    </tr>
  </tbody>
</table>

## 參考

- [AWS 雲服務](https://aws.amazon.com/tw/)
- [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3) 
- [Multer](https://www.npmjs.com/package/multer)
