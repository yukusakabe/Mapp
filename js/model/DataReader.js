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
};

delerrok.mapp.readAgencyData = function() {
	var cvs = csv2Array("./agency.csv");
	var agencyData = new delerrok.mapp.AgencyData();
	
	for (var i = 0; i < cvs.length; i++) {
		agencyData.setAgency(Number(cvs[i][0]), cvs[i][1], cvs[i][2], cvs[i][3], cvs[i][4], cvs[i][5], Number(cvs[i][10]), Number(cvs[i][11]), 2012, Number(cvs[i][9]), Number(cvs[i][6]), Number(cvs[i][7]), Number(cvs[i][12]), Number(cvs[i][13]));
	}
	return agencyData;
};

delerrok.mapp.readBaseRule = function() {
	var cvs = csv2Array("./opts.csv");
	var ruleList = [];
	for (var i = 0; i < cvs.length; i++) {
		ruleList[i] = new delerrok.mapp.GraphRule(cvs[i][0], i);
	}
	
	return ruleList;
};

delerrok.mapp.readBaseOpts = function() {
	var cvs = csv2Array("./opts.csv");
	var optsList = [];
	for (var i = 0; i < cvs.length; i++) {
		optsList[i] = new delerrok.mapp.CircleOpts(null, cvs[i][1], Number(cvs[i][2]), null, 0, cvs[i][3], Number(cvs[i][4]), Number(cvs[i][5]), true, 0);
	}
	
	return optsList;
};