// =========================================
// app.js
// Snow LIFF CRM Template V1.0
// =========================================


// =========================================
// 全域變數
// =========================================

let lineProfile = null;


// =========================================
// LIFF 初始化
// =========================================

async function initializeLiff() {

    const isLocalhost =
        ["127.0.0.1", "localhost"].includes(window.location.hostname);

    try {

        await liff.init({
            liffId: CONFIG.LIFF_ID
        });

        console.log("✅ LIFF 初始化成功");

        // =========================
        // 本機測試模式
        // =========================

        if (isLocalhost) {

            handleLocalhost();
            return;

        }

        // =========================
        // 尚未登入 LINE
        // =========================

        if (!liff.isLoggedIn()) {

            console.log("➡️ 導向 LINE Login...");

            liff.login({
                redirectUri: window.location.href
            });

            return;

        }

        // =========================
        // 已登入，取得 Profile
        // =========================

        await loadProfile();

    } catch (error) {

        console.error("❌ LIFF 初始化失敗", error);

        setSalesName("無法取得 LINE 名稱");

    }

}


// =========================================
// Localhost 模式
// =========================================

function handleLocalhost() {

    console.log("💻 Localhost 測試模式");

    lineProfile = {

        userId: "LOCAL_TEST",

        displayName: "本機測試"

    };

    setSalesName(lineProfile.displayName);

}


// =========================================
// 取得 LINE 使用者資料
// =========================================

async function loadProfile() {

    try {

        lineProfile = await liff.getProfile();

        console.log("👤 LINE User");

        console.log(lineProfile);

        setSalesName(lineProfile.displayName);

    } catch (error) {

        console.error("取得 Profile 失敗", error);

        setSalesName("未知使用者");

    }

}


// =========================================
// 更新畫面上的業務名稱
// =========================================

function setSalesName(name) {

    if (typeof updateSalesName === "function") {

        updateSalesName(name);

    }

}


// =========================================
// 取得 LINE Profile
// =========================================

function getLineProfile() {

    return lineProfile;

}


// =========================================
// 取得 User ID
// =========================================

function getUserId() {

    if (!lineProfile) {

        return "";

    }

    return lineProfile.userId;

}


// =========================================
// 取得使用者名稱
// =========================================

function getDisplayName() {

    if (!lineProfile) {

        return "";

    }

    return lineProfile.displayName;

}


// =========================================
// 是否登入
// =========================================

function isLineLogin() {

    if (["127.0.0.1", "localhost"].includes(window.location.hostname)) {

        return true;

    }

    return liff.isLoggedIn();

}


// =========================================
// 登出
// =========================================

function logout() {

    if (!["127.0.0.1", "localhost"].includes(window.location.hostname)) {

        liff.logout();

        location.reload();

    }

}


// =========================================
// 啟動 LIFF
// =========================================

initializeLiff();