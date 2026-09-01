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
  } = window.AppUtils || {};

  function field(label, control, required = false) {
    return `
      <label class="field">
        <span>
          ${label}${required ? '<b aria-hidden="true">*</b>' : ""}
        </span>
        ${control}
      </label>
    `;
  }

  function getSalesName() {
    return (
      window.APP_STATE?.salesName ||
      window.APP_STATE?.displayName ||
      window.LINE_USER?.displayName ||
      config.SALES_NAME ||
      ""
    );
  }

  function render() {
    const app = document.getElementById("app");

    if (!app) {
      return;
    }

    const salesName = getSalesName();

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
                `
                  <input
                    name="salesName"
                    value="${escapeHtml(salesName)}"
                    required
                  >
                `,
                true
              )}

              ${field(
                "拜訪日期與時間",
                `
                  <input
                    type="datetime-local"
                    name="visitAt"
                    value="${localDateTime()}"
                    required
                  >
                `,
                true
              )}

              ${field(
                "醫院",
                `
                  <input
                    name="hospital"
                    placeholder="請輸入醫院名稱"
                    required
                  >
                `,
                true
              )}

              ${field(
                "科別",
                `
                  <input
                    name="department"
                    placeholder="例如：骨科、神經外科"
                    required
                  >
                `,
                true
              )}

              ${field(
                "客戶名字",
                `
                  <input
                    name="customerName"
                    placeholder="請輸入客戶姓名"
                    required
                  >
                `,
                true
              )}

              ${field(
                "事由",
                `
                  <textarea
                    name="reason"
                    rows="4"
                    placeholder="請輸入本次拜訪事由"
                    required
                  ></textarea>
                `,
                true
              )}
            </div>
          </section>

          <section class="card">
            <h2>聯絡資料</h2>

            <div class="form-grid">
              ${field(
                "聯絡人",
                `
                  <input
                    name="contact"
                    placeholder="例如：王主任"
                  >
                `
              )}

              ${field(
                "聯絡電話",
                `
                  <input
                    name="phone"
                    type="tel"
                    placeholder="例如：03-1234567"
                  >
                `
              )}
            </div>
          </section>

          <section class="card">
            <h2>拜訪內容</h2>

            <div class="form-grid">
              ${field(
                "拜訪類型",
                `
                  <select name="visitType" required>
                    <option value="">請選擇</option>
                    <option value="例行拜訪">例行拜訪</option>
                    <option value="新客拜訪">新客拜訪</option>
                    <option value="產品介紹">產品介紹</option>
                    <option value="售後服務">售後服務</option>
                    <option value="標案拜訪">標案拜訪</option>
                    <option value="其他">其他</option>
                  </select>
                `,
                true
              )}

              ${field(
                "產品類別",
                `
                  <select name="productCategory">
                    <option value="">請選擇</option>
                    <option value="醫療設備">醫療設備</option>
                    <option value="醫療耗材">醫療耗材</option>
                    <option value="維修保養">維修保養</option>
                    <option value="其他">其他</option>
                  </select>
                `
              )}
            </div>

            ${field(
              "拜訪主旨",
              `
                <input
                  name="subject"
                  placeholder="例如：血糖機產品介紹"
                  required
                >
              `,
              true
            )}

            ${field(
              "拜訪內容",
              `
                <textarea
                  name="content"
                  rows="5"
                  placeholder="請記錄本次拜訪重點"
                  required
                ></textarea>
              `,
              true
            )}

            ${field(
              "客戶需求",
              `
                <textarea
                  name="customerNeed"
                  rows="3"
                  placeholder="請記錄客戶提出的需求"
                ></textarea>
              `
            )}

            ${field(
              "拜訪結果",
              `
                <select name="result" required>
                  <option value="">請選擇</option>
                  <option value="已成交">已成交</option>
                  <option value="報價中">報價中</option>
                  <option value="待追蹤">待追蹤</option>
                  <option value="無需求">無需求</option>
                  <option value="拜訪完成">拜訪完成</option>
                </select>
              `,
              true
            )}

            ${field(
              "下次追蹤日期",
              `
                <input
                  name="nextFollowDate"
                  type="date"
                >
              `
            )}
          </section>

          <section class="card">
            <h2>費用（選填）</h2>

            <div class="form-grid">
              ${field(
                "油錢",
                `
                  <input
                    name="fuelCost"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                  `
              )}

              ${field(
                "停車費",
                `
                  <input
                    name="parkingCost"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                  `
              )}

              ${field(
                "交際費",
                `
                  <input
                    name="entertainmentCost"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                  `
              )}

              ${field(
                "雜支",
                `
                  <input
                    name="miscCost"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                  `
              )}

              ${field(
                "eTag",
                `
                  <input
                    name="eTag"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                  `
              )}
            </div>
          </section>

          <section class="card">
            <button
              type="button"
              class="secondary-button"
              disabled
            >
              📷 拍照
            </button>

            <button
              type="button"
              class="secondary-button"
              disabled
            >
              📍 取得定位
            </button>

            <p class="feature-note">
              拍照與定位功能將在下一階段開放。
            </p>

            <div id="formMessage" class="message" hidden></div>

            <button
              id="submitButton"
              type="submit"
              class="submit-button"
            >
              送出拜訪紀錄
            </button>
          </section>
        </form>
      </main>
    `;

    const form = document.getElementById("visitForm");

    if (form) {
      form.addEventListener("submit", submitVisit);
    }
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

      const payload = {
        salesName: data.salesName || "",
        visitAt: data.visitAt || "",
        hospital: data.hospital || "",
        department: data.department || "",
        customerName: data.customerName || "",
        reason: data.reason || "",
        contact: data.contact || "",
        phone: data.phone || "",
        visitType: data.visitType || "",
        productCategory: data.productCategory || "",
        subject: data.subject || "",
        content: data.content || "",
        customerNeed: data.customerNeed || "",
        result: data.result || "",
        nextFollowDate: data.nextFollowDate || "",
        fuelCost: Number(data.fuelCost || 0),
        parkingCost: Number(data.parkingCost || 0),
        entertainmentCost: Number(data.entertainmentCost || 0),
        miscCost: Number(data.miscCost || 0),
        eTag: Number(data.eTag || 0),
        lineUserId: window.APP_STATE?.userId || "",
        submittedAt: new Date().toISOString()
      };

      await fetchJson(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      showMessage("拜訪紀錄已成功送出。", "success");

      form.reset();

      const visitAtInput = form.elements.namedItem("visitAt");

      if (visitAtInput) {
        visitAtInput.value = localDateTime();
      }

      const salesInput = form.elements.namedItem("salesName");

      if (salesInput) {
        salesInput.value = getSalesName();
      }
    } catch (error) {
      console.error("送出拜訪紀錄失敗：", error);
      showMessage(
        `送出失敗：${error.message || "請稍後再試"}`,
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
