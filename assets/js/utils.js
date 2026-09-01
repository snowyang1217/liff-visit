// =========================================
// utils.js
// Snow LIFF CRM Template V1.0
// =========================================


// Toast 訊息
function showMessage(message) {

    alert(message);

}


// 顯示 Loading
function showLoading(button, text = "處理中...") {

    if (!button) return;

    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = text;

}


// 關閉 Loading
function hideLoading(button) {

    if (!button) return;

    button.disabled = false;

    if (button.dataset.originalText) {

        button.textContent =
            button.dataset.originalText;

    }

}


// 清空表單
function resetForm(form) {

    if (!form) return;

    form.reset();

}


// 今天日期
function today() {

    return new Date().toISOString().slice(0, 10);

}


// 現在時間
function nowTime() {

    return new Date().toTimeString().slice(0, 5);

}