
// Arrays
var individualsObjArray = [];
var pickedIndivudals = [];

// Outer Dimensions
var outerWidth = 1800;
var outerHeight = 500;

//Outer Dimensions individ graph
var outerWidthInd = 1200;
var outerHeightInd = 400

// Margins
var marginLeft = 25;
var marginRight = 25;
var marginTop = 25;
var marginBottom = 25;

// Inner canvas
var innerWidth = outerWidth - marginLeft - marginRight;
var innerHeight = outerHeight - marginTop - marginBottom;


// Other vars
var rMin = 8;
var rMax = 25;
var xCol = "";
var yCol = "artskill";
var rCol = "avgskill";

readData();

function readData() {
	d3.csv("/IVIS19-group-data.csv").then(function(data) {
	  data.forEach(function(d) {
		
		var avgSkill = Math.round(((+d.InfoVisSkill + +d.StatSkill + +d.MathSkill + +d.ArtSkill + +d.ComputerSkill + +d.ProgrammingSkill
			+ +d.CompGraphicsSkill + +d.HCISkill + +d.UXSkill + +d.CommunicationSkill + +d.CollabSkill + +d.GitSkill) /12) * 100) / 100;

		//console.log("avgskill for " + d.Name + " is " + avgSkill);

		var IndividualObject = 
			{
				name : d.Name,
				master : d.Master,
				degree : d.Degree,
				interests : d.Interests,
				learn : d.Learn,
				infovisskill: +d.InfoVisSkill,
				statskill : +d.StatSkill,
				mathskill : +d.MathSkill,
				artskill: +d.ArtSkill,
				computerskill : +d.ComputerSkill,
				programmingskill : +d.ProgrammingSkill,
				compgraphicskill : +d.CompGraphicsSkill,
				hciskill : +d.HCISkill,
				uxskill : +d.UXSkill,
				communicationskill : +d.CommunicationSkill,
				collabskill : +d.CollabSkill,
				gitskill : +d.GitSkill,
				avgskill : avgSkill
			}
			individualsObjArray.push(IndividualObject);
	  });
	  //retrieveInterests("Viktor Krum");
	  render(individualsObjArray);
	  //console.log("tre")
	});
}
 
console.log(individualsObjArray);


// Dynamically created SVG and HTML elements, D3 scales, D3 axes and D3 groups

var svg = d3.select("#individuals-list-div").append("svg")
		.attr("id", "individuals-list-svg")
		.attr("width", outerWidth)
		.attr("height", outerHeight);

var g = svg.append("g").attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

var xAxisG = g.append("g").attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g");

var xIndScale = d3.scaleLinear().range([0, innerWidth]);
var yIndScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);
var rIndScale = d3.scaleLinear().range([rMin, rMax]);

var xAxis = d3.axisBottom(xIndScale);
var yAxis = d3.axisLeft(yIndScale);

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "individual-tooltip")				
    .style("opacity", 0);

var divIndDetails = d3.select("#selected-individual").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-wrapper");

var divIndDetailsName = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details name")
	.attr("id", "individual-details-name");
var divIndDetailsAvgSkill = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-avgskill");
var divIndDetailsMaster = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-master");
var divIndDetailsInterests =d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-interests");

// var svgIndidualGraph = d3.select("#individual-details-wrapper").append("svg")
// 		.attr("id", "individual-graph")
// 		.attr("width", outerWidth)
// 		.attr("height", outerHeight);

//d3.axisBottom().tickFormat(function(d){ return d.x;});


function render(dataArray) {
	
	rIndScale.domain(d3.extent(dataArray, function (d) {return d.avgskill; }));
	xAxisG.call(xAxis);
	yAxisG.call(yAxis);

	// Bind data
	var circles = g.selectAll("circle").data(dataArray);

	// Enter
	circles.enter().append("circle")
		.attr("fill", "grey")

	// Update
	.merge(circles)
	    .attr("cx", function(d, i){ return 15 + (30 * i); })
	    .attr("cy", function(d, i){ return yIndScale(d[yCol]); })
	    .attr("r", function(d){ return rIndScale(d[rCol]); })
	    .attr("fill", function(d) {
		    if (d.master === "Computer Science" || d.master === "Data Science") {
		      return "pink";
		    } else if (d.master === "Media Technology") {
		      return "orange";
		    }
		    else {
		    	return "grey";
		    } 
		 })
	    .on("mouseover", function(d) {
	    	div.transition()		
                .duration(200)		
                .style("opacity", .9);
            div.html(d.name + "<br/> AvgSkill: "  + d.avgskill)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })				
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        })
        .on("click", function(d){
			divIndDetailsName.html("Name: " + d.name);
			divIndDetailsAvgSkill.html("Average skill: " + d.avgskill);
			divIndDetailsMaster.html("Major: " + d.master);
			divIndDetailsInterests.html("Interests: " + d.interests);
		});
	// Exit
	circles.exit().remove();

// circle = circle.enter().append("circle") // ENTER
//     .style("fill", "green")
//   .merge(circle) // ENTER + UPDATE
//     .style("stroke", "black");

}


// function generateCircles() {
// 	console.log("genereateCircles() is run.")

// 	var scale = d3.scaleLinear()
// 		.domain([1,10])
// 		.range([100,1]);

// 	var svg = d3.select("#individuals-list-svg")
// 		.attr("id", "individuals-list-svg")
// 		.attr("width", 500)
// 		.attr("height", 500);

// 		//Enter only cares about the number of items in the data array. Does not handle update.

// 	var circles = svg.d3.select("#individuals-list-svg").selectAll("circle")
// 	    .data(individualsObjArray)
// 	    .enter().append("circle")
// 		    .attr("cx", function(d, i){ return 25 + (50 * i); })
// 		    .attr("cy", function(d, i){ return d.artskill; })
// 		    .attr("r", 10)
// 		    .attr("fill", "grey");
// }

	// var x = d3.scaleLinear()
 //    .domain([d3.min(individualsObjArray, function(d){ return d.artskill; }) / 1.05, 
 //        d3.max(individualsObjArray, function(d){ return d.artskill; }) * 1.05])
 //    .range([1, 10]);

	// var y = d3.scaleLinear()
 //    .domain([d3.min(individualsObjArray, function(d){ return d.height; }) / 1.05,
 //        d3.max(individualsObjArray, function(d){ return d.height; }) * 1.05])
 //    .range([10, 1]);
	

function retrieveInterests(name) {
	console.log("asd")
	individualsObjArray.forEach(function(d) {
		if (name === d.name) {
			console.log(name + "'s" + " interests are: " + d.interests);
			return d.interests;
		}
	});
}

//Should be done more D3-idiomatic but canät be bothered right now
function selectOption() {
	var selection = document.getElementById("selectMenu").value;
	yCol = selection;
	console.log(yCol);
	render(individualsObjArray);
}

function reRenderPlot() {
}
