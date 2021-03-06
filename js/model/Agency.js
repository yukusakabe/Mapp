/*
*Agency Class
*
*/
delerrok.mapp.Agency = function(id, name, abbr, city, state, country, latitude, longitude, year, totalRidership, busRidership, railRidership, rank, group) {
	this.id = id;
	this.name = name;
	this.abbr = abbr;
	this.city = city;
	this.state = state;
	this.country = country;
	this.latitude = latitude;
	this.longitude = longitude;
	this.year = year;
	this.ridership = [];
	this.rank = rank;
	this.group = group;
	
	this.setRidership(totalRidership, busRidership, railRidership);
}

delerrok.mapp.Agency.prototype.getId = function() {
	return this.id;
};

delerrok.mapp.Agency.prototype.getName = function() {
	return this.name;
};

delerrok.mapp.Agency.prototype.getAbbr = function() {
	return this.abbr;
};

delerrok.mapp.Agency.prototype.getCity = function() {
	return this.city;
};

delerrok.mapp.Agency.prototype.getState = function() {
	return this.state;
};

delerrok.mapp.Agency.prototype.getCountry = function() {
	return this.country;
};

delerrok.mapp.Agency.prototype.getLatitude = function() {
	return this.latitude;
};

delerrok.mapp.Agency.prototype.getLongitude = function() {
	return this.longitude;
};

delerrok.mapp.Agency.prototype.getYear = function() {
	return this.year;
};

delerrok.mapp.Agency.prototype.getRank = function() {
	return this.rank;
};

delerrok.mapp.Agency.prototype.getGroup = function() {
	return this.group;
};

delerrok.mapp.Agency.prototype.setRidership = function(totalRidership, busRidership, railRidership) {
	this.ridership[TransitType.TOTAL] = totalRidership;
	this.ridership[TransitType.BUS] = busRidership;
	this.ridership[TransitType.RAIL] = railRidership;
};

delerrok.mapp.Agency.prototype.getRidership = function(transitType) {
	return this.ridership[transitType];
};