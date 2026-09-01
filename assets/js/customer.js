// =========================================
// customer.js
// Snow LIFF CRM Template V1.0
// =========================================


// =========================================
// 模擬 Odoo 客戶資料
// （之後改成 Make API 回傳即可）
// =========================================

const DEMO_CUSTOMERS = [

    {
        id: 1,
        name: "竹北東元醫院",
        contact: "王主任",
        phone: "03-5512345"
    },

    {
        id: 2,
        name: "竹東榮總",
        contact: "李醫師",
        phone: "03-5961234"
    },

    {
        id: 3,
        name: "竹南診所",
        contact: "陳小姐",
        phone: "037-123456"
    },

    {
        id: 4,
        name: "台大新竹分院",
        contact: "林主任",
        phone: "03-5326151"
    }

];


// =========================================
// 搜尋客戶
// =========================================

function searchCustomer(keyword) {

    keyword = keyword.trim();

    if (keyword === "") {
        return [];
    }

    return DEMO_CUSTOMERS.filter(customer => {

        return (
            customer.name.includes(keyword) ||
            customer.contact.includes(keyword) ||
            customer.phone.includes(keyword)
        );

    });

}


// =========================================
// 依 ID 取得客戶
// =========================================

function getCustomerById(id) {

    return DEMO_CUSTOMERS.find(customer => {

        return customer.id === id;

    });

}


// =========================================
// 取得全部客戶
// =========================================

function getAllCustomers() {

    return DEMO_CUSTOMERS;

}


// =========================================
// 之後改成 Make API
// =========================================

async function searchCustomerOnline(keyword) {

    console.log("搜尋 Odoo：", keyword);

    // V1 暫時仍使用本機資料

    return searchCustomer(keyword);

}