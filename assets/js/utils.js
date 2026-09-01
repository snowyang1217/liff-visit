function getLocalDateTime() {
    const now = new Date();

    return {
        date: new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Taipei",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(now),
        time: new Intl.DateTimeFormat("zh-TW", {
            timeZone: "Asia/Taipei",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(now)
    };
}

function showMessage(message, type = "success") {
    const messageElement = document.getElementById("formMessage");

    if (!messageElement) {
        return;
    }

    const isError = type === "error";

    messageElement.textContent = message;
    messageElement.hidden = false;
    messageElement.style.margin = "16px 0";
    messageElement.style.padding = "12px 14px";
    messageElement.style.borderRadius = "10px";
    messageElement.style.lineHeight = "1.5";
    messageElement.style.backgroundColor = isError ? "#ffebee" : "#e8f5e9";
    messageElement.style.color = isError ? "#c62828" : "#197447";
    messageElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function hideMessage() {
    const messageElement = document.getElementById("formMessage");

    if (messageElement) {
        messageElement.hidden = true;
        messageElement.textContent = "";
    }
}

function showLoading(button, text = "送出中…") {
    if (!button) {
        return;
    }

    button.dataset.originalText = button.textContent.trim();
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.textContent = text;
}

function hideLoading(button) {
    if (!button) {
        return;
    }

    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.textContent = button.dataset.originalText || "送出拜訪紀錄";
    delete button.dataset.originalText;
}

async function postJson(url, payload, timeoutMs = 15000) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const responseText = await response.text();

        try {
            return responseText ? JSON.parse(responseText) : {};
        } catch {
            return {
                message: responseText
            };
        }
    } finally {
        window.clearTimeout(timeoutId);
    }
}
