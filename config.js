const CONFIG = {

    // =========================
    // LIFF
    // =========================
    LIFF_ID: "2010246946-BKtkjkvh",

    // =========================
    // Make Webhook
    // =========================
    WEBHOOK: {

        // 建立拜訪紀錄
        CREATE_VISIT:
            "https://hook.us2.make.com/7dw8gtigjf0oh3oau1quwr7j928yso5s",

        // 客戶搜尋（之後建立第二個 Make Scenario 再填入）
        SEARCH_CUSTOMER: ""

    },

    // =========================
    // 功能開關
    // =========================
    FEATURE: {

        GPS: false,

        CAMERA: false,

        INVENTORY: false,

        DEBUG: true

    }

};

window.APP_CONFIG = CONFIG;