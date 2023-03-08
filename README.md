# ewayProject

## 使用技術
*  使用 CSS animation 製作海浪、划槳、煙火及烏龜動畫
*  使用 Sass 製作自適應網站 （BreakPoint為1920px、768px、414px）
*  使用 Vue3 option API 
*  使用 gulp 完成打包任務

## 開發功能：
* 表單驗證：
  * 表單內的欄位需驗證必填及輸入值的格式，若未通過驗證請顯示相對應的樣式及錯誤訊息。
  * name 只能輸入中英文、phone 只能輸入數字且長度須為10碼以及需為手機格式、 Amount of consumption 只能輸入數字且最小為0。
  * 必填驗證未通過請提示『required』、格式驗證未通過請提示  wrong format。
  * 表單內的 store 欄位，使用datalist相同模糊搜尋功能，若在option 中過濾不到輸入值，則提示 no result 。
  * submit 按鈕：若有一個欄位驗證不通過則無法 submit，另submit 後顯示 成功/失敗。


