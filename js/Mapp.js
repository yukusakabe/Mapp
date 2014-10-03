document.write('<script src="http://maps.google.com/maps/api/js?v=3&sensor=false" type="text/javascript" charset="UTF-8"></script>');
document.write('<script type="text/javascript" src="./js/Agency.js"></script>');
document.write('<script type="text/javascript" src="./js/DataReader.js"></script>');
document.write('<script type="text/javascript" src="./js/Definition.js" charset="shift_jis"></script>');
document.write('<script type="text/javascript" src="./js/Drawer.js"></script>');
document.write('<script type="text/javascript" src="./js/RidershipGraph.js"></script>');
document.write('<script type="text/javascript" src="./js/RidershipTable.js"></script>');

if (!this.delerrok) delerrok = {};
if (!this.delerrok.maps) delerrok.maps = {};

gmap = null;
currentInfoWindow = null;
ridershipGraph = null;

function getMainMap() {
	return gmap;
}

function setMainMap(map) {
	gmap = map;
}

function getCurrentInfoWindow() {
	return currentInfoWindow;
}

function setCurrentInfoWindow(infoWindow) {
	currentInfoWindow = infoWindow;
}

function getRidershipGraph() {
	return ridershipGraph;
}

function setRidershipGraph(graph) {
	ridershipGraph = graph;
}

function init() {
	var defLatlng = new google.maps.LatLng(36.1699412, -115.13983);
	var defOpts = {
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: defLatlng
	};
	
	setMainMap(new google.maps.Map(document.getElementById('gmap'), defOpts));
	
	var agency = readAgency();
	var ridershipTable = readRidershipTable();
	var ruleList = readRidershipGraphRuleList();
	
	setYearSelect(ridershipTable.getYearList());
		
	setRidershipGraph(new RidershipGraph(getMainMap(), agency, ridershipTable, ruleList, 20));
	getRidershipGraph().drawGraph(document.getElementById('yearSelect').value, document.getElementById('transitSelect').value);
	
	google.maps.event.addListener(getMainMap(), 'click', function() {
		if (currentInfoWindow) {
			currentInfoWindow.close();
		}
	});
}

function changeGraph() {
	getRidershipGraph().drawGraph(document.getElementById('yearSelect').value, document.getElementById('transitSelect').value);
}

function changeSize(size) {
	getRidershipGraph().changeSize(size);
}

function setYearSelect(yearList) {
	var select = document.getElementById('yearSelect');
	
	for (var i = 0; i < yearList.length; i++) {
		var option =  document.createElement('option');
		option.setAttribute('value', yearList[i]);
		option.innerHTML = yearList[i];
		select.appendChild(option);
	}
}

google.maps.event.addDomListener(window, 'load', init);