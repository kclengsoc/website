var count = 1;
while (count <= 100) {
	var toPrint = "";

	if (count % 3 == 0) {
		toPrint += "fizz";
	}

	if (count % 5 == 0) {
		toPrint += "buzz";
	}

	if (toPrint.length == 0) {
		toPrint = count;
	}

	console.log(toPrint);
	count += 1;
}
