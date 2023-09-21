# 台灣藍新金流範例

## 安裝及運行

1. 建立環境變數

請自行至藍新金流測試或正式網站申請資料，並將 .env.sample 轉為 `.env` 檔案，且按照需求填入。

2. 終端機輸入：
```
npm install
npm start
```

並直接開啟服務 `/` 即可開始相關流程

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
      <td>主要金流範例檔案</td>
      <td></td>
    </tr>
    <tr>
      <td>/views/index.ejs</td>
      <td>入口前端檔案</td>
      <td>可輸入對應的自訂資料</td>
    </tr>
    <tr>
      <td>/views/check.ejs</td>
      <td>觸發藍新金流前的相關資訊</td>
      <td></td>
    </tr>
    <tr>
      <td>/views/success.ejs</td>
      <td>交易完成的回傳頁面</td>
      <td></td>
    </tr>
    <tr>
      <td>/views/test.ejs</td>
      <td>交易完成，測試回傳用的請求頁面（可自行依據條件調整欄位內容）</td>
      <td></td>
    </tr>
  </tbody>
</table>

## 參考

- 藍新金流開發文件：https://www.newebpay.com/website/Page/content/download_api
- npm node-newebpay：https://www.npmjs.com/package/node-newebpay
- 部落格資料：https://ctaohe.github.io/2019/10/19/2019-10-19_newebpay/
