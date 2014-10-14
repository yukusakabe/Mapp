/*
*CircleOpts Class
*/
delerrok.mapp.CircleOpts = function(center, fillColor, fillOpacity, map, radius, strokeColor, strokeOpacity, strokeWeight, visible, zIndex) {
	this.center = center
	this.fillColor = fillColor;
	this.fillOpacity = fillOpacity;
	this.map = map;
	this.radius = radius;
	this.strokeColor = strokeColor;
	this.strokeOpacity = strokeOpacity;
	this.strokeWeight = strokeWeight;
	this.visible = visible;
	this.zIndex = zIndex;
}

delerrok.mapp.CircleOpts.prototype.setCFillOpacity = function(fillOpacity) {
	this.fillOpacity = fillOpacity;
};

delerrok.mapp.CircleOpts.prototype.setCStrokeOpacity = function(strokeOpacity) {
	this.strokeOpacity = strokeOpacity;
};

delerrok.mapp.CircleOpts.prototype.setCCenter = function(latitude, longitude) {
	this.center = new google.maps.LatLng(latitude, longitude);
};

delerrok.mapp.CircleOpts.prototype.setCMap = function(map) {
	this.map = map;
};

delerrok.mapp.CircleOpts.prototype.setCRadius = function(radius) {
	this.radius = radius;
};

delerrok.mapp.CircleOpts.prototype.getCRadius = function() {
	return this.radius;
};

delerrok.mapp.CircleOpts.prototype.setCZIndex = function(zIndex) {
	this.zIndex = zIndex;
};

delerrok.mapp.CircleOpts.prototype.makeCopy = function() {
	return new delerrok.mapp.CircleOpts(this.center, this.fillColor, this.fillOpacity, this.map, this.radius, this.strokeColor, this.strokeOpacity, this.strokeWeight, this.visible, this.zIndex);
};