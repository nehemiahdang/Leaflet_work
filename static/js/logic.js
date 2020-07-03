// Get the JSON data set from 'USGS GeoJSON Feed'
var earthJson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Create the map with a center point of California
var myMap = L.map("map").setView([36.7783, -119.4179], 5);

// Create the layer of the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

function chooseDisplay(mag) {
    if (mag >= 1) {
        color = "#36F011";
    }
    else if (mag < 1 && mag >= 2) {
        color = "#84F307";
    }
    else if (mag < 2 && mag >= 3) {
        color = "#DFF31F";
    }
    else if (mag < 3 && mag >= 4) {
        color = "#E9BA63";
    }
    else if (mag < 4 && mag >= 5) {
        color = "#F4950C";
    }
    else {
        color = "#EC2F0E";
    }
    return color;
}

// Add the legend
// var info = L.control({
//     position: "bottomright"
// });

// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
// }

// info.addTo(myMap);

function onEachFeature (feature, layer) {
    layer.bindPopup("<h3><a target='_blank' href='" + feature.properties.url + "'>Click here</a><hr>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

function markerOptions (feature) {
    return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        {

        })
}

// Read the JSON file link
d3.json(earthJson, function(data) {
    console.log(data);
    console.log(data.features[0].geometry);
    L.geoJson(data, {
        onEachFeature: onEachFeature,
        style: function(feature) {
            return {
                color: "black",
                fillColor: chooseDisplay(feature.properties.mag),
                fillOpacity: 0.5,
                // weight:0.9
            };
        }
    }).addTo(myMap);
})