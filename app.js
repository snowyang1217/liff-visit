let lineProfile = null;

async function initializeLiff() {
  try {
    await liff.init({
      liffId: CONFIG.LIFF_ID
    });

    console.log("LIFF 初始化成功");

    if (!liff.isLoggedIn()) {
      console.log("目前尚未登入 LINE");

      // 本機測試時先不要自動登入，避免 localhost 導向問題
      return;
    }

    lineProfile = await liff.getProfile();

    console.log("LINE 使用者：", lineProfile.displayName);
  } catch (error) {
    console.error("LIFF 初始化失敗：", error);
  }
}

async function submitVisit() {
  const submitButton = document.getElementById("submitButton");

  try {
    submitButton.disabled = true;
    submitButton.textContent = "送出中...";

    const data = {
      userId: lineProfile?.userId ?? "",
      businessName: lineProfile?.displayName ?? "本機測試",
      customer: "測試客戶",
      content: "第一筆 LIFF 測試資料",
      datetime: new Date().toISOString()
    };

    const response = await fetch(CONFIG.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Webhook 回傳錯誤：${response.status}`);
    }

    alert("資料已成功送到 Make");
  } catch (error) {
    console.error(error);
    alert("送出失敗，請查看瀏覽器 Console");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "送出";
  }
}

document
  .getElementById("submitButton")
  .addEventListener("click", submitVisit);

initializeLiff();