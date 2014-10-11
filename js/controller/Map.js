/*
*Map Class
*/
delerrok.mapp.Map = function(agencyData, circleSize, latitude, longitude, zoom) {
	this.gmap = null;
	this.currentInfoWindow = null;

	this.agencyData = agencyData;
	
	this.baseRule = null;
	this.baseOpts = null;
	this.stdOptsTable = {};
	this.stdOpts = {};
	
	this.circleSize = circleSize;
	
	this.circles = {};
	
	this.init(latitude, longitude, zoom);
}

delerrok.mapp.Map.prototype.init = function(latitude, longitude, zoom){
	var defLatlng = new google.maps.LatLng(latitude, longitude);
	var defOpts = {
		zoom: zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: defLatlng,
		scaleControl: true
	};
	
	this.gmap = new google.maps.Map(document.getElementById('gmap'), defOpts);
	
	var controlDiv = document.createElement('div');
	var graphController = document.getElementById("graphController");
	controlDiv.appendChild(graphController);
	this.gmap.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
	
	google.maps.event.addListener(this.gmap, 'click', function() {
		if (this.currentInfoWindow) {
			this.currentInfoWindow.close();
		}
	});
		
	this.baseRule = delerrok.mapp.readBaseRule();
	this.baseOpts = delerrok.mapp.readBaseOpts();
	
	this.initStdOptsTable();
	this.initStdOpts();
};

delerrok.mapp.Map.prototype.setCircleSize = function(size) {
	this.circleSize = size;
}

delerrok.mapp.Map.prototype.initStdOptsTable = function() {
	var agencyList = this.agencyData.getAgencyList();

	for (var j = 0; j < agencyList.length; j++) {
		for (var i = 0; i < this.baseRule.length; i++) {
			if(this.baseRule[i].applyRule(this.agencyData.getRidership(agencyList[j], TransitType.TOTAL), this.agencyData.getAgencyRank(agencyList[j]))) {
				this.stdOptsTable[agencyList[j]] = this.baseRule[i].getOptsNo();
			}
		}
	}
};

delerrok.mapp.Map.prototype.initStdOpts = function() {
	for (var k in this.stdOptsTable) {
		this.stdOpts[k] = this.baseOpts[this.stdOptsTable[k]].makeCopy();
		this.stdOpts[k].setCCenter(this.agencyData.getLatitude(k), this.agencyData.getLongitude(k));
		this.stdOpts[k].setCMap(this.gmap);
		this.stdOpts[k].setCZIndex(this.agencyData.getAgencyRank(k));
	}
}

delerrok.mapp.Map.prototype.drawGraph = function(transitType) {
	for (var k in this.stdOpts) {
		this.stdOpts[k].setCRadius(this.calcRadius(this.agencyData.getRidership(k, transitType), this.agencyData.getLatitude(k)));
		this.circles[k] = new google.maps.Circle(this.stdOpts[k]);
	}
}

delerrok.mapp.Map.prototype.changeCircleSize = function(transitType) {
	for (var k in this.circles) {
		this.circles[k].setRadius(this.calcRadius(this.agencyData.getRidership(k, transitType), this.agencyData.getLatitude(k)));
	}
}

delerrok.mapp.Map.prototype.calcRadius = function(radius, latitude) {
	return this.circleSize * Math.sqrt(radius) * Math.cos(latitude * (Math.PI / 180), 2);
};