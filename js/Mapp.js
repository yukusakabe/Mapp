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
var floatWindow = null;
var agencyTable = null;
var scrollObj = null
var barVis = 0;
var filterVis = 0;
var overCt = 0;
var timeoutid = null;

window.onload = function() {
	var defLatlng = new google.maps.LatLng(36.1699412, -115.13983, 4);
	var defOpts = {
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: defLatlng,
		scaleControl: true
	};
	
	gmap = new google.maps.Map(document.getElementById('gmap'), defOpts);
	
	var controlDiv1 = document.createElement('div');
	var graphHeader = document.getElementById('graphHeader');
	controlDiv1.appendChild(graphHeader);
	
	var controlDiv2 = document.createElement('div');
	var showbar = document.getElementById('showbar');
	controlDiv2.appendChild(showbar);
	
	var controlDiv3 = document.createElement('div');
	var textbox = document.getElementById('textbox');
	controlDiv3.appendChild(textbox);
	
	var controlDiv4 = document.createElement('div');
	var filterbox = document.getElementById('filterbox');
	controlDiv4.appendChild(filterbox);
	
	gmap.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv1);
	gmap.controls[google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv2);
	gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv3);
	gmap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(controlDiv4);

	agencyData = delerrok.mapp.readAgencyData();
	agencyData.initRank();
	
	agencyTable = new delerrok.mapp.AgencyTable(agencyData, document.getElementById('tableBody'));
	agencyTable.init(null, 0, null);
	agencyTable.sortTable(6, false);
	agencyTable.makeTable();
	
	circleOverlay = new delerrok.mapp.CircleOverlay(gmap, agencyData, 20);
	circleOverlay.drawGraph(20, TransitType.TOTAL);

	var agencyList = agencyData.getAgencyList();
	
	for (k in agencyList) {	
		delerrok.mapp.makeInfo(k, circleOverlay.getCircle(k), "<font size='5'><table cellspacing='5'>" + 
								"<tr><td nowrap>Name:</td><td>" + agencyData.getName(k) + "</td></tr>" + 
								"<tr><td nowrap>Abbr:</td><td>" + agencyData.getAbbr(k) + "</td></tr>" + 
								"<tr><td nowrap>City, State:</td><td>" + agencyData.getCity(k) + ", " + agencyData.getState(k) + "</td></tr>" + 
								"<tr><td nowrap>Country:</td><td>" + agencyData.getCountry(k) + "</td></tr>" + 
								"<tr><td nowrap>Total Ridership:</td><td align='right'>" + delerrok.mapp.separate(agencyData.getRidership(k, 0)) + "</td></tr>" + 
								"<tr><td nowrap>Bus Ridership:</td><td align='right'>" + delerrok.mapp.separate(agencyData.getRidership(k, 1)) + "</td></tr>" + 
								"<tr><td nowrap>Rail Ridership:</td><td align='right'>" + delerrok.mapp.separate(agencyData.getRidership(k, 2)) + "</td></tr>" + 
								"<tr><td nowrap>Rank:</td><td align='right'>" + agencyData.getRank(k) +"</td></tr></table></font>");
	}
	
	google.maps.event.addListener(gmap, 'click', function(evt) {
		nowWindow.close();
		nowWindow = null;
		circleOverlay.hideAllCircle();
		circleOverlay.showAllCircle(document.getElementById("search").value);
	});
	
	agencyTable.onload = 0;
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
	
	google.maps.event.addListener(circle, 'mouseover', function(evt) {
		if (floatWindow != null && floatWindow != nowWindow) {
			floatWindow.close();
		}
	
		if (nowWindow == null) {
			if (timeoutid != null) {
				window.clearTimeout(timeoutid)
			}
			
			timeoutid = window.setTimeout(delerrok.mapp.showInfo, 600, infowindow);
		}
	});
	
	google.maps.event.addListener(gmap, 'mousemove', function(evt) {
		if (floatWindow != null && floatWindow != nowWindow) {
			floatWindow.close();
			floatWindow = null;
			overCt = 0;
		}
	});
	
	google.maps.event.addListener(infowindow, 'closeclick', function(evt) {
		circleOverlay.hideAllCircle();
		circleOverlay.showAllCircle(document.getElementById("search").value);
		nowWindow = null;
	});
};

delerrok.mapp.showInfo = function(infowindow) {
	infowindow.open(gmap);
	floatWindow = infowindow;
	timeoutid = null;
}

delerrok.mapp.changeTransitType = function() {
	agencyTable.init(null, document.getElementById("transitSelect").value, document.getElementById("search").value);
	agencyTable.sortTable(6, false);
	agencyTable.deleteTable();
	agencyTable.makeTable();
	circleOverlay.hideAllCircle();
	circleOverlay.showAllCircle(document.getElementById("search").value);
	circleOverlay.changeTransitType(document.getElementById("transitSelect").value);
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

delerrok.mapp.separate = function(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

delerrok.mapp.showbar = function(){
	if (barVis == 0) {
		barVis = 1;
		document.getElementById("sidebar").style.width = "540px";
		document.getElementById("sidebarBody").style.width = "540px";
	} else {
		barVis = 0;
		document.getElementById("sidebar").style.width = "0px";
		document.getElementById("sidebarBody").style.width = "0px";
	}
}

delerrok.mapp.showFilter = function(){
	if (filterVis == 0) {
		filterVis = 1;
		document.getElementById("filter").style.width = "540px";
		document.getElementById("filterBody").style.width = "540px";
	} else {
		filterVis = 0;
		document.getElementById("filter").style.width = "0px";
		document.getElementById("filterBody").style.width = "0px";
	}
}

delerrok.mapp.changeGroup = function(id){
	if (nowWindow == null) {
		if (document.group.elements[id].checked) {
			circleOverlay.showGroup(Number(id));
			agencyTable.init(null, document.getElementById("transitSelect").value, document.getElementById("search").value);
			agencyTable.sortTable(6, false);
			agencyTable.deleteTable();
			agencyTable.makeTable();
		} else {
			circleOverlay.hideGroup(Number(id));
			agencyTable.init(null, document.getElementById("transitSelect").value, document.getElementById("search").value);
			agencyTable.sortTable(6, false);
			agencyTable.deleteTable();
			agencyTable.makeTable();
		}
	}
}