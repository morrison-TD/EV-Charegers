
d3.csv("/data/alt_fuel.csv",function(data) {
    console.log(data);
    createFeatures(data.stations);
  });
  
  function createFeatures(evData) {
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(stations, layer) {
      layer.bindPopup("<h3>" + stations.station_name+ "<h3>" + stations.city +
        "</h3><hr><p>" );
    }
  
    var ev_locations = L.geoJSON(evData,{
      onEachFeature: onEachFeature,
      pointToLayer: function(stations, latlng){
        return L.circleMarker(latlng);
      },
      setyle:setStlyes
    });
    function setStlyes(stations){
      return{
        opacity: .5,
        radius:radius(stations.city),
        // radius: markerSize(feature.properties.mag)
        
        fillColor:color(stations.city)
       }
      }
  //legend
  
  var info = L.control({
      position: "bottomright"
    });
    
    info.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      return div;
    };
  
  
  
  
  //   createMap(charg_stations);
  // };
  
  // function createMap(charg_stations) {
  // Create the tile layer that will be the background of our map
  
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    //create config.js
    accessToken: "pk.eyJ1IjoidG9tb2Z0aGV3b3JsZCIsImEiOiJjazByZG9rbXgwNTZ4M21xaXlzOTNkYmxuIn0.jD_fIrpOVrtglSrN0sZIVQ"
  });
  
  // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   Charge_Stations: charg_stations
  // };
  
  
  // Create a baseMaps object
  var baseMaps = {
    "Street Map": streetmap,
  
  };
  
  // Create the map with our layers
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap]
  });
    // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps,overlayMaps, {
    collapsed: false
  }).addTo(myMap);


 //create for loop
// loop through station data

//algoria code


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

