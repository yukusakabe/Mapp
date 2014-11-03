/*
*AgencyTable Class
*/
delerrok.mapp.AgencyTable = function(agencyData, tbody) {
	this.agencyData = agencyData;
	this.tableData = [];

	this.thead = null;
	this.tbody = tbody;
	
	this.nowSortKey = null;
	this.nowOrder = true;
	this.nowSelect = null;
	this.onload = 1;
}

delerrok.mapp.AgencyTable.prototype.init = function(mapType, transitType, str) {
	var agencyList = this.agencyData.getAgencyList();
	
	this.tableData = [];

	for (var k in agencyList) {
		if (this.onload == 0) {
			if (document.group.elements[this.agencyData.getGroup(k)].checked) {
				if (str != null) {
					if (this.agencyData.getName(k).toLowerCase().indexOf(str.toLowerCase()) != -1 || this.agencyData.getCity(k).toLowerCase().indexOf(str.toLowerCase()) != -1) {
						this.tableData.push([this.agencyData.getId(k), this.agencyData.getName(k), this.agencyData.getAbbr(k), this.agencyData.getCity(k), this.agencyData.getState(k), this.agencyData.getCountry(k), this.agencyData.getRidership(k, transitType)]);
					}
				} else {
					this.tableData.push([this.agencyData.getId(k), this.agencyData.getName(k), this.agencyData.getAbbr(k), this.agencyData.getCity(k), this.agencyData.getState(k), this.agencyData.getCountry(k), this.agencyData.getRidership(k, transitType)]);
				}
			}
		} else {
			if (str != null) {
				if (this.agencyData.getName(k).toLowerCase().indexOf(str.toLowerCase()) != -1 || this.agencyData.getCity(k).toLowerCase().indexOf(str.toLowerCase()) != -1) {
					this.tableData.push([this.agencyData.getId(k), this.agencyData.getName(k), this.agencyData.getAbbr(k), this.agencyData.getCity(k), this.agencyData.getState(k), this.agencyData.getCountry(k), this.agencyData.getRidership(k, transitType)]);
				}
			} else {
				this.tableData.push([this.agencyData.getId(k), this.agencyData.getName(k), this.agencyData.getAbbr(k), this.agencyData.getCity(k), this.agencyData.getState(k), this.agencyData.getCountry(k), this.agencyData.getRidership(k, transitType)]);
			}
		}
	}
};

delerrok.mapp.AgencyTable.prototype.sortTable = function(sortKey, order) {
	this.nowSortKey = sortKey;

	switch (sortKey) {
		case SortKey.ID:
		case SortKey.RIDERSHIP:
			this.tableData.sort(function(a, b) {
				if (order == true) {
					return (a[sortKey] - b[sortKey]);
				} else {
					return (b[sortKey] - a[sortKey]);
				}	
			});
			break;
			
		case SortKey.NAME:
		case SortKey.ADDR:
		case SortKey.CITY:
		case SortKey.STATE:
		case SortKey.COUNTRY:
			this.tableData.sort(function(a, b) {
				if (order == true) {
					if(a[sortKey] > b[sortKey])  return 1;
					if(a[sortKey] < b[sortKey])  return -1;
				} else {
					if(a[sortKey] > b[sortKey])  return -1;
					if(a[sortKey] < b[sortKey])  return 1;
				}	
			});
			break;
	}
};

delerrok.mapp.AgencyTable.prototype.createTdElement = function(txt, type) {
	var tdElm = document.createElement("td");
	switch (type) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			tdElm.setAttribute('class', 'tdBodyL');
			break;
		
		case 0:
		case 6:
			tdElm.setAttribute('class', 'tdBodyR');
			break;
			

			tdElm.setAttribute('class', 'tdBodyC');
			break;
	}
	
	var divElm = document.createElement("div");
	divElm.setAttribute('class', 'tableElmDiv');
	divElm.setAttribute('title', txt);
	var txtObj = document.createTextNode(txt);
	divElm.appendChild(txtObj);
	tdElm.appendChild(divElm);
	return tdElm;
};

delerrok.mapp.AgencyTable.prototype.createTrElement = function(data) {
	var trElm = document.createElement('tr');
	trElm.setAttribute('id', data[0]);
	trElm.setAttribute('data-AgencyId', data[0]);
	trElm.setAttribute('class', 'trBody');
	trElm.setAttribute('onClick', 'delerrok.mapp.clickAgencyTable(this.id)');
	trElm.appendChild(this.createTdElement(data[1], 1));
	trElm.appendChild(this.createTdElement(data[2], 2));
	trElm.appendChild(this.createTdElement(data[3], 3));
	trElm.appendChild(this.createTdElement(data[4], 4));
	trElm.appendChild(this.createTdElement(data[5], 5));
	trElm.appendChild(this.createTdElement(this.separate(data[6]), 6));
	return trElm;	
};

delerrok.mapp.AgencyTable.prototype.createTable  = function() {
	for (var i = 0; i < this.tableData.length; i++) {
		this.tbody.appendChild(this.createTrElement(this.tableData[i]));
	}
}

delerrok.mapp.AgencyTable.prototype.makeTable = function(sortKey, order) {
	this.nowSortKey = sortKey;
	this.nowOrder = order;
	this.sortTable(sortKey, order);

	this.createTable();
}

delerrok.mapp.AgencyTable.prototype.deleteTable = function() {
	for (var i = this.tbody.childNodes.length - 1; i >= 0; i--) {
		this.tbody.removeChild(this.tbody.childNodes[i]);
	}
}

delerrok.mapp.AgencyTable.prototype.changeTable = function(sortKey) {
	if (sortKey == this.nowSortKey) {
		this.nowOrder = !this.nowOrder;
	} else {
		this.nowSortKey = sortKey;
		this.nowOrder = true;
	}
	
	this.sortTable(Number(this.nowSortKey), this.nowOrder);
	this.deleteTable();
	this.createTable();
}

delerrok.mapp.AgencyTable.prototype.separate = function(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}