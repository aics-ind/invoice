var invoice = {
	strict: true,
	file_from_data: false,
	data: {},
	_onload: function () {
		document.querySelector('.acc_no').value = '507801010036044';
		document.querySelector('.ifsc').value = 'UBIN0550787';
		document.querySelector('.bank_name').value = 'Union Bank Of India';

		let ele_to_beChecked = _(".inv_no, .invoice_date, .bt_name, .place_of_supply, .bt_state, .st_state, .st_name, .qty, .rate, .item_desc");
		for (let i = 0; i < ele_to_beChecked.length; i++) {
			ele_to_beChecked[i].onblur = function () {
				if (!this.value) {
					this.style.border = '1px solid crimson';
				} else {
					this.style.border = '1px solid black';
				}
			};
		};
	},

	change_settings: () => {
		var f = invoice.db.transaction("settings", 'readwrite').objectStore('settings');
		f.get(0).onsuccess = e => {
			var val = e.target.result;
			var inputs = _(".body_warper>input"),
				sel = _(".body_warper>select")[0].value || 'normal';
			var ob = {};
			ob['font-family'] = inputs[0].value || val['font-family'];
			ob['font-size'] = inputs[1].value || val['font-size'];
			switch (sel) {
				case 'normal':
					ob['font-style'] = ob['font-variant'] = ob['font-weight'] = 'normal';
					break;
				case 'italic':
					ob['font-style'] = 'oblique';
					ob['font-variant'] = ob['font-weight'] = 'normal';
					break;
				case 'bold':
					ob['font-style'] = ob['font-variant'] = 'normal';
					ob['font-weight'] = 'bold';
					break;
				case 'small-caps':
					ob['font-style'] = ob['font-weight'] = 'normal';
					ob['font-variant'] = 'small-caps';
					break;
				case 'bi':
					ob['font-style'] = 'oblique';
					ob['font-variant'] = 'normal';
					ob['font-weight'] = 'bold';
					break;
				case 'bs':
					ob['font-style'] = 'normal';
					ob['font-variant'] = 'small-caps';
					ob['font-weight'] = 'bold';
					break;
				case 'is':
					ob['font-style'] = 'oblique';
					ob['font-variant'] = 'small-caps';
					ob['font-weight'] = 'normal';
					break;
				case 'bis':
					ob['font-style'] = 'oblique';
					ob['font-variant'] = 'small-caps';
					ob['font-weight'] = 'bold';
					break;
			};// end of the switch statement

			f.put(ob, 0).onsuccess = function () {
				console.log('settings stored successfully');
				invoice.writing_options_defaults = ob;
				document.getElementById('id01').style.display = 'none';
			}

		}; // end of the get function
	},

	make_invoice: (func = function () { }) => {
		var img = new Image(); // lupizyme
		img.onload = function () {
			var ca = document.createElement("canvas"),
				ctx = ca.getContext("2d");
			ca.setAttribute("width", BFMT_resource_global.invoice.width);
			ca.setAttribute("height", BFMT_resource_global.invoice.height);
			ctx.drawImage(this, 0, 0, BFMT_resource_global.invoice.width, BFMT_resource_global.invoice.height);
			invoice.canvas = ca;
			invoice.ctx = ctx;
			if (invoice.write()) func();
			else alert("Error while making invoice");
		};
		img.src = BFMT_resource_global.invoice.data;
	},
	reserved_area: [
		[1320, 369, 440, 55, "po_nu"],
		[1319, 438, 437, 59, "po_date"],
		[1320, 512, 436, 53, "vender_code"],
		[425, 579, 883, 49, "reserve_charge"],
		[426, 640, 879, 46, "inv_no"], 			 /***/
		[424, 699, 880, 45, "invoice_date"],     /***/
		[424, 755, 348, 54, "main_state"],
		[1027, 766, 108, 43, "main_state_code"],
		[1687, 576, 739, 52, "trans_mode"],
		[1687, 638, 738, 51, "vehicle_no"],
		[1687, 700, 737, 44, "date_of_supply"],
		[1687, 759, 734, 47, "place_of_supply"], /***/
		[234, 904, 1074, 47, "bt_name"], 		 /***/
		[233, 963, 1073, 49, "bt_addr"],
		[236, 1029, 1071, 50, "bt_gstin"],
		[234, 1092, 535, 46, "bt_state"],        /***/
		[1022, 1084, 119, 50, "bt_state_code"],
		[1500, 907, 925, 45, "st_name"], 		/***/
		[1501, 966, 924, 46, "st_addr"],
		[1501, 1028, 920, 51, "st_gstin"],
		[1498, 1092, 470, 42, "st_state"], 		/***/
		[2231, 1083, 106, 48, "st_state_code"],
		[144, 1262, 946, 911, "item_desc"],
		[1103, 1344, 249, 57, "hsnacs"],
		[1366, 1344, 213, 46, "uom"],
		[1594, 1345, 179, 55, "qty"],
		[1785, 1344, 267, 77, "rate"],
		[2066, 1343, 355, 82, "amount"],
		[2015, 2326, 407, 64, "less_discount"],
		[2017, 2409, 407, 72, "freight"],
		[2015, 2499, 409, 74, "taxable_value"],
		[1857, 2598, 134, 48, "cgst_rate"],
		[1852, 2692, 134, 41, "sgst_rate"],
		[1843, 2783, 147, 48, "igst_rate"],
		[2019, 2862, 403, 67, "tamt_gst"],
		[2015, 2951, 406, 67, "tamt_with_tax"],
		[2017, 3043, 408, 67, "gst_rc"],
		[2017, 2587, 405, 73, "cgst_amt"],
		[2015, 2680, 406, 70, "sgst_amt"],
		[2017, 2772, 406, 69, "igst_amt"],
		[1909, 3148, 502, 47, "acc_no"],
		[1912, 3225, 506, 45, "ifsc"],
		[1811, 3303, 603, 43, "bank_name"],
		[521, 3111, 544, 274, "auth_sig"],
		[983, 2512, 562, 406, "common_seal"],
		[64, 2585, 903, 393, "tnc"],
		[71, 2373, 1476, 115, "tamt_in_word"],
		[2072, 2195, 351, 78, "tt"]
	],

	find: (str) => {
		for (let i = 0; i < invoice.reserved_area.length; i++) {
			if (str === invoice.reserved_area[i][4]) return invoice.reserved_area[i];
		};
	},
	write_in_Field: (txt, area, obj) => {
		var ctx = invoice.ctx,
			c = ctx.getImageData(area[0], area[1], 1, 1).data;
		let x = area[0],
			y = invoice.writing_options_defaults;

		ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
		ctx.fillRect(area[0], area[1], area[2], area[3]);
		ctx.fillStyle = "#000";
		ctx.font = y['font-style'] + ' ' + y['font-variant'] + ' ' + y['font-weight'] + ' ' + y['font-size'] + 'px ' + y['font-family'];
		ctx.textBaseline = 'middle';

		if (ctx.measureText(txt).width <= area[2] / 2) {
			ctx.fillText(txt, x, (area[1] + area[3] / 2));
		} else {
			ctx.fillText(txt, area[0], (area[1] + area[3] / 2), area[2]);
		}
		ctx.textBaseline = 'alphabetic';
	},
	addToArea: (txt, area) => {
		var old_lines = [],
			new_lines = [];
		var ctx = invoice.ctx; var line = "", line_len = 0;
		ctx.textBaseline = 'top';
		var fontsize = parseInt(invoice.writing_options_defaults['font-size']);
		var y = invoice.writing_options_defaults;
		old_lines = txt.split('\n');

		function calc_new_line() {
			for (let i = 0; i < old_lines.length; i++) {
				var words = old_lines[i].split(" ");
				ctx.font = y['font-style'] + ' ' + y['font-variant'] + ' ' + y['font-weight'] + ' ' + fontsize + 'px ' + y['font-family'];
				for (let j = 0; j < words.length; j++) {
					line_len += ctx.measureText((j === words.length - 1 ? words[j] : words[j] + " ")).width;
					if (line_len <= area[2]) {
						line += (j === words.length - 1 ? words[j] : words[j] + " ");
					} else {
						new_lines.push(line);
						line = ""; line_len = 0; j--;
					};
				}// end of the for loop
				new_lines.push(line);
				line = ""; line_len = 0;
			};// end of the for loop
		};
		while (1) {
			calc_new_line()
			if (new_lines.length * fontsize < area[3]) break;
			else {
				fontsize--;
				old_lines = new_lines;
				new_lines = [];
			}
		};

		for (let i = 0; i < new_lines.length; i++) {
			ctx.fillText(new_lines[i], area[0],
				area[1] + (fontsize * i), area[2]
			);
		}
	},

	write: function () {

		if (invoice.strict) {
			let ele_to_beChecked = _(".inv_no, .invoice_date, .bt_name, .place_of_supply, .bt_state, .st_state, .st_name, .qty, .rate, .item_desc");
			for (let i = 0; i < ele_to_beChecked.length; i++) {
				if (!ele_to_beChecked[i].value) {
					alert("some fields area neccessay to be filled");
					return false;
				}
			};
		};

		let inp = document.querySelectorAll(".main_content");
		for (let i = 0; i < inp.length; i++) {
			let area = invoice.find(inp[i].classList[1]), val;
			if (!inp[i].value) continue;
			switch (inp[i].type) {
				case 'file':
					val = _('.' + inp[i].classList[1] + "_prev")[0].src;
					invoice.ctx.drawImage(_('.' + inp[i].classList[1] + "_prev")[0], area[0], area[1], area[2], area[3]);
					break;
				case 'textarea':
					val = inp[i].value;
					invoice.addToArea(val, area);
					break;
				case 'date':
					val = inp[i].valueAsDate.toDateString().split(" ").splice(1, 3).join().replace(",", " "), area;
					invoice.write_in_Field(val, area);
					break;
				case 'number':
					switch (inp[i].classList[1]) {
						case 'reserve_charge':
						case 'rate':
						case 'less_discount':
						case 'freight':
						case 'gst_rc':
							val = Number(inp[i].value).toFixed(2);
							invoice.write_in_Field('\u20B9 ' + val, area);
							break;
						case 'cgst_rate':
						case 'sgst_rate':
						case 'igst_rate':
							val = Number(inp[i].value).toFixed(2);
							invoice.write_in_Field(val + '%', area);
							break;
						default:
							val = inp[i].value;
							invoice.write_in_Field(val, area);
					};// end of the inner switch
					break;
				default:
					val = inp[i].value;
					invoice.write_in_Field(val, area);
			};// end of the switch 
			invoice.data[area[4]] = val;
		};// end of the for loop

		let qty = (Number(_('.qty')[0].value).toFixed(2)),
			rate = (Number(_('.rate')[0].value).toFixed(2)),
			less_disc = (Number(_('.less_discount')[0].value).toFixed(2)),
			freight = (Number(_('.freight')[0].value).toFixed(2)),
			cgst_rate = (Number(_('.cgst_rate')[0].value).toFixed(2)),
			sgst_rate = (Number(_('.sgst_rate')[0].value).toFixed(2)),
			igst_rate = (Number(_('.igst_rate')[0].value).toFixed(2));

		qty = qty ? parseFloat(qty) : NaN;
		rate = rate ? parseFloat(rate) : NaN;
		less_disc = less_disc ? parseFloat(less_disc) : NaN;
		freight = freight ? parseFloat(freight) : NaN;
		cgst_rate = cgst_rate ? parseFloat(cgst_rate) : NaN;
		sgst_rate = sgst_rate ? parseFloat(sgst_rate) : NaN;
		igst_rate = igst_rate ? parseFloat(igst_rate) : NaN;

		let pre_tot_amt = qty * rate,
			tx_amt = pre_tot_amt + freight + less_disc,
			cgst_amt = tx_amt * cgst_rate / 100,
			igst_amt = tx_amt * igst_rate / 100,
			sgst_amt = tx_amt * sgst_rate / 100,
			tamt = tx_amt + cgst_amt + sgst_amt + igst_amt;

		if (pre_tot_amt !== NaN) {
			invoice.data['amount'] = Number(pre_tot_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(pre_tot_amt).toFixed(2), invoice.find('amount'));

			invoice.data['tt'] = Number(pre_tot_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(pre_tot_amt).toFixed(2), invoice.find('tt'), { font: 'bold 45px monospace' });
		};
		if (tx_amt !== NaN) {
			invoice.data['taxable_value'] = Number(tx_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(tx_amt).toFixed(2), invoice.find('taxable_value'));
		};
		if (cgst_amt !== NaN) {
			invoice.data['cgst_amt'] = Number(cgst_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(cgst_amt).toFixed(2), invoice.find('cgst_amt'));
		};
		if (sgst_amt !== NaN) {
			invoice.data['sgst_amt'] = Number(sgst_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(sgst_amt).toFixed(2), invoice.find('sgst_amt'));
		};
		if (igst_amt !== NaN) {
			invoice.data['igst_amt'] = Number(igst_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(igst_amt).toFixed(2), invoice.find('igst_amt'));
		};
		if (cgst_amt + sgst_amt + igst_amt !== NaN) {
			invoice.data['tamt_gst'] = Number(cgst_amt + sgst_amt + igst_amt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number((cgst_amt + sgst_amt + igst_amt)).toFixed(2), invoice.find('tamt_gst'));
		};
		if (tamt !== NaN) {
			invoice.data['tamt_with_tax'] = Number(tamt).toFixed(2);
			invoice.write_in_Field('\u20B9 ' + Number(tamt).toFixed(2), invoice.find('tamt_with_tax'));

			invoice.data['tamt_in_word'] = invoice.ntow(parseFloat(Number(tamt).toFixed(2)));
			invoice.addToArea(invoice.ntow(parseFloat(Number(tamt).toFixed(2))), invoice.find('tamt_in_word'));
		};
		return true;
	},// end of the write function

	change_state_code_field: function (a) {
		let code;
		switch (a.value.toUpperCase()) {
			case 'JAMMU AND KASHMIR': code = 1; break;
			case 'HIMACHAL PRADESH': code = 2; break;
			case 'PUNJAB': code = 3; break;
			case 'CHANDIGARH': code = 4; break;
			case 'UTTARAKHAND': code = 5; break;
			case 'HARYANA': code = 6; break;
			case 'DELHI': code = 7; break;
			case 'RAJASTHAN': code = 8; break;
			case 'UTTAR  PRADESH': code = 9; break;
			case 'BIHAR': code = 10; break;
			case 'SIKKIM': code = 11; break;
			case 'ARUNACHAL PRADESH': code = 12; break;
			case 'NAGALAND': code = 13; break;
			case 'MANIPUR': code = 14; break;
			case 'MIZORAM': code = 15; break;
			case 'TRIPURA': code = 16; break;
			case 'MEGHLAYA': code = 17; break;
			case 'ASSAM': code = 18; break;
			case 'WEST BENGAL': code = 19; break;
			case 'JHARKHAND': code = 20; break;
			case 'ODISHA': code = 21; break;
			case 'CHATTISGARH': code = 22; break;
			case 'MADHYA PRADESH': code = 23; break;
			case 'GUJARAT': code = 24; break;
			case 'DAMAN AND DIU': code = 25; break;
			case 'DADRA AND NAGAR HAVELI': code = 26; break;
			case 'MAHARASHTRA': code = 27; break;
			case 'ANDHRA PRADESH BEFORE DIVISION': code = 28; break;
			case 'KARNATAKA': code = 29; break;
			case 'GOA': code = 30; break;
			case 'LAKSHWADEEP': code = 31; break;
			case 'KERALA': code = 32; break;
			case 'TAMIL NADU': code = 33; break;
			case 'PUDUCHERRY': code = 34; break;
			case 'ANDAMAN AND NICOBAR ISLANDS': code = 35; break;
			case 'TELANGANA': code = 36; break;
			case 'ANDHRA PRADESH': code = 37; break;
		};//end of the switch statement
		document.querySelector('.' + a.classList[1] + '_code').value = code;
	},

	ntow: function (n, t = true) {
		return ntow(n);
	},

	save_png: function () {
		invoice.make_invoice(() => {
			var a = document.createElement("a");
			a.href = invoice.canvas.toDataURL('image/png', 0.5);
			let t = new Date();
			a.setAttribute("download", ((t.toDateString().replace(/ /g, '-') + '-' + t.toTimeString().split(" ")[0])) + '.png');
			console.log("before");
			a.click();
			console.log("after");
		});
	},
	save_pdf: function () {
		invoice.make_invoice(
			function () {
				let doc = new jsPDF(),
					data = invoice.canvas.toDataURL(),
					width = doc.internal.pageSize.width,
					height = doc.internal.pageSize.height;
				doc.addImage(data, 'PNG', 0, 0, width, height, '', 'FAST');
				let t = new Date();
				doc.save((t.toDateString().replace(/ /g, '-') + '-' + t.toTimeString().split(" ")[0]));
			}
		);
	},
	save_internal: () => {
		if (!invoice.strict) {
			alert("This feature cannot be used without strict mode");
			return;
		};
		invoice.make_invoice(function () {
			let db = invoice.db;
			let tx = db.transaction("invoice", "readwrite"),
				obs = tx.objectStore("invoice");
			let p = obs.put(invoice.data);
			p.onsuccess = () => {
				console.log("SUCCESS :: Invoice successfully added to the datatbase");
				alert("SUCCESS :: Invoice successfully added to the datatbase");
			};
			p.onerror = e => {
				console.log("FAIL :: An error occured while saving invoice in the database", e);
				alert("FAIL :: An error occured while saving invoice in the database");
			};
			tx.oncomplete = function () {
				console.log("Transaction completed successfully");
			};
			tx.onerror = function (e) {
				console.log("Transaction terminated due to an error", tx.error);
				alert("Transaction terminated due to an error");
			};
		});
	},

	showAllSavedInvoice: function () {
		var ele = _("#model_cntent_holder")[0];
		var str;
		var tx = invoice.db.transaction("invoice", 'readonly'),
			obs = tx.objectStore('invoice'),
			cur = obs.openCursor();
		let table = document.createElement("table"),
			tr = document.createElement("tr");

		table.id = "all_saved_invoice_table";

		var sno = 0;

		tr.innerHTML = `
			<th>S.No</th>
			<th>Invoice Number</th>
			<th>Invoice Date</th>
			<th>Place Of Supply</th>
			<th>Billed to: Name </th>
			<th>Billed To: State</th>
			<th>Shipped To: Name</th>
			<th>Shipped To: State</th>`;

		table.appendChild(tr);

		cur.onsuccess = function (e) {
			let data = e.target.result;
			tr = document.createElement("tr");
			if (data) {
				tr.innerHTML = '<td>' + (++sno) + '</td>'
					+ '<td>' + data.value.inv_no + '</td>'
					+ '<td>' + data.value.invoice_date + '</td>'
					+ '<td>' + data.value.place_of_supply + '</td>'
					+ '<td>' + data.value.bt_name + '</td>'
					+ '<td>' + data.value.bt_state + '</td>'
					+ '<td>' + data.value.st_name + '</td>'
					+ '<td>' + data.value.st_state + '</td>';

				tr.setAttribute("onclick", "invoice.reCreateInvoice('" + data.value.inv_no + "')");
				table.appendChild(tr);
				data.continue();
			} else {
				tr.innerHTML = "<td style='text-align:center' colspan='8'>No more items to show</td>";
				table.appendChild(tr);
			}
			ele.innerHTML = "";
			ele.appendChild(table);
			_("#open_modal")[0].click();
		};
	},

	reCreateInvoice: which => {
		var tx = invoice.db.transaction("invoice", 'readonly'),
			obs = tx.objectStore("invoice");
		var get_req = obs.get(which);
		get_req.onsuccess = function (e) {
			var ob = e.target.result;
			var ob_k = Object.keys(ob);
			for (let i = 0; i < ob_k.length; i++) {
				switch (ob_k[i]) {
					case 'po_date':
					case 'invoice_date':
					case 'date_of_supply':
						let s = new Date(ob[ob_k[i]]);
						let g = s.toISOString().split("T")[0].split('-');
						let t = parseInt(g.pop()) + 1;
						g.push(t < 10 ? '0' + String(t) : String(t));
						var h = g.join().replace(/,/gi, '-');
						_("." + ob_k[i] + "")[0].value = h;
						break;
					case 'common_seal':
					case 'auth_sig':
						_("." + ob_k + "_prev")[0].src = ob[ob_k[i]];
						break;
					default:
						try { _("." + ob_k[i] + "")[0].value = ob[ob_k[i]]; }
						catch (err) { console.log(err, ob_k[i]); };
				};// end of the switch case 
			};
		};
	},

	createBackupfile: function () {
		let tx = invoice.db.transaction(["invoice", "settings"], 'readonly'),
			obs_inv = tx.objectStore("invoice"),
			obs_st = tx.objectStore("settings");
		let st_str = "", inv_str = "";
		obs_st.get(0).onsuccess = e => {
			st_str = JSON.stringify(e.target.result);
			let temp = {}, i = 0;
			// now conver the whole invoice object store to string
			obs_inv.openCursor().onsuccess = e => {
				let data = e.target.result;
				if (data) {
					temp[String(i++)] = data.value;
					data.continue();
				} else {
					// now all the data stored in this object store is stored in the array
					inv_str = JSON.stringify(temp);
					temp = { "settings": st_str, "invoice": inv_str };
					backupstr = JSON.stringify(temp);
					window.open("", "_blank").document.write(backupstr);
				}
			}
		}
	},
	ChangeDatabase_fromBackupFile: function (t = false) {
		let ele = _("#model_cntent_holder")[0];
		ele.innerHTML = "<form><textarea placeholder='enter backup string' id='backup_string_input_textarea' ></textarea><br/><br/><input type='radio' value='rebuid' name='rebuid'>Rebuid</input><br/><input name='rebuid' type='radio' value='append'>Append</input><br/><br/><button onclick='invoice.ChangeDatabase_fromBackupFile(true)'>Ok</button></form>"; // clean and add
		if (t) {
			// if t is true then this function is called do the further function.
			// get the backup string which should be inside in the textbox.
			let backuptstr = _('#backup_string_input_textarea')[0].value,
				// now parse the backup string 
				obj = JSON.parse(backuptstr),
				// from that object get the settings object
				obj_settings = JSON.parse(obj.settings);
			// determine if the user want to rebuilt the whole database or just want to append the data.
			let flush = document.querySelectorAll('input[value="rebuid"]')[0].checked;
			// flush means all the data will be flushed.
			// start the transaction and obtain the settings and invoice object store.
			let tx = db.transaction(["invoice", "settings"], 'readwrite');
			tx.onsuccess = e => {
				//first update the settings of the invoice.
				let objs_stngs = tx.objectStore('settings');
				objs_stngs.put(obj_settings, invoice_settings_objectstore_index).onerror = e => {
					console.log('in invoice.ChangeDatabase_fromBackupFile: Unable to update settings');
				};
				// if user want to flush data
				let objs_inv = tx.objectStore('invoice');
				function add_allinvcs(e) {
					let objofinv = JSON.parse(obj.invoice);// get the object containing all the invoices.
					for (key in objofinv) {
						// get a particular object
						let obj_invoice = JSON.parse(objofinv[key]),
							put_req = objs_inv.put(obj_invoice);
						put_req.onerror = e => {
							console.log("in invoice.ChangeDatabase_fromBackupFile: Unable to add invoice", obj_invoice);
						}
					}
				};
				if (flush) {
					// request to clear the invoice objectstore.
					let objs_inv_clear_req = objs_inv.clear();
					objs_inv_clear_req.onsuccess = add_allinvcs;
					objs_inv_clear_req.onerror = e => {
						console.log("in invoice.ChangeDatabase_fromBackupFile: Unable to clear the invoice objectstore.", e);
					};
				} else {
					// simply update/insert the data
					add_allinvcs({});
				}
			}
			tx.onerror = e => {
				console.log("in invoice.ChangeDatabase_fromBackupFile: cannot initiate transaction.");
			}
		} else {
			//open the model dialog box if this function is called to open it
			_("#open_modal")[0].click();
		}
	}
};

window.onload = function () {
	invoice._onload();
	var eles = _(".auth_sig, .common_seal");
	var imgs = _(".img_prev");
	for (let i = 0; i < eles.length; i++) {
		eles[i].onchange = function () {
			var file = this.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
				imgs[i].src = reader.result;
			}
		};
	}
};
