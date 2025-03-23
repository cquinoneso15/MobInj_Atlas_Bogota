/*************************************
 * sequential.js                     *
 * Ajax callback for sequential data *
 * Author: Héctor Ochoa Ortiz        *
 * Affil.: TUM SVP                   *
 *************************************/

function handleJsonSeq(data,name) {
    biv = false;
    // Add data to download button
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    download.setAttribute("href", dataStr);
    download.setAttribute("download", "data.geojson");

    // If layer is empty, show error message and return
    if (data.features.length == 0) {
        alert('Error while querying, no features found.');
        return;
    }

    // Generate quantiles
    var quants = getQuants(data,"Value");
    
    // Generate style from quantiles
    if (selected_values['justice']=="amenities"|selected_values['justice']=="ava"|selected_values['justice']=="stations"){ function getColor(d) {
        return  d > quants["Q3"] ? '#fef0d9' :
                d > quants["Q2"] ? '#fdcc8a' :
                d > quants["Q1"] ? '#fc8d59' :
                    '#d7301f'  ;
    }
    }else if(selected_values['justice']=="clusters"){function getColor(d){
    return  d == 3 ? '#309FD1':
            d == 2 ? '#EC0016':
            d == 1 ? '#FFD800':
                '#63A615';
}

}
    else{
    function getColor(d) {
        return  d > quants["Q3"] ? '#d7301f' :
                d > quants["Q2"] ? '#fc8d59' :
                d > quants["Q1"] ? '#fdcc8a' :
                '#fef0d9';
    }
    }

    var unit= extractStringInBrackets(name);
    function style(feature) {
        return {
            fillColor: getColor(feature.properties["Value"]),
            weight: 0.5,
            opacity: 1,
            color: '#1a1a1a',
            fillOpacity: 0.7
        };
    }
    // legend
    // Define legend text based on justice value
    var legend_text;

    if (selected_values["justice"] == "clusters") {
        // If justice is "clusters", set a fixed header and unit
        legend_text = '<h4>Clusters [-]</h4>';

        // Define fixed grades for clusters
        let grades = [1, 2, 3, 4];

        // Loop through the exact values
        for (var i = 0; i < grades.length; i++) {
            legend_text +=
                '<i class="square" style="background:' + getColor(grades[i]) + '"></i> ' +
                grades[i];

            if (i < grades.length - 1) {
                legend_text += '<br>';
            }
        }

    } else if (selected_values["justice"] == "mob_inj_score") {
        // Default behavior when justice is NOT "clusters"
        let grades = [quants["Q0"], quants["Q1"], quants["Q2"], quants["Q3"], quants["Q4"]];
        legend_text = '<h4> <span i18n="mob_inj_score"></span> [-]</h4>';

        for (var i = 0; i < grades.length - 1; i++) {
            legend_text +=
                '<i class="square" style="background:' + getColor((grades[i] + grades[i + 1]) / 2.0) + '" ></i> ' +
                (grades[i].toFixed(2)) + '&ndash;' + (grades[i + 1].toFixed(2));

            if (i < grades.length - 2) {
                legend_text += '<br>';
            }
        }

    } else {
        // Default behavior when justice is NOT "clusters"
        let grades = [quants["Q0"], quants["Q1"], quants["Q2"], quants["Q3"], quants["Q4"]];

        legend_text = '<h4> <span i18n="' +
            (selected_values["map_type"] == "sg" ? selected_values["justice"] : selected_values["v1"]) +
            '"></span> [<span i18n="' + unit + '"></span>]'+  '</h4>';

        for (var i = 0; i < grades.length - 1; i++) {
            legend_text +=
                '<i class="square" style="background:' + getColor((grades[i] + grades[i + 1]) / 2.0) + '" ></i> ' +
                (grades[i].toFixed(2)) + '&ndash;' + (grades[i + 1].toFixed(2));

            if (i < grades.length - 2) {
                legend_text += '<br>';
            }
        }
    }


    // add legend to map
    generateLegend(legend_text, false);



    // Add layer to map
    polygonLayer = L.geoJson(data, {
        attribution: '&copy; <a href="https://www.mos.ed.tum.de/sv/homepage/" i18n="chair"></a>',
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    map.fitBounds(polygonLayer.getBounds());

    // Add layer control to map
    var layerControlOptions = {};
    if (tiles) { layerControlOptions["Background"] = tiles; }
    if (polygonLayer) { layerControlOptions["Indicator"] = polygonLayer; }
    if (selected_values["justice"] == "acc") {
        if (poiLayer) { layerControlOptions["POIs"] = poiLayer; }
        if (areaLayer) { layerControlOptions["Service Areas"] = areaLayer; }
    }
    layerControl = L.control.layers(null, layerControlOptions).addTo(map)

    if (areaLayer) {
        areaLayer.bringToFront();
        if (poiLayer) {
            poiLayer.bringToFront();
        }
    }

    translatePage();
}
