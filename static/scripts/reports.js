"use strict";

// Selects canvas for pie chart and draws it
function drawPieChart() {
    var ctx = document.getElementById('pieChart');
    new Chart(ctx, {
        "type":"pie",
        "data":{
            "labels":["Food", "Bills", "Entertainment"],
            "datasets":[{
                "label":"Spending ($)",
                "data":[10, 20, 30],
                "backgroundColor":["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
            }]
        }
    });
}

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
                "borderColor":"rgb(75, 192, 192)",
                "lineTension":0.1
            }]
        }
    });
}

function drawBarChart() {
    var ctx = document.getElementById('barChart');
    new Chart(ctx, {
        "type":"bar",
        "data":{
            "labels":["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            "datasets":[{
                "label":"Weekly Savings",
                "data":[10, -5, -5, 10, 5],
                "backgroundColor":["rgba(0,200,0,0.5)", "rgba(200,0,0,0.5)", "rgba(200,0,0,0.5)", "rgba(0,200,0,0.5)", "rgba(0,200,0,0.5)"]
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
