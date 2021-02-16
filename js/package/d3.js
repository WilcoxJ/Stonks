// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myObj = JSON.parse(this.responseText);
//     document.getElementById("demo").innerHTML = myObj[0]["0"];
//   }
// };
// xmlhttp.open("GET", "ospt.php", true);
// xmlhttp.send();





var xhReq = new XMLHttpRequest();
xhReq.open("GET", "inc/getJSON.php", false);
xhReq.send(null);
var serverResponse = xhReq.responseText;
var data = JSON.parse(serverResponse);
//alert(data[0]["USER_ID"]); //


//document.getElementById("demo").innerHTML = data[0]["USER_ID"];

// console.log(data);





// set the dimensions of the canvas
var margin = {top: 10, right: 20, bottom: 150, left: 200},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);



// add the SVG element
var svg = d3.select("#svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
// d3.json("js/package/data.json", function(error, data) {
//     data.forEach(function(d) {
//         d.Letter = d.Letter;
//         d.Freq = +d.Freq;
//     });

// tip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Hours:</strong> <span style='color:red'>" + d.Hours + "</span>";
  })
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.UID; }));
  y.domain([0, d3.max(data, function(d) { return d.Hours; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Hours Worked");

      svg.call(tip);


      
  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.UID); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Hours); })
      .attr("height", function(d) { return height - y(d.Hours); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


