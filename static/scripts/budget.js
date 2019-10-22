"use strict"

//Calculates total from table and adds it to the table
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
	htotal.innerHTML = '$' + Math.round(total * 100) / 100;
}

//Deletes a row from the table
function deleteRow(num) {
	var table = document.getElementById('tb');
	var $row = $(document.getElementById('r' + num)).closest("tr"); //Find row
	
	//Remove from db, then:
	$row.remove();
	calcTotal();
}

//Gets info from form and adds it to the table
function addTableRow() {
	var table = document.getElementById('tb');
    var body = table.tBodies[0]
    var rows = body.rows
		
	var str = $('form').serialize();
	var ar = str.replace("bname=", "").replace("&pvalue=", ",").replace("&type=", ",").split(',');
	
	//add to database: 
	var bname = ar[0];
	var btype = ar[2];
	var bvalue = ar[1];
	
	var i = rows.length - 2;
	
	rows[rows.length - 1].insertAdjacentHTML('beforebegin', "<td>" + bname + "</td><td>" + btype + "</td><td>$" + bvalue + "</td><td><form onsubmit='deleteRow(" + i + ")' id='r" + i + "'><button>Delete</button></form></td>");
	calcTotal();
}

//Add data from database to table
function addRowsFromDatabase() {
	var table = document.getElementById('tb');
    var body = table.tBodies[0]
    var rows = body.rows
    
	var total = 0;
	
	//Get Data from database :
	
	//For each item in database for user
	//for(var i = 0; i < db.length; i++;) {
	var bname = "test"
	var btype = "Spending"
	var bvalue = 1
	
	var i = 0;
	
    // pick the last and prepend
	rows[rows.length - 1].insertAdjacentHTML('beforebegin', "<td>" + bname + "</td><td>" + btype + "</td><td>$" + bvalue + "</td><td><form onsubmit='deleteRow(" + i + ")' id='r" + i + "'><button>Delete</button></form></td>");
	// }
	
	calcTotal();
}

function init() {
	addRowsFromDatabase();
}

window.onload = init;