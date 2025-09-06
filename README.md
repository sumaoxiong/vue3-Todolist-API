此專案是一個使用 **Vite + Vue3** 製作的 Todolist，主要功能包含：

- 新增、刪除、編輯待辦事項
- 標記已完成/未完成
- 與 API 串接，資料可持久化
- 登入註冊

此專案的目標是練習 **Vue3 Composition API** 與 **前後端 API 串接**，並強調程式碼風格的維護（整合 ESLint）。

## Demo

[線上體驗連結](https://)

## 專案畫面

![專案截圖](./public/demo.png)

## 使用技術

- 主要框架與工具：Vite、Vue3、Composition API
- API/資料處理：axios
- 開發輔助：ESLint

## 專案結構

```
vue3-Todolist-API/
├── public/              # 靜態資源
├── src/
│   ├── assets/          # 圖片與樣式
│   ├── components/      # Vue 元件
│   ├── views/           # 頁面
│   ├── App.vue          # 根組件
│   └── main.js          # 程式入口
├── package.json
├── vite.config.js
└── ...

```

## 環境建置

1. 複製專案

```sh
git clone <repo-url>
```

2. 進入專案資料夾

```sh
cd vue3-Todolist-API
```

3. 安裝套件

```sh
npm install
```

4. 運行專案

```sh
npm run dev
```

5. 停止運行專案
   鍵盤 ctrl/control + C

## 其他指令

**靜態檔案生成**

```sh
npm run build
```

**程式碼檢查**

```sh
npm run lint
```

> 建議在 commit 前執行 ESLint，確保程式碼符合規範
