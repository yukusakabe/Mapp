if (!this.delerrok) delerrok = {};
if (!this.delerrok.mapp) delerrok.mapp = {};

document.write('<script src="http://maps.google.com/maps/api/js?v=3&sensor=false" type="text/javascript" charset="UTF-8"></script>');

document.write('<script type="text/javascript" src="./js/Definition.js" charset="shift_jis"></script>');

document.write('<script type="text/javascript" src="./js/controller/AgencyTable.js"></script>');
document.write('<script type="text/javascript" src="./js/controller/CircleOverlay.js"></script>');
document.write('<script type="text/javascript" src="./js/controller/InfoWindow.js"></script>');

document.write('<script type="text/javascript" src="./js/model/Agency.js"></script>');
document.write('<script type="text/javascript" src="./js/model/AgencyData.js"></script>');
document.write('<script type="text/javascript" src="./js/model/CircleOpts.js"></script>');
document.write('<script type="text/javascript" src="./js/model/DataReader.js"></script>');
document.write('<script type="text/javascript" src="./js/model/GraphRule.js"></script>');
document.write('<script type="text/javascript" src="./js/model/ListData.js"></script>');

var gmap = null;
var agencyData = null;
var circleOverlay = null;
var infoWindows = {};
var nowWindow = null;
var agencyTable = null;
var scrollObj = null

window.onload = function() {
	var defLatlng = new google.maps.LatLng(36.1699412, -115.13983, 4);
	var defOpts = {
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: defLatlng,
		scaleControl: true
	};
	
	gmap = new google.maps.Map(document.getElementById('gmap'), defOpts);
	
	var controlDiv = document.createElement('div');
	var graphHeader = document.getElementById('graphHeader');
	controlDiv.appendChild(graphHeader);
	gmap.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);

	agencyData = delerrok.mapp.readAgencyData();
	agencyData.initRank();
	
	agencyTable = new delerrok.mapp.AgencyTable(agencyData, document.getElementById('tableBody'));
	agencyTable.init(null, 0);
	agencyTable.sortTable(6, false);
	agencyTable.makeTable();
	
	circleOverlay = new delerrok.mapp.CircleOverlay(gmap, agencyData, 20);
	circleOverlay.drawGraph(20, TransitType.TOTAL);

	var agencyList = agencyData.getAgencyList();
	
	for (k in agencyList) {
		delerrok.mapp.makeInfo(k, circleOverlay.getCircle(k), "<font size='5'>" + agencyData.getName(k) + "<br>" + agencyData.getAbbr(k) + "<br>" + agencyData.getCity(k) + "," + agencyData.getState(k) + "<br>" + agencyData.getCountry(k) + "<br>" + agencyData.getRidership(k, 0) + "</font>");
	}
	
}

delerrok.mapp.makeInfo = function(id, circle, infoText) {
	var agencyList = agencyData.getAgencyList();
	
	var infowindow = new google.maps.InfoWindow({
		content: infoText, position: circle.getCenter(), disableAutoPan: true
	});
	
	infoWindows[id] = infowindow;
	
	google.maps.event.addListener(circle, 'click', function(evt) {
		infowindow.open(gmap);
		nowWindow = infowindow;
		delerrok.mapp.panTo(id);
		circleOverlay.hideAllCircle();
		circleOverlay.showCircle(id);
		location.href = '#' + id;
	});
	
	google.maps.event.addListener(infowindow, 'closeclick', function(evt) {
		circleOverlay.showAllCircle();
	});
};

delerrok.mapp.changeTransitType = function(transitType) {
	agencyTable.init(null, transitType);
	agencyTable.sortTable(6, false);
	agencyTable.deleteTable();
	agencyTable.makeTable();
	circleOverlay.changeTransitType(transitType);
};


delerrok.mapp.changeCircleSize = function(size) {
	circleOverlay.changeCircleSize(size);
};

delerrok.mapp.clickAgencyTable = function(id) {
	if (nowWindow != null) {
		nowWindow.close();
	}
	var agencyId = document.getElementById(id).getAttribute('data-AgencyId');
	infoWindows[id].open(gmap);
	nowWindow = infoWindows[id];
	delerrok.mapp.panTo(agencyId);
	circleOverlay.hideAllCircle();
	circleOverlay.showCircle(agencyId);
}

delerrok.mapp.panTo = function(id) {
	var radius = circleOverlay.getCurrentRadius(id);

	gmap.panTo(new google.maps.LatLng(agencyData.getLatitude(id), agencyData.getLongitude(id)));
};

delerrok.mapp.changeTable = function(id) {
	agencyTable.changeTable(document.getElementById(id).getAttribute('deta-SortKey'));
}
