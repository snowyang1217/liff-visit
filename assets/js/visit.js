function renderVisitPage() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="padding:20px;">
            <h1>📝 新增拜訪紀錄</h1>

            <p>CRM V2 已成功載入！</p>

            <button id="submitButton">
                送出
            </button>
        </div>
    `;
}