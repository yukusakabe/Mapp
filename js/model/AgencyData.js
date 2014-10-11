/*
*AgencyData Class
*/
delerrok.mapp.AgencyData = function() {
	this.agency = {};
	this.agencyList = [];
	
	this.rankList = [];
	this.agencyRank = {};
}

delerrok.mapp.AgencyData.prototype.getAgency = function(id) {
	return this.agency[id];
};

delerrok.mapp.AgencyData.prototype.getLatitude = function(id) {
	return this.agency[id].getLatitude();
};

delerrok.mapp.AgencyData.prototype.getLongitude = function(id) {
	return this.agency[id].getLongitude();
};


delerrok.mapp.AgencyData.prototype.setAgency = function(id, name, abbr, city, state, country, latitude, longitude, year, totalRidership, busRidership, railRidership) {
	this.agency[id] = new delerrok.mapp.Agency(id, name, abbr, city, state, country, latitude, longitude, year, totalRidership, busRidership, railRidership);
	this.agencyList.push(id);
};

delerrok.mapp.AgencyData.prototype.initRank = function() {
	for (var k in this.agency) {
		if (this.agency[k].getRidership(TransitType.TOTAL) != 0) {
			this.rankList.push([k, this.agency[k].getRidership(TransitType.TOTAL)]);
		}
	}
	
	this.rankList.sort(function(a, b) {
		return (b[1] - a[1]);
	});
	
	for (var i = 0; i < this.rankList.length; i++) {
		this.agencyRank[this.rankList[i][0]] = i;
	}
};

delerrok.mapp.AgencyData.prototype.getRankList = function() {
	return this.rankList;
};

delerrok.mapp.AgencyData.prototype.getAgencyRank = function(id) {
	return this.agencyRank[id];
};

delerrok.mapp.AgencyData.prototype.getRidership = function(id, transitType) {
	return this.agency[id].getRidership(transitType);
};

delerrok.mapp.AgencyData.prototype.getAgencyList = function(id) {
	return this.agencyList;
};