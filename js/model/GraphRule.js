/*
*GraphRule Class
*/
delerrok.mapp.GraphRule = function(formula, optsNo) {
	this.formula = formula;
	this.optsNo = optsNo;
}

delerrok.mapp.GraphRule.prototype.applyRule = function(ridership, rank) {
	return eval(this.formula);
};

delerrok.mapp.GraphRule.prototype.getOptsNo = function() {
	return this.optsNo;
};