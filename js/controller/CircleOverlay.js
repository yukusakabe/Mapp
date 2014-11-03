/*
*CircleOverlay Class
*/
delerrok.mapp.CircleOverlay = function(map, agencyData) {
	this.gmap = map;
	this.agencyData = agencyData;
	
	this.baseRule = null;
	this.baseOpts = null;
	this.defOptsTable = {};
	this.defOpts = {};
	
	this.circleSize = null;
	this.currentTransitType = null;
		
	this.circle = {};
	
	this.init();
}

delerrok.mapp.CircleOverlay.prototype.init = function(){		
	this.baseRule = delerrok.mapp.readBaseRule();
	this.baseOpts = delerrok.mapp.readBaseOpts();
	
	this.initDefOptsTable();
	this.initDefOpts();
};

delerrok.mapp.CircleOverlay.prototype.getCurrentRadius = function(id) {
	return this.defOpts[id].getCRadius()
}

delerrok.mapp.CircleOverlay.prototype.initDefOptsTable = function() {
	var agencyList = this.agencyData.getAgencyList();
	
	for (var k in agencyList) {
			this.defOptsTable[k] = this.baseRule[this.agencyData.getGroup(k)].getOptsNo();
	}
};

delerrok.mapp.CircleOverlay.prototype.initDefOpts = function() {
	for (var k in this.defOptsTable) {
		this.defOpts[k] = this.baseOpts[this.defOptsTable[k]].makeCopy();
		this.defOpts[k].setCCenter(this.agencyData.getLatitude(k), this.agencyData.getLongitude(k));
		this.defOpts[k].setCMap(this.gmap);
		this.defOpts[k].setCZIndex(this.agencyData.getAgencyRank(k));
	}
};

delerrok.mapp.CircleOverlay.prototype.drawGraph = function(size, transitType) {
	this.circleSize = size;
	this.currentTransitType = transitType;

	for (var k in this.defOpts) {
		this.defOpts[k].setCRadius(this.calcRadius(this.agencyData.getRidership(k, transitType), this.agencyData.getLatitude(k)));
		this.circle[k] = new google.maps.Circle(this.defOpts[k]);
	}
};

delerrok.mapp.CircleOverlay.prototype.getCircle = function(id) {
	return this.circle[id];
};

delerrok.mapp.CircleOverlay.prototype.showCircle = function(id) {
	this.circle[id].setVisible(true);
};

delerrok.mapp.CircleOverlay.prototype.showAllCircle = function(str) {
	for (var k in this.circle) {
		if (document.group.elements[this.agencyData.getGroup(k)].checked) {
			if (str != null) {
				if (this.agencyData.getName(k).toLowerCase().indexOf(str.toLowerCase()) != -1 || this.agencyData.getCity(k).toLowerCase().indexOf(str.toLowerCase()) != -1) {
					this.circle[k].setVisible(true);
				}
			} else {
				this.circle[k].setVisible(true);
			}
		}
	}
};

delerrok.mapp.CircleOverlay.prototype.hideCircle = function(id) {
	this.circle[id].setVisible(false);
};

delerrok.mapp.CircleOverlay.prototype.hideAllCircle = function(id) {
	for (var k in this.circle) {
		this.circle[k].setVisible(false);
	}
};

delerrok.mapp.CircleOverlay.prototype.showGroup= function(code) {
	for (var k in this.circle) {
		if (this.agencyData.getGroup(k) == code) {
			this.circle[k].setVisible(true);
		}
	}
};

delerrok.mapp.CircleOverlay.prototype.hideGroup = function(code) {
	for (var k in this.circle) {
		if (this.agencyData.getGroup(k) == code) {
			this.circle[k].setVisible(false);
		}
	}
};

delerrok.mapp.CircleOverlay.prototype.changeCircleSize = function(size) {
	this.circleSize = size;
	
	for (var k in this.circle) {
		this.defOpts[k].setCRadius(this.calcRadius(this.agencyData.getRidership(k, this.currentTransitType), this.agencyData.getLatitude(k)));
		this.circle[k].setRadius(this.defOpts[k].getCRadius());
	}
};

delerrok.mapp.CircleOverlay.prototype.changeTransitType = function(transitType) {
	this.currentTransitType = transitType;

	for (var k in this.circle) {
		this.defOpts[k].setCRadius(this.calcRadius(this.agencyData.getRidership(k, this.currentTransitType), this.agencyData.getLatitude(k)));
		this.circle[k].setRadius(this.defOpts[k].getCRadius());
	}
};

delerrok.mapp.CircleOverlay.prototype.calcRadius = function(radius, latitude) {
	return this.circleSize * Math.sqrt(radius) * Math.cos(latitude * (Math.PI / 180), 2);
};