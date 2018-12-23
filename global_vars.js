const inv_objstore_name = 'invoice';
const chl_objstore_name = "challan";
const sttng_objstore_name = 'settings';
// in the object store the index of the settings of the invoice
const invoice_settings_objectstore_index = 0;
// in the object store the index of the settings of the challan
const challan_settings_objectstore_index = 0;
// these features will not be there if indexed DB is not supported in the browser
const feature_absif_indexeddb_abs = "Save data offline";