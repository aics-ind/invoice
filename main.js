// this file will open data base and have functions related to its upgradations 

// inv is abbreviation of invoice
// chl is abbreviation of challan 

// first check if the the user's browser have indexed Db and which one.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// some global variable, ik they are bad but they will be rarely used
var db, settings = {};
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB." + feature_absif_indexeddb_abs + " feature will not be available.");
} else {
    // request to open the database.
    let req = indexedDB.open("AICS", db_version);
    req.onsuccess = function (e) {
        db = e.target.result;
        let tx = db.transaction("settings", 'readonly');
        let cur = tx.objectStore("settings").openCursor(), i = 0;
        cur.onsuccess = function (e) {
            if (e.target.result) {
                switch (i++) {
                    case invoice_settings_objectstore_index: settings.invoice = e.target.result.value; break;
                    case challan_settings_objectstore_index: settings.challan = e.target.result.value; break;
                };
                e.target.result.continue();
            };
        };
        cur.onerror = function (e) {
            console.log("from main.js: Saved Settings Couldn't be accessed.");
        }
        console.log("AICS database opened successfully");
    };
    req.onerror = function () {
        alert("Error opening the datatbase");
        console.log("Error opening AICS");
    };
    req.onupgradeneeded = function (event) {

        let def_sett = {
            'font-family': 'sans-serif',
            'font-size': '46px',
            'font-weight': 'normal',
            'font-style': 'normal',
            'font-variant': 'normal'
        };

        db = event.target.result;
        let store_invoice = db.createObjectStore('invoice', { keyPath: 'inv_no' }),
            //store_challan = db.createObjectStore('challan' {keyPath: 'chl_no'})
            store_settings = db.createObjectStore("settings", { autoIncrement: true });

        store_settings.put(settings.invoice, invoice_settings_objectstore_index); /// invoice_settings_objectstore_index index is 0
        store_invoice.createIndex('inv_no', 'inv_no', { unique: 'true' });
        store_invoice.createIndex('invoice_date', 'invoice_date');
        store_invoice.createIndex('place_of_supply', 'place_of_supply');
        store_invoice.createIndex('bt_name', 'bt_name');
        store_invoice.createIndex('bt_state', 'bt_state');
        store_invoice.createIndex('st_name', 'st_name');
        store_invoice.createIndex('st_state', 'st_state');
    };

}