if (!this.delerrok) delerrok = {};
if (!this.delerrok.mapp) delerrok.mapp = {};

document.write('<script type="text/javascript" src="./js/Definition.js" charset="shift_jis"></script>');

document.write('<script type="text/javascript" src="./js/controller/Map.js"></script>');

document.write('<script type="text/javascript" src="./js/model/Agency.js"></script>');
document.write('<script type="text/javascript" src="./js/model/AgencyData.js"></script>');
document.write('<script type="text/javascript" src="./js/model/CircleOpts.js"></script>');
document.write('<script type="text/javascript" src="./js/model/DataReader.js"></script>');
document.write('<script type="text/javascript" src="./js/model/GraphRule.js"></script>');

var mapp = null;
var agencyData = null;

window.onload = function() {
	agencyData = delerrok.mapp.readAgencyData();
	agencyData.initRank();
	
	mapp = new delerrok.mapp.Map(agencyData, 20, 36.1699412, -115.13983, 4);
	mapp.drawGraph(TransitType.TOTAL);
};

delerrok.mapp.changeTransitType = function(transitType) {
	mapp.changeCircleSize(transitType);
};


delerrok.mapp.changeCircleSize = function(size) {
	mapp.setCircleSize(size);
	mapp.changeCircleSize(document.getElementById('transitSelect').value);
};
