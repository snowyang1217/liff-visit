// =========================================
// api.js
// Snow LIFF CRM Template
// =========================================

// 建立拜訪紀錄
async function createVisit(data) {

    console.log("送往 Make：");
    console.log(data);

    const response = await fetch(CONFIG.WEBHOOK.CREATE_VISIT, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    if (!response.ok) {

        throw new Error("Create Visit Failed");

    }

    return await response.text();

}


// 搜尋客戶（V1 先使用本機資料）
async function searchCustomerApi(keyword) {

    return searchCustomer(keyword);

}