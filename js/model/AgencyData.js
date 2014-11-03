/*
*AgencyData Class
*/
delerrok.mapp.AgencyData = function() {
	this.agency = {};
	this.region = {};
	this.country = {};
	
	this.rankList = [];
	this.agencyRank = {};
}

delerrok.mapp.AgencyData.prototype.getAgency = function(id) {
	return this.agency[id];
};

delerrok.mapp.AgencyData.prototype.getId = function(id) {
	return this.agency[id].getId();
};

delerrok.mapp.AgencyData.prototype.getName = function(id) {
	return this.agency[id].getName();
};

delerrok.mapp.AgencyData.prototype.getAbbr = function(id) {
	return this.agency[id].getAbbr();
};

delerrok.mapp.AgencyData.prototype.getCity = function(id) {
	return this.agency[id].getCity();
};

delerrok.mapp.AgencyData.prototype.getState = function(id) {
	return this.agency[id].getState();
};

delerrok.mapp.AgencyData.prototype.getCountry = function(id) {
	return this.agency[id].getCountry();
};

delerrok.mapp.AgencyData.prototype.getLatitude = function(id) {
	return this.agency[id].getLatitude();
};

delerrok.mapp.AgencyData.prototype.getLongitude = function(id) {
	return this.agency[id].getLongitude();
};

delerrok.mapp.AgencyData.prototype.getRank = function(id) {
	return this.agency[id].getRank();
};

delerrok.mapp.AgencyData.prototype.getGroup = function(id) {
	return this.agency[id].getGroup();
};

delerrok.mapp.AgencyData.prototype.setAgency = function(id, name, abbr, city, state, country, latitude, longitude, year, totalRidership, busRidership, railRidership, rank, group) {
	this.agency[id] = new delerrok.mapp.Agency(id, name, abbr, city, state, country, latitude, longitude, year, totalRidership, busRidership, railRidership, rank, group);
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

delerrok.mapp.AgencyData.prototype.getAgencyList = function() {
	return this.agency;
};