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
    const salesName = window.AppState?.getSalesName() || "";

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
              ${field(
                "油錢",
                `<input type="number"
                        name="fuel"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        placeholder="0">`
              )}

              ${field(
                "停車費",
                `<input type="number"
                        name="parking"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        placeholder="0">`
              )}

              ${field(
                "交際費",
                `<input type="number"
                        name="entertainment"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        placeholder="0">`
              )}

              ${field(
                "雜支",
                `<input type="number"
                        name="misc"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        placeholder="0">`
              )}

              ${field(
                "eTag",
                `<input type="number"
                        name="etag"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        placeholder="0">`
              )}
            </div>
          </section>

          <div id="formMessage"
               class="message"
               role="status"
               hidden></div>

          <button id="submitButton"
                  class="primary-button"
                  type="submit">
            送出拜訪紀錄
          </button>

        </form>
      </main>
    `;

    document
      .getElementById("visitForm")
      .addEventListener("submit", submitVisit);
  }

  async function submitVisit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const button = document.getElementById("submitButton");
    const webhookUrl = config.WEBHOOK?.CREATE_VISIT;

    hideMessage();

    if (!isConfigured(webhookUrl)) {
      showMessage(
        "請先在 config.js 設定 Make Webhook。",
        "error"
      );
      return;
    }

    const payload = Object.fromEntries(
      new FormData(form).entries()
    );

    payload.lineUserId =
      window.AppState?.profile?.userId || "";

    payload.lineDisplayName =
      window.AppState?.profile?.displayName || "";

    payload.source = "LINE_LIFF";
    payload.submittedAt = new Date().toISOString();

    showLoading(button, "送出中…");

    try {
      const result = await fetchJson(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (result && result.success === false) {
        throw new Error(result.message || "Make 回傳失敗");
      }

      showMessage(
        "拜訪紀錄已成功送出。",
        "success"
      );

      form.reset();

      form.elements.visitAt.value =
        localDateTime();

      form.elements.salesName.value =
        window.AppState?.getSalesName() || "";

    } catch (error) {
      console.error("送出失敗：", error);

      showMessage(
        "送出失敗，請確認 Make Webhook 設定。",
        "error"
      );
    } finally {
      hideLoading(button);
    }
  }

  window.VisitPage = {
    render
  };
})();