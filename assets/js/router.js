// Router 初始化
console.log("Router Loaded");

// 取得網址參數
const params = new URLSearchParams(window.location.search);

// 目前頁面
const page = params.get("page") || "visit";

console.log("Current Page:", page);