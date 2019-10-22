"use strict"

function calcTotal() {
	var table = document.getElementById('tb');
    var body = table.tBodies[0]
    var rows = body.rows
	
	var total = 0;
	
	for(var i = 2; i < rows.length-1;i++) {
		if(rows[i].cells[1].innerHTML == "Income") {
			total += parseFloat(rows[i].cells[2].innerHTML.replace("$", ""));
		} else {
			total -= parseFloat(rows[i].cells[2].innerHTML.replace("$", ""));
		}
	}
	
	var htotal = document.getElementById('total');
	htotal.innerHTML = '$' + total;
}

function deleteRow(num) {
	var table = document.getElementById('tb');
	var $row = $(document.getElementById('r' + num)).closest("tr"); //Find row
	
	//Remove from db, then:
	$row.remove();
	calcTotal();
}

function addRowsFromDatabase() {
	var table = document.getElementById('tb');
    var body = table.tBodies[0]
    var rows = body.rows
    
	var total = 0;
	
	//Get Data from database :
	
	//For each item in database for user
	//for(var i = 0; i < db.length; i++;) {
	var td1 = "test"
	var td2 = "Spending"
	var td3 = 1
	
	var i = 0;
	
    // pick the last and prepend
	rows[rows.length - 1].insertAdjacentHTML('beforebegin', "<td>" + td1 + "</td><td>" + td2 + "</td><td>$" + td3 + "</td><td><form onsubmit='deleteRow(" + i + ")' id='r" + i + "'><button>Delete</button></form></td>");
	// }
	
	calcTotal();
}

function addTableRow() {
	var table = document.getElementById('tb');
    var body = table.tBodies[0]
    var rows = body.rows
		
	var str = $('form').serialize();
	var ar = str.replace("bname=", "").replace("&pvalue=", ",").replace("&type=", ",").split(',');
	
	//add to database:
	var td1 = ar[0];
	var td2 = ar[2];
	var td3 = ar[1];
	
	var i = rows.length - 2;
	
	rows[rows.length - 1].insertAdjacentHTML('beforebegin', "<td>" + td1 + "</td><td>" + td2 + "</td><td>$" + td3 + "</td><td><form onsubmit='deleteRow(" + i + ")' id='r" + i + "'><button>Delete</button></form></td>");
	calcTotal();
}

function init() {
	addRowsFromDatabase();
}

window.onload = init;