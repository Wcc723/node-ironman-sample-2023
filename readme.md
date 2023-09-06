# 台灣綠界金流範例

## 環境

綠界官方建議：
- node-v6.11.0-x64 以上
- ECMA Script6
- npm install ecpay_aio_nodejs

## 安裝及運行

1. 建立環境變數

將 .env.sample 轉為 `.env` 檔案，並按照需求填入

2. 終端機輸入：
```
npm install
npm start
```

並直接開啟服務就會轉址至綠界金流

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
      <td>啟動後，只要進入本頁面會直接觸發金流轉址</td>
    </tr>
    <tr>
      <td>/views/return.ejs</td>
      <td>交易完成的回傳頁面</td>
      <td></td>
    </tr>
    <tr>
      <td>/public/returnTest.html</td>
      <td>交易完成，測試回傳用的請求頁面（可自行依據條件調整欄位內容）</td>
      <td></td>
    </tr>
  </tbody>
</table>

## 參考

- 綠界金流開發文件：https://developers.ecpay.com.tw/?p=2864
- 綠界金流 SDK：https://github.com/ECPay/ECPayAIO_Node.js
