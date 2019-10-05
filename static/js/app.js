
d3.csv("/data/alt_fuel.csv",function(data) {
    console.log(data);
    createFeatures(data.stations);
  });

//algoria code
//l

function placeholder() {
    var placesAutocomplete = places({
        appId: 'plBKUX3N3ZPX',
        apiKey: 'f18f918b72eaf29b158f4430a5b280d1',
        container: document.querySelector('#input-map')
    });
    var map = L.map('map-example-container', {
        scrollWheelZoom: false,
        zoomControl: false,
    });
    var osmLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 13,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var markers = [];
    map.setView(new L.LatLng(0, 0), 1);
    map.addLayer(osmLayer);
    placesAutocomplete.on('suggestions', handleOnSuggestions);
    placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
    placesAutocomplete.on('change', handleOnChange);
    placesAutocomplete.on('clear', handleOnClear);
    function handleOnSuggestions(e) {
        markers.forEach(removeMarker);
        markers = [];
        if (e.suggestions.length === 0) {
            map.setView(new L.LatLng(0, 0), 1);
            return;
        }
        e.suggestions.forEach(addMarker);
        findBestZoom();
    }
    function handleOnChange(e) {
        markers
            .forEach(function (marker, markerIndex) {
                if (markerIndex === e.suggestionIndex) {
                    markers = [marker];
                    marker.setOpacity(1);
                    findBestZoom();
                }
                else {
                    removeMarker(marker);
                }
            });
    }
    function handleOnClear() {
        map.setView(new L.LatLng(0, 0), 1);
        markers.forEach(removeMarker);
    }
    function handleOnCursorchanged(e) {
        markers
            .forEach(function (marker, markerIndex) {
                if (markerIndex === e.suggestionIndex) {
                    marker.setOpacity(1);
                    marker.setZIndexOffset(1000);
                }
                else {
                    marker.setZIndexOffset(0);
                    marker.setOpacity(0.5);
                }
            });
    }
    function addMarker(suggestion) {
        var marker = L.marker(suggestion.latlng, { opacity: .4 });
        marker.addTo(map);
        markers.push(marker);
    }
    function removeMarker(marker) {
        map.removeLayer(marker);
    }
    function findBestZoom() {
        var featureGroup = L.featureGroup(markers);
        map.fitBounds(featureGroup.getBounds().pad(0.5), { animate: false });
    }
}
placeholder();

