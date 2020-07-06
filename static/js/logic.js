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
    if (mag <= 1) {
        color = "#36F011";
    }
    else if (mag > 1 && mag <= 2) {
        color = "#84F307";
    }
    else if (mag > 2 && mag <= 3) {
        color = "#DFF31F";
    }
    else if (mag > 3 && mag <= 4) {
        color = "#E9BA63";
    }
    else if (mag > 4 && mag <= 5) {
        color = "#F4950C";
    }
    else {
        color = "#EC2F0E";
    }
    return color;
}

function onEachFeature (feature, layer) {
    layer.bindPopup("<h3><a target='_blank' href='" + feature.properties.url + "'>Click here</a><hr>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

function markerSize(mag) {
    return mag * 5;
}

function getColor(value) {
    return value > 5 ? '#EC2F0E' :
        value > 4  ? '#F4950C' :
        value > 3  ? '#E9BA63' :
        value > 2  ? '#DFF31F' :
        value > 1  ? '#84F307' :
                    '#36F011';
}

// Add the legend
var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend"),
    grades = [0, 1, 2, 3, 4, 5],
    labels = [],
    from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

    labels.push(
        '<i style="background:' + getColor(from + 1) + '">____</i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }
    
    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(myMap);

// Read the JSON file link
d3.json(earthJson, function(data) {
    // console.log(data);
    // console.log(data.features[0].geometry);
    L.geoJson(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseDisplay(feature.properties.mag),
                color: chooseDisplay(feature.properties.mag),
                fillOpacity: 0.75,
                Opacity: 0.75
            });
        },
    }).addTo(myMap);
});


d3.json("static/data/PB2002_steps.json", function(data) {
    console.log(data);
})