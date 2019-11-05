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
	var bvalue = Math.round(parseFloat(ar[1]) * 100) / 100;
	
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
    
    //var ar = db.toString().replace(/[\[\(]|[']|[\)\]]|[ ]/g, "").split(',');
    if(db.toString() != "") {
        var ar = db.toString().trim().replace(/,$/g,"").split(',');

        //For each item in database for user
        for(var i = 0; i < ar.length/5; i++) {
        var bname = ar[i*5 + 1]
        var btype = ar[i*5 + 2]
        var bvalue = ar[i*5 + 3]
        
        // pick the last and prepend
        rows[rows.length - 1].insertAdjacentHTML('beforebegin', "<td>" + bname + "</td><td>" + btype + "</td><td>$" + bvalue + "</td><td><form onsubmit='deleteRow(" + i + ")' id='r" + i + "'><button>Delete</button></form></td>");
        }
        }
	
	calcTotal();
}

function init() {
	addRowsFromDatabase();
}

window.onload = init;