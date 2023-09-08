# GitHub 第三方登入

## 安裝及運行

1. 建立環境變數

請自行至 [GitHub Developer Settings](https://github.com/settings/developers) 申請 OAuth 2.0 憑證，並將 .env.sample 轉為 `.env` 檔案，且按照需求填入。

2. 終端機輸入：

```
npm install
npm start
```

並直接開啟服務 `{host}/index.html` 即可體驗第三方登入的功能。

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
      <td>主要第三方登入範例檔案</td>
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

- [GitHub Developer Settings](https://github.com/settings/developers)
