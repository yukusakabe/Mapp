/*
*ListData Class
*/
delerrok.mapp.ListData = function(id, name, addr, city, state, country, ridership) {
	this.id = id;
	this.name = name;
	this.addr = addr;
	this.city = city;
	this.state = state;
	this.country = country;
	this.ridership = ridership;
}

delerrok.mapp.ListData.prototype.getName = function(){
	return this.name;
}

delerrok.mapp.ListData.prototype.getAddr = function(){
	return this.addr;
}

delerrok.mapp.ListData.prototype.getName = function(){
	return this.city;
}

delerrok.mapp.ListData.prototype.getName = function(){
	return this.state;
}

delerrok.mapp.ListData.prototype.getName = function(){
	return this.country;
}

delerrok.mapp.ListData.prototype.getName = function(){
	return this.ridership;
}