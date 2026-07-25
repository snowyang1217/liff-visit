let lineProfile = null;

/**
 * 初始化 LINE LIFF 並取得使用者資料
 */
async function initializeLiff() {
    const isLocalhost =
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost";

    try {
        await liff.init({
            liffId: CONFIG.LIFF_ID
        });

        console.log("LIFF 初始化成功");

        // 本機測試不強制登入 LINE
        if (isLocalhost) {
            console.log("目前為本機測試");

            if (typeof updateSalesName === "function") {
                updateSalesName("本機測試");
            }

            return;
        }

        // 正式網址若尚未登入，就導向 LINE 登入
        if (!liff.isLoggedIn()) {
            console.log("目前尚未登入 LINE");

            liff.login({
                redirectUri: window.location.href
            });

            return;
        }

        lineProfile = await liff.getProfile();

        console.log("LINE 使用者：", lineProfile.displayName);

        if (typeof updateSalesName === "function") {
            updateSalesName(lineProfile.displayName);
        }
    } catch (error) {
        console.error("LIFF 初始化失敗：", error);

        if (typeof updateSalesName === "function") {
            updateSalesName("無法取得 LINE 名稱");
        }
    }
}