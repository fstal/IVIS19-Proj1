
// Arrays
var individualsObjArray = [];
var individualsObjArrayOrigin = [];
var pickedIndivudals = [];

//Groups
var grp1 = [];
var grp2 = [];
var grp3 = [];
var grp4 = [];
var grp5 = [];
var grp6 = [];
var grp7 = [];
var grp8 = [];
var grp9 = [];
var grp10 = [];


// Outer Dimensions
var outerWidth = 920;
var outerHeight = 300;

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
var rMin = 8; // r is for radius
var rMax = 25;
var xCol = "";
var yCol = "artskill";
var rCol = "avgskill";
var activeGroup = 1;
let transitionDuration = 1750; //in ms

readData();

function readData() {
	d3.csv("IVIS19-Proj1/IVIS19-group-data.csv").then(function(data) {
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
				avgskill : avgSkill,
				selected : false		//relic
			}
			individualsObjArray.push(IndividualObject);
			individualsObjArrayOrigin.push(IndividualObject);
	  });
	  //retrieveInterests("Viktor Krum");
	 	console.log("första")
	  render(individualsObjArray);
	});
}
 
console.log(individualsObjArray);


// Dynamically created SVG and HTML elements, D3 scales, D3 axes and D3 groups

var svg = d3.select("#individuals-list-div").append("svg")
		.attr("id", "individuals-list-svg")
		.attr("width", outerWidth)
		.attr("height", outerHeight)
		.attr("position", "absolute");

var g = svg.append("g").attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

var xAxisG = g.append("g").attr("transform", "translate(0," + innerHeight + ")"); //putting x-axis on bottom of plot
var yAxisG = g.append("g");

var xIndScale = d3.scaleLinear().range([0, innerWidth]);
var yIndScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);
var rIndScale = d3.scaleLinear().range([rMin, rMax]);

var xAxis = d3.axisBottom(xIndScale).tickSize(0).tickFormat("");;
var yAxis = d3.axisLeft(yIndScale);


var divTooltip = d3.select("body").append("div")	 // Define the div for the tooltip
    .attr("class", "individual-tooltip")				
    .style("opacity", 0);

var divIndDetails = d3.select("#individuals-list-div").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-wrapper");
var divIndDetailsName = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details name")
	.attr("id", "individual-details-name")
	.html("Name:");
var divIndDetailsAvgSkill = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-avgskill")
	.html("AvgSkill:");
var divIndDetailsMaster = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-master")
	.html("Master:");
var divIndDetailsInterests = d3.select("#individual-details-wrapper").append("div")
	.attr("class", "individual-details")
	.attr("id", "individual-details-interests")
	.html("Interest:");
var btnIndDetails = d3.select("#individual-details-wrapper").append("button")
	.attr("class", "individual-details")
	.attr("id", "individual-details-button")
	.attr("value", "")
	.attr("onclick", "addToGroup(this.value, this.groupNum-value)")
	.attr("groupNum-value", "")
	.html("Add to group");

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
	circles.enter().append("circle") //just being fancy, wanting the first transition to origin from middle of graph
		.attr("cx", innerWidth / 2)
		.attr("cy", innerHeight / 2)
		.attr("r", 0)

	// Update
	.merge(circles)
		.transition().duration(transitionDuration).delay(function(d, i){ return (20 * i); })
	    .attr("cx", function(d, i){ return 12 + (15 * i); })
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
	    .attr("selected", "false"); //datum??
	    circles
	    .on("mouseover", function(d) {
	    	console.log("123")
	    	divTooltip.transition()		
                .duration(175)		
                .style("opacity", .85);
            divTooltip.html(d.name + "<br/> AvgSkill: "  + d.avgskill)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
            d3.select(this)
            	.style("stroke", "black")	
            })				
        .on("mouseout", function(d) {		
            divTooltip.transition()		
                .duration(500)		
                .style("opacity", 0);
            d3.select(this)
            	.style("stroke", "none")		
        })
        .on("click", function(d){
			divIndDetailsName.html("Name: " + d.name);
			divIndDetailsAvgSkill.html("Average skill: " + d.avgskill);
			divIndDetailsMaster.html("Major: " + d.master);
			divIndDetailsInterests.html("Interests: " + d.interests);
			btnIndDetails.attr("value", d.name);
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
	var selection = document.getElementById("selectMenu");
	var selectionValue = selection.value;
	var selectionName = selection.options[selection.selectedIndex].text;
	document.getElementById("individuals-headline").innerHTML = selectionName + " skill";
	yCol = selectionValue;
	render(individualsObjArray);
}
function setGroupNum(groupNum) {
	btnIndDetails.attr("groupnum-value", groupNum);
	activeGroup = groupNum;
}

function addToGroup(name, groupNum) {
	if (convertToGroup(groupNum).length < 7 && IndividualObject.length > 0) {
		convertToGroup(groupNum).push("123");
		//console.log("längden på grupp " + groupNum + "är " convertToGroup(groupNum).length);
	}

}
function convertToGroup(num) {
	if (num === 1) {return grp1}
	else if (num === 2) {return grp2}
	else if (num === 3) {return grp3}
	else if (num === 4) {return grp4}
	else if (num === 5) {return grp5}
	else if (num === 6) {return grp6}
	else if (num === 7) {return grp7}
	else if (num === 8) {return grp8}
	else if (num === 9) {return grp9}
	else if (num === 10) {return grp10}
	else {return [1,2,3,4,5,6,7,8,9]}
}

