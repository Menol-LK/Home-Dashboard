function drawChart(chartCanvasId, labelArray, dataArray) {

    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#" + chartCanvasId).get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.


    var mydata = {
        labels: labelArray,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: dataArray
            }
        ]
    };

    var myNewChart = new Chart(ctx).Line(mydata, {
        bezierCurve: true,
        showTooltips: false
    });

}