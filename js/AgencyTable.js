/*
*AgencyTable Class
*/
delerrok.maps.AgencyTable = function(agency) {
	this.agency = agency;
}

delerrok.maps.AgencyTable.prototype.getName = function(id) {
	return this.agency[id].getId();
};

delerrok.maps.AgencyTable.prototype.getAddr = function(id) {
	return this.agency[id].getAddr();
};

delerrok.maps.AgencyTable.prototype.getCity = function(id) {
	return this.agency[id].getCity();
};

delerrok.maps.AgencyTable.prototype.getState = function(id) {
	return this.agency[id].getState();
};

delerrok.maps.AgencyTable.prototype.getCountry = function(id) {
	return this.agency[id].getCountry();
};

delerrok.maps.AgencyTable.prototype.getLatitude = function(id) {
	return this.agency[id].getLatitude();
};

delerrok.maps.AgencyTable.prototype.getLongitude = function(id) {
	return this.agency[id].getLongitude();
};