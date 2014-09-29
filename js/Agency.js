/*
*Agency Class
*
*id : Number
*name : String
*addr : Stirng
*city : String
*state : Stirng
*country : Stirng
*latitude : Number
*longitude : Number
*/
delerrok.maps.Agency = function(id, name, abbr, city, state, country, latitude, longitude) {
	this.id = id;
	this.name = name;
	this.abbr = abbr;
	this.city = city;
	this.state = state;
	this.country = country;
	this.latitude = latitude;
	this.longitude = longitude;
}

delerrok.maps.Agency.prototype.getId = function() {
	return this.id;
};

delerrok.maps.Agency.prototype.getName = function() {
	return this.name;
};

delerrok.maps.Agency.prototype.getAddr = function() {
	return this.addr;
};

delerrok.maps.Agency.prototype.getCity = function() {
	return this.city;
};

delerrok.maps.Agency.prototype.getState = function() {
	return this.state;
};

delerrok.maps.Agency.prototype.getCountry = function() {
	return this.country;
};

delerrok.maps.Agency.prototype.getLatitude = function() {
	return this.latitude;
};

delerrok.maps.Agency.prototype.getLongitude = function() {
	return this.longitude;
};