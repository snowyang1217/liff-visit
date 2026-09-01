(function () {
  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function isConfigured(value) {
    return Boolean(value && !String(value).startsWith("請貼上"));
  }

  function localDateTime() {
    const now = new Date();
    const shifted = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    );

    return shifted.toISOString().slice(0, 16);
  }

  function showMessage(text, type = "") {
    const message = document.getElementById("formMessage");
    if (!message) return;

    message.textContent = text;
    message.className = `message ${type}`.trim();
    message.hidden = false;
  }

  function hideMessage() {
    const message = document.getElementById("formMessage");
    if (!message) return;

    message.hidden = true;
    message.textContent = "";
    message.className = "message";
  }

  function showLoading(button, text = "處理中…") {
    if (!button) return;

    button.dataset.originalText = button.textContent;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.textContent = text;
  }

  function hideLoading(button) {
    if (!button) return;

    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.textContent =
      button.dataset.originalText || "送出拜訪紀錄";

    delete button.dataset.originalText;
  }

  async function fetchJson(url, options = {}) {
    const config = window.APP_CONFIG || {};
    const controller = new AbortController();

    const timeout = window.setTimeout(
      () => controller.abort(),
      config.REQUEST_TIMEOUT_MS || 15000
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

     const text = await response.text();

    if (!text) {
  return {};
    }   

    try {
      return JSON.parse(text);
    } catch {
      return {
       message: text
      };
    }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  window.AppUtils = Object.freeze({
    escapeHtml,
    isConfigured,
    localDateTime,
    showMessage,
    hideMessage,
    showLoading,
    hideLoading,
    fetchJson
  });
})();