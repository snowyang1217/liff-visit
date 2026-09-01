(function () {
  const config = window.APP_CONFIG || {};
  const {
    escapeHtml,
    isConfigured,
    localDateTime,
    showMessage,
    hideMessage,
    showLoading,
    hideLoading,
    fetchJson
  } = window.AppUtils;

  function field(label, control, required = false) {
    return `
      <label class="field">
        <span>${label}${required ? '<b aria-hidden="true">*</b>' : ""}</span>
        ${control}
      </label>
    `;
  }

  function render() {
    const app = document.getElementById("app");

    const now = new Date();
    const visitDate = now.toISOString().slice(0, 10);
    const visitTime = now.toTimeString().slice(0, 5);

    app.innerHTML = `
      <main class="visit-page">
        <header class="app-header">
          <div>
            <p class="app-brand">捷旭醫療</p>
            <h1>業務拜訪紀錄</h1>
          </div>
          <span class="sales-badge">
            ${escapeHtml(salesName || "尚未取得")}
          </span>
        </header>

        <form id="visitForm" class="visit-form">

          <section class="card">
            <h2>拜訪資料</h2>

            <div class="form-grid">
              ${field(
                "業務人員",
                `<input name="salesName"
                        value="${escapeHtml(salesName)}"
                        required>`,
                true
              )}

              ${field(
                "拜訪日期與時間",
                `<input type="datetime-local"
                        name="visitAt"
                        value="${localDateTime()}"
                        required>`,
                true
              )}

              ${field(
                "醫院",
                `<input name="hospital"
                        placeholder="請輸入醫院名稱"
                        required>`,
                true
              )}

              ${field(
                "科別",
                `<input name="department"
                        placeholder="例如：骨科、神經外科"
                        required>`,
                true
              )}

              ${field(
                "客戶名字",
                `<input name="customerName"
                        placeholder="請輸入客戶姓名"
                        required>`,
                true
              )}

              ${field(
                "事由",
                `<textarea name="reason"
                           rows="4"
                           placeholder="請輸入本次拜訪事由"
                           required></textarea>`,
                true
              )}
            </div>
          </section>

          <section class="card">
            <h2>費用（選填）</h2>

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

    document
      .getElementById("visitForm")
      .addEventListener("submit", submitVisit);
  }

    initializeLiff();
})();