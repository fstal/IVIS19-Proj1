
var individualsObjArray = [];
var pickedIndivudals = [];
var outerWidth = 1500;
var outerHeight = 500;
var circleRadius = 20;
var rMin = 8;
var rMax = 30;
var xCol = "";
var yCol = "artskill";
var rCol = "avgskill";

d3.csv("/IVIS19-group-data.csv").then(function(data) {
  data.forEach(function(d) {
	
	var avgSkill = Math.round(((+d.InfoVisSkill + +d.StatSkill + +d.MathSkill + +d.ArtSkill + +d.ComputerSkill + +d.ProgrammingSkill
		+ +d.CompGraphicsSkill + +d.HCISkill + +d.UXSkill + +d.CommunicationSkill + +d.CollabSkill + +d.GitSkill) /12) * 100) / 100;

	console.log("avgskill for " + d.Name + " is " + avgSkill);

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
  retrieveInterests("Viktor Krum");
  render(individualsObjArray);
  console.log("tre")
});
 
console.log(individualsObjArray);



var svg = d3.select("#individuals-list-div").append("svg")
		.attr("id", "individuals-list-svg")
		.attr("width", outerWidth)
		.attr("height", outerHeight);

var xIndScale = d3.scaleLinear()
	.range([0, outerWidth]);

var yIndScale = d3.scaleLinear()
	.domain([0, 10])
	.range([outerHeight, 0]);

var rIndScale = d3.scaleLinear()
	.range([rMin, rMax]);
	//.domain([3.25,7.25])



function render(dataArray) {
	rIndScale.domain(d3.extent(dataArray, function (d) {return d.avgskill; }));

	// Bind data
	var circles = svg.selectAll("circle").data(dataArray);

	// Enter
	circles.enter().append("circle")
		.attr("fill", "grey")

	// Update
	.merge(circles)
	    .attr("cx", function(d, i){ return 25 + (50 * i); })
	    .attr("cy", function(d, i){ return yIndScale(d[yCol]); })
	    .attr("r", function(d){ return rIndScale(d[rCol]); });

	// Exit
	//circles.exit().remove();

circle = circle.enter().append("circle") // ENTER
    .style("fill", "green")
  .merge(circle) // ENTER + UPDATE
    .style("stroke", "black");

}


function generateCircles() {
	console.log("genereateCircles() is run.")

	var scale = d3.scaleLinear()
		.domain([1,10])
		.range([100,1]);

	var svg = d3.select("#individuals-list-svg")
		.attr("id", "individuals-list-svg")
		.attr("width", 500)
		.attr("height", 500);

		//Enter only cares about the number of items in the data array. Does not handle update.

	var circles = svg.d3.select("#individuals-list-svg").selectAll("circle")
	    .data(individualsObjArray)
	    .enter().append("circle")
		    .attr("cx", function(d, i){ return 25 + (50 * i); })
		    .attr("cy", function(d, i){ return d.artskill; })
		    .attr("r", 10)
		    .attr("fill", "grey");
}

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



	