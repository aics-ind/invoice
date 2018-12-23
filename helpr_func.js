function ntow(num) {
	if (typeof num !== 'number') throw 'not a number';
	n = parseInt(num);
	m = (num - n).toFixed(2) * 100; // now m will be exactly 2 number wide
	keys = []; // this variables will contanins words like twenty one , fourty four etc.
	res = ''; // resulting string 
	// defining some words
	var a = [
		'', 'one', 'two', 'three', 'four', 'five', 'six',
		'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
		'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'ninteen'
	];
	var b = [
		'', 'twenty', 'thirty', 'fourty', 'fiftey',
		'sixtey', 'seventy', 'eighty', 'ninety'
	];
	var c = [
		'thousands', 'lakhs', 'crores'
	]

	function getTwoDigitsString(nn) {
		let d = nn % 100;
		if (a[d] == undefined)
			return (b[(d - d % 10) / 10 - 1] + ' ' + a[d % 10]);
		else return (a[d]);
	}

	/**
	 * first convert to paisa 
	 */
	keys.push("paisa only");
	keys.push(getTwoDigitsString(m) === '' ? 'zero' : getTwoDigitsString(m));
	keys.push('and');

	/**
	 * now intreprete last 3 digits
	 */

	keys.push(getTwoDigitsString(n));
	if ((n = parseInt(n / 100), n) !== 0) {
		keys.push('hundred');
		keys.push(getTwoDigitsString(n % 10));
		n = parseInt(n / 10);
	}
	// now intreprete further 
	for (let i = 0; ; i++) {
		keys.push(c[i % 3]);
		keys.push(getTwoDigitsString(n));
		if ((n = parseInt(n / 100), n) === 0) break;
	}
	keys.push('Rupees');

	for (let i = keys.length - 1; i >= 0; i--) res += keys[i] + ' ';
	return res;
}

