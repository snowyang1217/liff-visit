// =========================================
// router.js
// Snow LIFF CRM Template V1.0
// =========================================


// =========================================
// Router Start
// =========================================

console.log("🚀 Router Loaded");


// =========================================
// 取得目前頁面
// =========================================

const params = new URLSearchParams(window.location.search);

const page = params.get("page") || "visit";

console.log("Current Page:", page);


// =========================================
// Router
// =========================================

switch (page) {

    case "visit":

        renderVisitPage();

        break;


    case "stock":

        renderStockPage();

        break;


    case "tender":

        renderTenderPage();

        break;


    case "transfer":

        renderTransferPage();

        break;


    case "report":

        renderReportPage();

        break;


    default:

        render404Page();

}


// =========================================
// 預留功能
// =========================================

function renderStockPage() {

    document.getElementById("app").innerHTML = `
        <h2>📦 庫存查詢</h2>
        <p>V2 開放</p>
    `;

}


function renderTenderPage() {

    document.getElementById("app").innerHTML = `
        <h2>📑 標案管理</h2>
        <p>V2 開放</p>
    `;

}


function renderTransferPage() {

    document.getElementById("app").innerHTML = `
        <h2>🚚 庫存調撥</h2>
        <p>V2 開放</p>
    `;

}


function renderReportPage() {

    document.getElementById("app").innerHTML = `
        <h2>📈 業績統計</h2>
        <p>V2 開放</p>
    `;

}


function render404Page() {

    document.getElementById("app").innerHTML = `
        <h2>⚠️ 找不到頁面</h2>
    `;

}