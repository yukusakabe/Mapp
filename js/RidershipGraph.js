/*
*RidershipGraph Class
*/
function RidershipGraph(map, agency, ridershipTable, ruleList, size) {
	this.map = map;
	this.agency = agency;
	this.ridershipTable = ridershipTable;
	this.ruleList = ruleList;
	this.size = size;
	
	this.currentYear = null;
	this.currentTransiType = null;
	
	this.opts = {};
	this.circle = {};
}

RidershipGraph.prototype.getRule = function(no) {
	return this.rule[no];
};

RidershipGraph.prototype.getRuleLength = function(no) {
	return this.rule.length;
};

RidershipGraph.prototype.setSize = function(size) {
	this.size = size;
};

RidershipGraph.prototype.getSize = function() {
	return this.size;
};

RidershipGraph.prototype.drawGraph = function(year, transitType) {
	this.currentYear = year;
	this.currentTransiType = transitType;
	this.opts = {};

	for (var l in this.circle) {
		deleteCircle(this.circle[l]);
		delete this.circle[l];
	}

	
	var rankList = this.ridershipTable.getRankList(year, transitType);

	for (var k = 0, l = rankList.length; k < l; k++) {
		for (var i = 0, j = this.ruleList.length; i < j; i++) {
			if (this.ruleList[i].applyRule(this.agency[rankList[k][0]], this.ridershipTable.getData(year, transitType, rankList[k][0]), k)) {
				this.opts[rankList[k][0]] = this.ruleList[i].getOpts().makeCopy();
			}
		}

		this.opts[rankList[k][0]].setGCenter(this.agency[rankList[k][0]].getLatitude(), this.agency[rankList[k][0]].getLongitude());
		this.opts[rankList[k][0]].setGMap(getMainMap());
		
		this.opts[rankList[k][0]].setGRadius(this.calcRadius(this.ridershipTable.getData(year, transitType, rankList[k][0]), this.agency[rankList[k][0]].getLatitude()));
		
		
		this.opts[rankList[k][0]].setGZIndex(k);
		this.circle[rankList[k][0]] = drawCircle(this.opts[rankList[k][0]]);
	}
};

RidershipGraph.prototype.reloadGraph = function() {
	for (var i in this.circle) {
		this.circle[i].setOptions(this.opts[i]);
	}
};

RidershipGraph.prototype.changeSize = function(size) {
	this.size = size;
	
	if (this.currentYear != null && this.currentTransiType != null){
		for (var i in this.circle) {
			this.circle[i].setRadius(this.calcRadius(this.ridershipTable.getData(this.currentYear, this.currentTransiType, i), this.agency[i].getLatitude()));
		}
	}
};

RidershipGraph.prototype.calcRadius = function(ridership, latitude) {
	return this.size * Math.sqrt(ridership) * Math.cos(latitude * (Math.PI / 180), 2);
};

/*
*RidershipGraphRule Class
*/
function RidershipGraphRule(formula, opts) {
	this.formula = formula;
	this.opts = opts;
}

RidershipGraphRule.prototype.applyRule = function(agency, ridership, rank) {
	return eval(this.formula);
};

RidershipGraphRule.prototype.getOpts = function() {
	return this.opts;
};