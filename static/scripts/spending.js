"use strict"


//Gets info from form and calculates if the user lost or saved money
function calcSaved() {	
	var ar = $('form').serialize().replace(/csrfmiddlewaretoken=[A-Za-z0-9]*&/g, "").replace("wage=", "").replace("&allowance=", ",").replace("&food=", ",").replace("&phone=", ",").replace("&utilities=", ",").replace("&rent=", ",").replace("&internet=", ",").split(",");
	
	var total = 0;

	for(var i = 0;i<ar.length;i++) {
		if(ar[i] == "") {
			ar[i]=0;
		}
	}
	
	//Wage and Allowance
	total += parseFloat(ar[0]);
	total += parseFloat(ar[1]);
	
	for(var i = 2;i < ar.length;i++) {
		total -= parseFloat(ar[i]);
	}
	
	var txtSaved = document.getElementById('saved');

	if(total > 0) {
		txtSaved.innerHTML = "This Week You Saved: $" + Math.round(total * 100) / 100;
	} else {
		txtSaved.innerHTML = "This Week You Lost: $" + Math.round(total*-1 * 100) / 100;
	}
}

//Gets the date for the current week
function weekDates() {
	var txt = document.getElementById('txtd');
	
	var curr = new Date; // get current date
	var first = curr.getDate() - curr.getDay(); // First day of week
	var last = first + 7; // last day

	var firstday = new Date(curr.setDate(first));
	var lastday = new Date(curr.setDate(last));
	
	var firstformat = firstday.getDate() + "/" + (parseInt(firstday.getMonth()) + 1)  + "/" + firstday.getFullYear();
	var lastformat = lastday.getDate() + "/" + (parseInt(lastday.getMonth()) + 1) + "/" + lastday.getFullYear();
	
	txt.innerHTML = "<b>Input this Weeks Values (" + firstformat + "-" + lastformat + ")</b>";
}

function init() {
	weekDates();
}

window.onload = init;