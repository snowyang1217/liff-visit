// Router 初始化
console.log("Router Loaded");

// 取得網址參數
const params = new URLSearchParams(window.location.search);
const page = params.get("page") || "visit";

    console.log("Current Page:", page);

    // 依照 page 顯示不同畫面
    switch (page) {
    case "visit":
        console.log("準備呼叫 renderVisitPage()");
        renderVisitPage();
        console.log("renderVisitPage() 已執行");
        break;

    case "stock":
        console.log("載入：庫存查詢");
        break;

    case "tender":
        console.log("載入：標案管理");
        break;

    case "transfer":
        console.log("載入：庫存調撥");
        break;

    case "report":
        console.log("載入：業績統計");
        break;

    default:
        console.log("未知頁面");
    }