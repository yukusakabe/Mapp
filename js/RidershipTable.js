/*
*RidershipTable Class
*/
function RidershipTable(table) {
	this.table = table;
}

RidershipTable.prototype.setData = function(year, transitType, id, data) {
	if (this.table == null) {
		this.table = {};
	}
	
	if (this.table[year] == null) {
		this.table[year] = {};
	}
	
	if (this.table[year][transitType] == null) {
		this.table[year][transitType] = {};
	}

	this.table[year][transitType][id] = data;
};

RidershipTable.prototype.getData = function(year, transitType, id) {
	return this.table[year][transitType][id];
};

RidershipTable.prototype.getRankList = function(year, transitType) {
	var rankList = [];

	for (var k in this.table[year][transitType]) {
		if (this.table[year][transitType][k] != 0) {
			rankList.push([k, this.table[year][transitType][k]]);
		}
	}
	
	rankList.sort(function(a, b) {
		return (b[1] - a[1]);
	});
	
	return rankList;
};

RidershipTable.prototype.getYearList = function() {
	var yearList = [];
	
	for (var k in this.table) {
		yearList.push(k);
	}
	
	yearList.sort(function(a, b) {
		return (b - a);
	});
	
	return yearList;
}

RidershipTable.prototype.getMaxRidership = function(year, transitType) {
	var maxRidership = 0;
	
	for (var k in this.table[year][transitType]) {
		if (maxRidership < this.table[year][transitType][k]) {
			maxRidership = this.table[year][transitType][k];
		}
	}
	
	return maxRidership;
};