"use strict";

// Defines colours
var red = "rgba(200,0,0,0.5)";
var green = "rgba(0,200,0,0.5)";

// Selects canvas for pie chart and draws it
function drawPieChart() {
    if(db.toString() != "") {
        var ar = db.toString().trim().replace(/,$/g,"").split(',');
        var itemNames = [];
        var itemValues = [];
        var itemColours = [];

        // Put user's budget item details into arrays
        for(var i = 0; i < ar.length/5; i++) {
            var bname = ar[i*5 + 1];
            var btype = ar[i*5 + 2];
            var bvalue = ar[i*5 + 3];
            
            itemNames.push(bname);
            itemValues.push(bvalue);
            
            if (btype == "Income") {
                itemColours.push(green);
            } else {
                itemColours.push(red);
            }
        }

        var ctx = document.getElementById('pieChart');
        new Chart(ctx, {
            "type":"pie",
            "data":{
                "labels":itemNames,
                "datasets":[{
                    "label":"Spending ($)",
                    "data":itemValues,
                    "backgroundColor":itemColours
                }]
            }
        });
    }
}

// Selects canvas for line chart and draws it
function drawLineChart() {
    var ctx = document.getElementById('lineChart');
    new Chart(ctx, {
        "type":"line",
        "data":{
            "labels":["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            "datasets":[{
                "fill":false,
                "label":"Total Savings ($)",
                "data":[10, 5, 0, 10, 15],
                "borderColor":green,
                "backgroundColor":green,
                "lineTension":0.1
            }]
        }
    });
}

// Selects canvas for bar chart and draws it
function drawBarChart() {
    var ctx = document.getElementById('barChart');
    new Chart(ctx, {
        "type":"bar",
        "data":{
            "labels":["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            "datasets":[{
                "label":"Weekly Savings ($)",
                "data":[10, -5, -3, 7, 5],
                "backgroundColor":[green, red, red, green, green]
            }]
        }
    });
}

function init() {
    drawPieChart();
    drawLineChart();
    drawBarChart();
}

window.onload = init;
