var oldPosition = null;
var calculatorObj = {
sRegex: eval("/\\./g"),
	bsmv		: 0,
	calcType	: 1,
	_month		: null,
	_interest	: null,
	_perMonth	: null,
	_total		: null,
	

	setElements : function (monthElement, interestElement, perMonthElement, totalElement, ratios, calcType) {
		if(monthElement)			this._month		= monthElement;
		if(interestElement)			this._interest	= interestElement;
		if(perMonthElement)			this._perMonth	= perMonthElement;
		if(totalElement)			this._total		= totalElement;
		var creditPlanDurationDefault = 120;

	},
	
	setCreditPlan: function () {
      	var k = this._month.value;
      	var maxMonth = 240;
      	if(k > maxMonth) {
      		this._month.value = maxMonth;
      		this.setCreditPlan();
      		return false;
      	}
      	var total		= this.regReplace(this._total.value);
      	/* this._interest.value = (total >= 100000) ? this._ratios[1] : this._ratios[0]; */
		this.recalcRatio();
		this.display();
	},
	
	recalcRatio: function () {
		var k = this._month.value;
		var total		= this.regReplace(this._total.value);


	},
	
	display: function () {		
		var month		= this._month.value;
		var interest	= this._interest.value;
		var interest2	= ((interest/100) * (1 + this.bsmv));
		
		var total		= this.regReplace(this._total.value);
		var perMonth	= (this.regReplace(total) * Math.pow((1+interest2),(month))*interest2)/(Math.pow((1+interest2),(month))-1);
		this._perMonth.innerHTML = this.numberFormat(Math.round(perMonth).toString(),0,false,false,true);
			

	},
	
	regReplace: function (org) {
		return org.replace(this.sRegex, '');
},

	
	getSelectionStart: function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate()
			r.moveEnd('character', o.value.length)
			if (r.text == '') return o.value.length
			return o.value.lastIndexOf(r.text)
		} else return o.selectionStart
	},


	setCaretTo: function(obj, pos) { 
    if(obj.createTextRange) { 
        var range = obj.createTextRange(); 
        range.move("character", pos); 
        range.select(); 
    } else if(obj.selectionStart) { 
        obj.focus(); 
        obj.setSelectionRange(pos, pos); 
    } 
},

	numberFormat: function (item, decimalNumber, zero, parent, boolean) {
		var ku = typeof(item) == 'string' ? item : item.value;
		number = this.regReplace(ku);
		if(typeof(item) != 'string') {
			oldPosition = this.getSelectionStart(item);
			}		
		var templateNumber = parseInt(number);
		var iSign = number < 0 ? -1 : 1;
		templateNumber *= Math.pow(10,decimalNumber);
		templateNumber = Math.round(Math.abs(templateNumber))
		templateNumber /= Math.pow(10,decimalNumber);
		templateNumber *= iSign;
		var returnNumber = new String(templateNumber);
		if (!zero && number < 1 && number > -1 && number != 0)
			if (number > 0)
				returnNumber = returnNumber.substring(1, returnNumber.length);
			else
				returnNumber = "-" + returnNumber.substring(2,returnNumber.length);

		if (boolean && (number >= 1000 || number <= -1000)) {
			var iStart = returnNumber.indexOf(".");
			if (iStart < 0)
			iStart = returnNumber.length;
			iStart -= 3;
			while (iStart >= 1) {
				returnNumber = returnNumber.substring(0,iStart) + "." + returnNumber.substring(iStart,returnNumber.length)
				iStart -= 3;
			}
		}
		if (parent && number < 0)
			returnNumber = "(" + returnNumber.substring(1,returnNumber.length) + ")";

		if (returnNumber == 'NaN')
			returnNumber = '';
		return returnNumber;
	}
};
