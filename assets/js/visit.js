(function () {
  const config = window.APP_CONFIG || {};
  const utils = window.AppUtils || {};

  const {
    escapeHtml,
    isConfigured,
    localDateTime,
    showMessage,
    hideMessage,
    showLoading,
    hideLoading,
    fetchJson
  } = utils;

  function render() {
    const app = document.getElementById("app");
    const salesName = window.APP_STATE?.salesName || "";

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
              <div class="form-group">
                <label>業務人員</label>
                <input
                  name="salesName"
                  value="${escapeHtml(salesName)}"
                  required
                >
              </div>

              <div class="form-group">
                <label>拜訪日期與時間</label>
                <input
                  type="datetime-local"
                  name="visitAt"
                  value="${localDateTime()}"
                  required
                >
              </div>

              <div class="form-group">
                <label>醫院</label>
                <input
                  name="hospital"
                  placeholder="請輸入醫院名稱"
                  required
                >
              </div>

              <div class="form-group">
                <label>科別</label>
                <input
                  name="department"
                  placeholder="例如：骨科、神經外科"
                  required
                >
              </div>

              <div class="form-group">
                <label>客戶名字</label>
                <input
                  name="customerName"
                  placeholder="請輸入客戶姓名"
                  required
                >
              </div>

              <div class="form-group">
                <label>事由</label>
                <textarea
                  name="reason"
                  rows="4"
                  placeholder="請輸入本次拜訪事由"
                  required
                ></textarea>
              </div>
            </div>
          </section>

          <section class="card">
            <h2>聯絡資料</h2>

            <div class="form-grid">
              <div class="form-group">
                <label>聯絡人</label>
                <input
                  name="contact"
                  placeholder="例如：王主任"
                >
              </div>

              <div class="form-group">
                <label>聯絡電話</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="例如：03-1234567"
                >
              </div>
            </div>
          </section>

          <section class="card" id="visitContentCard">
            <h2>拜訪內容</h2>

            <div class="form-group">
              <label>拜訪類型</label>
              <select name="visitType" required>
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
              <label>產品類別</label>
              <select name="productCategory">
                <option value="">請選擇</option>
                <option value="醫療設備">醫療設備</option>
                <option value="醫療耗材">醫療耗材</option>
                <option value="維修保養">維修保養</option>
                <option value="其他">其他</option>
              </select>
            </div>

            <div class="form-group">
              <label>拜訪主旨</label>
              <input
                name="subject"
                placeholder="例如：血糖機產品介紹"
                required
              >
            </div>

            <div class="form-group">
              <label>拜訪內容</label>
              <textarea
                name="content"
                rows="5"
                placeholder="請記錄本次拜訪重點"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label>客戶需求</label>
              <textarea
                name="customerNeed"
                rows="3"
                placeholder="請記錄客戶提出的需求"
              ></textarea>
            </div>

            <div class="form-group">
              <label>拜訪結果</label>
              <select name="result" required>
                <option value="">請選擇</option>
                <option value="已成交">已成交</option>
                <option value="報價中">報價中</option>
                <option value="待追蹤">待追蹤</option>
                <option value="無需求">無需求</option>
                <option value="拜訪完成">拜訪完成</option>
              </select>
            </div>

            <div class="form-group">
              <label>下次追蹤日期</label>
              <input
                name="nextFollowDate"
                type="date"
              >
            </div>
          </section>

          <section class="card">
            <h2>費用（選填）</h2>

            <div class="form-grid">
              <div class="form-group">
                <label>油錢</label>
                <input name="fuelCost" type="number" min="0">
              </div>

              <div class="form-group">
                <label>停車費</label>
                <input name="parkingCost" type="number" min="0">
              </div>

              <div class="form-group">
                <label>交際費</label>
                <input name="entertainmentCost" type="number" min="0">
              </div>

              <div class="form-group">
                <label>雜支</label>
                <input name="miscCost" type="number" min="0">
              </div>

              <div class="form-group">
                <label>eTag</label>
                <input name="eTag" type="number" min="0">
              </div>
            </div>
          </section>

          <div id="formMessage" class="message" hidden></div>

          <button id="submitButton" type="submit" class="submit-button">
            送出拜訪紀錄
          </button>
        </form>
      </main>
    `;

    const hiddenFields = [
      "visitType",
      "productCategory",
      "subject",
      "content",
      "customerNeed",
      "result",
      "nextFollowDate"
    ];

    hiddenFields.forEach((name) => {
      const input = document.querySelector(`[name="${name}"]`);
      if (!input) return;

      const box = input.closest(".form-group");
      if (box) box.hidden = true;

      input.disabled = true;
      input.required = false;
    });

    document
      .getElementById("visitForm")
      .addEventListener("submit", submitVisit);
  }

  async function submitVisit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const button = document.getElementById("submitButton");

    hideMessage();
    showLoading(button, "送出中…");

    try {
      const webhookUrl = config.WEBHOOK?.CREATE_VISIT;

      if (!isConfigured(webhookUrl)) {
        throw new Error("尚未設定 Make Webhook URL");
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      await fetchJson(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          fuelCost: Number(data.fuelCost || 0),
          parkingCost: Number(data.parkingCost || 0),
          entertainmentCost: Number(data.entertainmentCost || 0),
          miscCost: Number(data.miscCost || 0),
          eTag: Number(data.eTag || 0),
          submittedAt: new Date().toISOString()
        })
      });

      showMessage("拜訪紀錄已成功送出。", "success");
      form.reset();

      form.elements.visitAt.value = localDateTime();
      form.elements.salesName.value =
        window.APP_STATE?.salesName || "";
    } catch (error) {
      showMessage(`送出失敗：${error.message}`, "error");
    } finally {
      hideLoading(button);
    }
  }

  window.VisitPage = {
    render
  };
})();