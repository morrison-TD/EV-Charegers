var entry ={
  datetime: "1/28/1996",
  city: "dallas",
  state: "tx",
  country: "us",
  shape: "star",
  durationMinutes: "5 mins.",
  comments: "Cowboys win a superbowl, that's alien!."
  };


var tbody = d3.select("tbody");
var row = tbody.append("tr");
Object.values(entry).forEach((value) => {
  row.append("td").text(value);
  });


// from data.js
tableData = data

var tbody = d3.select("tbody");
tableData.forEach((datum) => {
  var row = tbody.append("tr");
  Object.entries(datum).forEach(([_, value]) => {
    var cell = row.append("td").text(value);
  });
});


var dateList = [];
var cityList = [];
var stateList = [];
var countryList =[];
var shapeList = [];

tableData.forEach((datum) => {
// Iterate through each key and value
Object.entries(datum).forEach(([key, value]) =>{
    if (key=== "datetime" ){
        dateList.push(value);
    }
    if (key=== "city" ){
      cityList.push(value);
    }
    if (key=== "state"){
      stateList.push(value);
    }
    if (key=== "country"){
      countryList.push(value);
    }
    if (key=== "shape"){ 
      shapeList.push(value);
    }
  });
});


//  Get the four arrays with unique values

let unique_1 = [...new Set(dateList)]; 
dateList = unique_1;
let unique_2 = [...new Set(cityList)]; 
cityList= unique_2;
let unique_3 = [...new Set(stateList)]; 
stateList= unique_3;
let unique_4 = [...new Set(countryList)]; 
countryList= unique_4;
let unique_5 = [...new Set(shapeList)]; 
shapeList= unique_5;

console.log(dateList);
console.log(cityList);
console.log(stateList);
console.log(countryList);
console.log(shapeList);


d3.select("#datetime-filter")
  .selectAll("#add options")
  .data(dateList)
  .enter()
  .append("option")
  .attr("value", function(d) {
      return d;
    })
  .text(function(d) {
    return d;
  })
  
 
d3.select("#country-filter")
  .selectAll("#add options")
  .data(countryList)
  .enter()
  .append("option")
  .attr("value", function(d) {
      return d;
    })
  .text(function(d) {
    return d;
  });

// Add all state options in dropdown list 
d3.select("#state-filter")
  .selectAll("#add options")  
  .data(stateList)
  .enter()
  .append("option")
  .attr("value", function(d) {
      return d;
    })
  .text(function(d) {
    return d;
  });

// Add all city options in dropdown list 
d3.select("#city-filter")
  .selectAll("#add options")
  .data(cityList)
  .enter()
  .append("option")
  .attr("value", function(d) {
      return d;
    })
  .text(function(d) {
    return d;
  });

// Add all shape options in dropdown list 
d3.select("#shape-filter")
  .selectAll("#add options")
  .data(shapeList)
  .enter()
  .append("option")
  .attr("value", function(d) {
      return d;
    })
  .text(function(d) {
    return d;
  });


// filter function
// Select the five filter input elements and get the values property of the input elements
var selectDatevalue = " ";
var selectCountryvalue = " ";
var selectStatevalue = " ";
var selectCityvalue = " ";
var selectShapevalue = " ";

function mydateFunction() {
selectDatevalue = document.getElementById("datetime-filter").value;
if (selectDatevalue >" "){
console.log("I choose "  +  selectDatevalue);}

}

function mycountryFunction() {
var selectCountryvalue = document.getElementById("country-filter").value;
}

function mystateFunction() {
selectStatevalue = document.getElementById("state-filter").value; 
}

function mycityFunction() {
selectCityvalue = document.getElementById("city-filter").value;
}

function myshapeFunction() {
selectShapevalue = document.getElementById("shape-filter").value;
}


// Select the submit button
var submit = d3.select("#filter-btn"); 

submit.on("click", function() {
//  Delete the previous html table rows 
d3.select("tbody")
  .selectAll("tr")
  .remove(); 
  
// Prevent the page from refreshing
d3.event.preventDefault();


//   Filte the table by different filters
var filteredData = tableData;
if (selectDatevalue != " " && filteredData){
 filteredData = filteredData.filter(filteredData => filteredData.datetime === selectDatevalue);
 }
if (selectCountryvalue !=" "  && filteredData){
 filteredData = filteredData.filter(filteredData => filteredData.country === selectCountryvalue);
 }
if (selectStatevalue !=" " && filteredData){
 filteredData = filteredData.filter(filteredData => filteredData.state === selectStatevalue);
 }
if (selectCityvalue !=" " && filteredData){
 filteredData = filteredData.filter(filteredData => filteredData.city === selectCityvalue);
 }
if (selectShapevalue!=" " && filteredData){
 filteredData = filteredData.filter(filteredData => filteredData.shape === selectShapevalue);
}


var tbody = d3.select("tbody");
filteredData.forEach((datum) => {
 var row = tbody.append("tr");
 Object.entries(datum).forEach(([_, value]) => {
 var cell = row.append("td").text(value);
     });
 });

 
});


var submit1 = d3.select("#reset-btn");

submit1.on("click", function() {
  //  Delete the previous html table rows 
  d3.select("tbody")
    .selectAll("tr")
    .remove(); 
    
  // Prevent the page from refreshing
  d3.event.preventDefault();

  var tbody = d3.select("tbody");
  tableData.forEach((datum) => {
     var row = tbody.append("tr");
     Object.entries(datum).forEach(([_, value]) => {
     var cell = row.append("td").text(value);
       });
   });
 
   
});



