function drawCircle(opts) {
	return new google.maps.Circle(opts);
}

function hideCircle(circle) {
	circle.setVisible(false); 
}

function showCircle(circle) {
	circle.setVisible(true); 
}

function deleteCircle(circle) {
	circle.setMap(null);
}

function CircleOpts(center, fillColor, fillOpacity, map, radius, strokeColor, strokeOpacity, strokeWeight, visible, zIndex) {
	this.center = center;
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

CircleOpts.prototype.setGCenter = function(latitude, longitude) {
	this.center = new google.maps.LatLng(latitude, longitude);
};

CircleOpts.prototype.setGMap = function(map) {
	this.map = map;
};

CircleOpts.prototype.setGRadius = function(radius) {
	this.radius = radius;
};

CircleOpts.prototype.setGZIndex = function(zIndex) {
	this.zIndex = zIndex;
};

CircleOpts.prototype.makeCopy = function() {
	return new CircleOpts(this.center, this.fillColor, this.fillOpacity, this.map, this.radius, this.strokeColor, this.strokeOpacity, this.strokeWeight, this.visible, this.zIndex);
};