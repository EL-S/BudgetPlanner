"use strict";

// Selects canvas for pie chart and draws it
function drawPieChart() {
    var ctx = document.getElementById('pieChart');
    new Chart(ctx, {
        "type":"pie",
        "data":{
            "labels":["Food", "Bills", "Entertainment"],
            "datasets":[{
                "label":"Spending",
                "data":[10, 20, 30],
                "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"]
            }]
        }
    });
}

function init() {
    drawPieChart();
}

window.onload = init;
