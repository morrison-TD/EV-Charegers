//Plotly map, uncomment

Plotly.d3.csv("/data/station_data.csv",
	
	function(err, rows) {
		function unpack(rows, key) {
			return rows.map(function(row) {
				return row[key];
			});
		}
        map = document.getElementById('map-example-container');
		var data = [
			{
				type: "scattermapbox",
                text: unpack(rows, "City"),
                text: unpack(rows, "Station_Name"),
				        lon: unpack(rows, "Longitude"),
                lat: unpack(rows, "Latitude"),
                zip: unpack(rows, "ZIP"),
				marker: { color: "multi", size: 4 }
			}
		];

		var layout = {
			dragmode: "zoom",
			mapbox: { style: "open-street-map", center: { lat: 38, lon: -95 }, zoom: 3 },
			margin: { r: 0, t: 0, b: 0, l: 0 }
		};

		Plotly.newPlot(map, data, layout);
})

d3.json("/data/station_data.json", function(data) {
  
  var tableData = data;
  //console.log(tableData)
  // get table references
  var tbody = d3.select("tbody");

  function buildTable(data) {
  // First, clear out any existing data
    tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
    // Append a row to the table body
      var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        var cell = row.append("td");
        cell.text(val);
    });
  });
} 
  // (document).ready(function () {
  // ('#EV-table').DataTable({
  // "scrollX": true,
  // "scrollY": 200,
  // });
  // ('.dataTables_length').addClass('bs-select');
  // });

// Keep Track of all filters
var filters = {};

function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  // Call function to apply all filters and rebuild the table
  // filterTable();

}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData)
// console.log(tableData);

})
// //interactive map
// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select(".filter");

//   d3.json(filterData).then((value) => {
//     Object.entries(filters).forEach((value) => {
//       selector
//         .append("filter")
//         .property("value");
//     });

//     // Use the first sample from the list to build the initial plots
   
    
//   });
// }
// function optionChanged(tableData) {
//   // Fetch new data each time a new sample is selected
//   Plotly.newPlot(map, tableData, layout);
// }
// Initialize the dashboard
//init();