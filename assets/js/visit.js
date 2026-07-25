function updateSalesName(name) {
    const salesNameElement = document.getElementById("salesName");

    if (salesNameElement) {
        salesNameElement.textContent = name || "尚未取得";
    }
}

function renderVisitPage() {
    const app = document.getElementById("app");

    const now = new Date();
    const visitDate = now.toISOString().slice(0, 10);
    const visitTime = now.toTimeString().slice(0, 5);

    app.innerHTML = `
        <main class="visit-page">
            <header class="app-header">
                <div>
                    <p class="app-brand">捷旭醫療 AI CRM</p>
                    <h1>新增拜訪紀錄</h1>
                </div>
                <div class="header-icon">📝</div>
            </header>

            <section class="info-card">
                <div class="info-item">
                    <span>業務人員</span>
                    <strong id="salesName">
                        讀取 LINE 使用者中…
                        </strong>
                </div>

                <div class="info-row">
                    <div class="info-item">
                        <span>拜訪日期</span>
                        <strong>${visitDate}</strong>
                    </div>

                    <div class="info-item">
                        <span>拜訪時間</span>
                        <strong>${visitTime}</strong>
                    </div>
                </div>
            </section>

            <form id="visitForm" class="form-card">
                <div class="form-group">
                    <label for="customer">客戶名稱 <b>*</b></label>
                    <input
                        id="customer"
                        name="customer"
                        type="text"
                        placeholder="請輸入或搜尋客戶名稱"
                        required
                    >
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="contact">聯絡人</label>
                        <input
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder="例如：王主任"
                        >
                    </div>

                    <div class="form-group">
                        <label for="phone">聯絡電話</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="例如：03-1234567"
                        >
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="visitType">拜訪類型 <b>*</b></label>
                        <select id="visitType" name="visitType" required>
                            <option value="">請選擇</option>
                            <option value="例行拜訪">例行拜訪</option>
                            <option value="新客拜訪">新客拜訪</option>
                            <option value="產品介紹">產品介紹</option>
                            <option value="售後服務">售後服務</option>
                            <option value="標案拜訪">標案拜訪</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="productCategory">產品類別</label>
                        <select id="productCategory" name="productCategory">
                            <option value="">請選擇</option>
                            <option value="醫療設備">醫療設備</option>
                            <option value="醫療耗材">醫療耗材</option>
                            <option value="維修保養">維修保養</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="subject">拜訪主旨 <b>*</b></label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="例如：血糖機產品介紹"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="content">拜訪內容 <b>*</b></label>
                    <textarea
                        id="content"
                        name="content"
                        rows="5"
                        placeholder="請記錄本次拜訪重點"
                        required
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="customerNeed">客戶需求</label>
                    <textarea
                        id="customerNeed"
                        name="customerNeed"
                        rows="3"
                        placeholder="請記錄客戶提出的需求"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="result">拜訪結果 <b>*</b></label>
                    <select id="result" name="result" required>
                        <option value="">請選擇</option>
                        <option value="已成交">已成交</option>
                        <option value="報價中">報價中</option>
                        <option value="待追蹤">待追蹤</option>
                        <option value="無需求">無需求</option>
                        <option value="拜訪完成">拜訪完成</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="nextFollowDate">下次追蹤日期</label>
                    <input
                        id="nextFollowDate"
                        name="nextFollowDate"
                        type="date"
                    >
                </div>

                <div class="action-grid">
                    <button type="button" class="secondary-button" disabled>
                        📷 拍照
                    </button>

                    <button type="button" class="secondary-button" disabled>
                        📍 取得定位
                    </button>
                </div>

                <p class="feature-note">
                    拍照與定位功能將在下一階段開放。
                </p>

                <button id="submitButton" type="submit" class="submit-button">
                    送出拜訪紀錄
                </button>
            </form>
        </main>
    `;

    const visitForm = document.getElementById("visitForm");

    visitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("表單畫面測試成功，下一步再串接 Make。");
    });

    initializeLiff();
}