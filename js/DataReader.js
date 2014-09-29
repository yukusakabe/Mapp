function csv2Array(filePath) {
	var csvData = new Array();
	var data = new XMLHttpRequest();	
	data.open("GET", filePath, false);
	data.send(null);

	var LF = String.fromCharCode(13);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
}

function readAgency() {
	var cvs = csv2Array("./agency.csv");
	var agency = {};
	
	for (var i = 0; i < cvs.length; i++) {
		agency[cvs[i][0]] = new delerrok.maps.Agency(Number(cvs[i][0]), cvs[i][1], cvs[i][2], cvs[i][3], cvs[i][4], cvs[i][5], Number(cvs[i][10]), Number(cvs[i][11]), null);
	}
	return agency;
}

function readRidershipTable() {
	var cvs = csv2Array("./agency.csv");
	var ridership = new RidershipTable();
	
	for (var i = 0; i < cvs.length; i++) {
		ridership.setData(2012, TransitType.TOTAL, Number(cvs[i][0]), Number(cvs[i][9]));
		ridership.setData(2012, TransitType.BUS, Number(cvs[i][0]), Number(cvs[i][6]));
		ridership.setData(2012, TransitType.RAIL, Number(cvs[i][0]), Number(cvs[i][7]));
		ridership.setData(2012, TransitType.OTHER, Number(cvs[i][0]), Number(cvs[i][8]));
	}
	return ridership;
}

function readRidershipGraphRuleList() {
	var cvs = csv2Array("./opts.csv");
	var ruleList = [];
	for (var i = 0; i < cvs.length; i++) {
		ruleList[i] = new RidershipGraphRule(cvs[i][0], new CircleOpts(null, cvs[i][1], Number(cvs[i][2]), null, 0, cvs[i][3], Number(cvs[i][4]), Number(cvs[i][5]), true, 0));
	}
	
	return ruleList;
}