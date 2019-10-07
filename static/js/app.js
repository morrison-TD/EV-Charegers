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
  // console.log(data)
  var keys=Object.keys(data);
  Object.entries(data).forEach(([key, value]) => {
    // console.log(key, value.State)
  
  
  var city = value.City;
  var state = value.State;
  var station = value.Station_Name;
  var address = value.Street_Address;
  var zip = value.ZIP
  // console.log(value)
  
  var searchData= value;
 
  function tableDisplay(value) {
    var tbody = d3.select("tbody");
    value.forEach((valueRecord) => {
      var row = tbody.append("tr");
      Object.entries(evoRecord).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.html(value);});
    });
  };
  // update for new table data returned
  function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };
  // console.log(searchData.City);
  tableDisplay(searchData);
  })

})
// Control that button baaaaaby!
var button = d3.select("#filter-btn");
// filter the database and display
button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  var evInput = d3.select("#search").property("zip","city");
      if (evInput.trim() === "" ) {
    // if/else
    var filteredData = searchData;
  } else {
    // display dataset  
    var filteredData = searchData.filter(value => 
      value.city === cityInput.trim());
  };
    // "No record found"
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  };

  console.log(filteredData);
  tableDisplay(filteredData);

});


// //algoria code

// function placeholder() {
//     var placesAutocomplete = places({
//         appId: 'plBKUX3N3ZPX',
//         apiKey: 'f18f918b72eaf29b158f4430a5b280d1',
//         container: document.querySelector('#input-map')
//     });
//     var map = L.map('map-example-container', {
//         scrollWheelZoom: false,
//         zoomControl: false,
//     });
//     var osmLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         minZoom: 1,
//         maxZoom: 13,
//         attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
//     });
//     var markers = [];
//     map.setView(new L.LatLng(0, 0), 1);
//     map.addLayer(osmLayer);
//     placesAutocomplete.on('suggestions', handleOnSuggestions);
//     placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
//     placesAutocomplete.on('change', handleOnChange);
//     placesAutocomplete.on('clear', handleOnClear);
//     function handleOnSuggestions(e) {
//         markers.forEach(removeMarker);
//         markers = [];
//         if (e.suggestions.length === 0) {
//             map.setView(new L.LatLng(0, 0), 1);
//             return;
//         }
//         e.suggestions.forEach(addMarker);
//         findBestZoom();
//     }
//     function handleOnChange(e) {
//         markers
//             .forEach(function (marker, markerIndex) {
//                 if (markerIndex === e.suggestionIndex) {
//                     markers = [marker];
//                     marker.setOpacity(1);
//                     findBestZoom();
//                 }
//                 else {
//                     removeMarker(marker);
//                 }
//             });
//     }
//     function handleOnClear() {
//         map.setView(new L.LatLng(0, 0), 1);
//         markers.forEach(removeMarker);
//     }
//     function handleOnCursorchanged(e) {
//         markers
//             .forEach(function (marker, markerIndex) {
//                 if (markerIndex === e.suggestionIndex) {
//                     marker.setOpacity(1);
//                     marker.setZIndexOffset(1000);
//                 }
//                 else {
//                     marker.setZIndexOffset(0);
//                     marker.setOpacity(0.5);
//                 }
//             });
//     }
//     function addMarker(suggestion) {
//         var marker = L.marker(suggestion.latlng, { opacity: .4 });
//         marker.addTo(map);
//         markers.push(marker);
//     }
//     function removeMarker(marker) {
//         map.removeLayer(marker);
//     }
//     function findBestZoom() {
//         var featureGroup = L.featureGroup(markers);
//         map.fitBounds(featureGroup.getBounds().pad(0.5), { animate: false });
//     }
// }
// placeholder();

