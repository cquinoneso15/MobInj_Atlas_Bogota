/*************************************************
 * map.js                                        *
 * Script file setting up and displaying the map *
 * Author: Héctor Ochoa Ortiz                    *
 * Affil.: TUM SVP                               *
 * Last update: 2023-05-03                       *
 *************************************************/

// Create map
const map = L.map('map').setView([4.7110, -74.0721], 12);
// Add background layer
const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    minZoom: 0
}).addTo(map);


// Add selector and button
const map_type = document.querySelector('#map_type');
const justice = document.querySelector('#justice');
const v1 = document.querySelector('#v1');
const amenity = document.querySelector('#amenity');
const mot = document.querySelector('#mot');

// Map layers
var polygonLayer;
var poiLayer;
var areaLayer;
var layerControl;
var biv;

const download = document.querySelector('#download');
var legend;


function selectFeatureByProperty(geojson, propertyName) {
    // Create a new GeoJSON structure
    var newGeoJson = {
        "type": "FeatureCollection",
        "features": geojson.features.map(feature => ({
            "type": "Feature",
            "geometry": feature.geometry,
            "properties": {
                // Include only the specified property
                 "Value": feature.properties[propertyName],
                "Delegation": feature.properties.alt_name_f,
                "Unit": extractStringInBrackets(propertyName)
            }
        }))
    };
    return newGeoJson;
}
function selectFeaturesWithTwoProperties(geojson, firstPropertyName, secondPropertyName) {
    var newGeoJson = {
        "type": "FeatureCollection",
        "features": geojson.features.map(feature => ({
            "type": "Feature",
            "geometry": feature.geometry,
            "properties": {
                // Include only the specified properties
                ["Mob"]: feature.properties[secondPropertyName],
                ["Social"]: feature.properties[firstPropertyName],
                "Unit_mobil": extractStringInBrackets(secondPropertyName),
                "Unit_social": extractStringInBrackets(firstPropertyName),
                "Delegation": feature.properties.alt_name_f
            }
        }))
    };
    return newGeoJson;
}

// When selector value is clicked
function changeMap() {
    selected_values = {
        "map_type": getValue("map_type"),
        "justice": getValue("justice"),
        "v1": getValue("v1"),
        "amenity": getValue("amenity"),
        "mot": getValue("mot")
    }
    info.update();

    // Remove layers if already displayed
    if (polygonLayer) {
        polygonLayer.remove();
        if (poiLayer) {
            poiLayer.remove();
        }
        if (areaLayer) {
            areaLayer.remove();
        }
        if (layerControl) {
            layerControl.remove();
        }
    }

    generateLegend("", true);
    switch (selected_values["map_type"]) {
        case "sg":
            var propertyName;
            if ( selected_values["justice"] == "tp" ) {//CYRINE
                propertyName="Population [nb]";

            }
            else if (selected_values["justice"] == "o60" ) {//CYRINE
                propertyName="Older people [%]";
            }
            else if ( selected_values["justice"] == "un" ) {//CYRINE
                propertyName=" Unemployed [%]";

            }
            else if ( selected_values["justice"] == "income" ) {//CYRINE
                propertyName="Poverty rate [%]";
            }
            else if ( selected_values["justice"] == "u9" ) {//CYRINE
                propertyName="Children [%]";
            }
            else if ( selected_values["justice"] == "u19" ) {//CYRINE
                propertyName="Teenagers [%]";
            }
            else if ( selected_values["justice"] == "nc" ) {//CYRINE
                propertyName=" Population with no access to car [%]";
            }
            else if ( selected_values["justice"] == "imm" ) {//CYRINE
                propertyName="Intrant migrant between 2009 et 2014 [%]";
            }
            if (propertyName) {
                if(sg_geojson == null || sg_geojson === 'undefined'){
                    mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathsg)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            sg_geojson= mergedGeoJSON;
                            handleJsonSeq(selectFeatureByProperty(sg_geojson, propertyName),propertyName)
                        });
                }
                else{
                handleJsonSeq(selectFeatureByProperty(sg_geojson, propertyName),propertyName)}
            }
            break;
        case "ji":
            var propertyName_ji;
            if (  selected_values["amenity"] == "h" ) {//CYRINE
                propertyName_ji="1Km proximity to Health [% population] ";
            }
            else if (  selected_values["amenity"] == "s" ) {//CYRINE
                propertyName_ji="1Km proximity to Sport [% population] ";

            }
            else if ( selected_values["amenity"] == "f" ) {//CYRINE
                propertyName_ji="1Km proximity to Food [% area]";
            }
            else if (selected_values["amenity"] == "a" ) {//CYRINE
                propertyName_ji="1Km proximity to Administration [% area]";

            }
            else if (  selected_values["amenity"] == "e1" ) {//CYRINE
                propertyName_ji="1Km proximity to school [% population] ";


            }
            else if ( selected_values["amenity"] == "e2" ) {//CYRINE
                propertyName_ji="1Km proximity to elementary or highschool [% population] ";

            }
            else if ( selected_values["amenity"] == "g" ) {//CYRINE
                propertyName_ji="1Km proximity to Green space [% area]";
            }

            else if (  selected_values["v1"] == "accidents" ) {//CYRINE
                propertyName_ji="Accidents [Nb/ha]";

            }
            else if (   selected_values["v1"] == "acc_pt" ) {//CYRINE
                propertyName_ji="700m proximity to PT [% area]";
            }
            else if ( selected_values["v1"] == "intersection_density" ) {//CYRINE
                propertyName_ji="Intersection [nb /ha]";
            }
            else if (  selected_values["v1"] == "road_density" ) {//CYRINE
                propertyName_ji="Road density [km/ha]";
            }

            else if (  selected_values["v1"] == "pt_frequ" ) {//CYRINE
                propertyName_ji="Frequency PT [min]";
            }
            else if ( selected_values["v1"] == "dur_15_30" ) {//CYRINE
                propertyName_ji="Commuting for 15-30 min [% active pop]";
            }
            else if (   selected_values["v1"] == "dur_30" ) {//CYRINE
                propertyName_ji="Commuting for >30 min [% active pop]";
            }

            else if ( selected_values["v1"] == "pt_usage" ) {//CYRINE
                propertyName_ji="PT for commuting [%active  pop]"}
            else if ( selected_values["v1"] == "irr_pt_usage" ) {//CYRINE
                propertyName_ji="Irregular transport for commuting [%active  pop]"}

            else if ( selected_values["v1"] == "walk_usage" ) {//CYRINE
                propertyName_ji="Walking for commuting [%active  pop]"}

            else if ( selected_values["v1"] == "car_usage" ) {//CYRINE
                propertyName_ji="Car for commuting [%active  pop]"}

            if (propertyName_ji) {
                if(ji_geojson == null || ji_geojson === 'undefined'){
                    mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathji)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            ji_geojson= mergedGeoJSON;
                            handleJsonSeq(selectFeatureByProperty(ji_geojson, propertyName_ji),propertyName_ji)
                        });
                }
                else{
                    handleJsonSeq(selectFeatureByProperty(ji_geojson, propertyName_ji),propertyName_ji)}
            }
            break;
        case "ji_v_sg":
            var propertyName;
            var propertyName_ji;
            if ( selected_values["v1"] == "tp" ) {//CYRINE
                propertyName="Population [nb]";

            }
            else if (selected_values["v1"] == "o60" ) {//CYRINE
                propertyName="Older people [%]";
            }
            else if ( selected_values["v1"] == "un" ) {//CYRINE
                propertyName=" Unemployed [%]";
            }
            else if ( selected_values["v1"] == "income" ) {//CYRINE
                propertyName="Poverty rate [%]";
            }
            else if ( selected_values["v1"] == "u9" ) {//CYRINE
                propertyName="Children [%]";
            }
            else if ( selected_values["v1"] == "u19" ) {//CYRINE
                propertyName="Teenagers [%]";
            }
            else if ( selected_values["v1"] == "nc" ) {//CYRINE
                propertyName=" Population with no access to car [%]";
            }
            else if ( selected_values["v1"] == "imm" ) {//CYRINE
                propertyName="Intrant migrant between 2009 et 2014 [%]";
            }
            if (  selected_values["amenity"] == "h" ) {//CYRINE
                propertyName_ji="1Km proximity to Health [% population] ";
            }
            else if (  selected_values["amenity"] == "s" ) {//CYRINE
                propertyName_ji="1Km proximity to Sport [% population] ";

            }
            else if ( selected_values["amenity"] == "f" ) {//CYRINE
                propertyName_ji="1Km proximity to Food [% area]";
            }
            else if (selected_values["amenity"] == "a" ) {//CYRINE
                propertyName_ji="1Km proximity to Administration [% area]";

            }
            else if (  selected_values["amenity"] == "e1" ) {//CYRINE
                propertyName_ji="1Km proximity to school [% population] ";


            }
            else if ( selected_values["amenity"] == "e2" ) {//CYRINE
                propertyName_ji="1Km proximity to elementary or highschool [% population] ";

            }
            else if ( selected_values["amenity"] == "g" ) {//CYRINE
                propertyName_ji="1Km proximity to Green space [% area]";
            }

            else if (  selected_values["amenity"] == "accidents" ) {//CYRINE
                propertyName_ji="Accidents [Nb/ha]";

            }
            else if (   selected_values["amenity"] == "acc_pt" ) {//CYRINE
                propertyName_ji="700m proximity to PT [% area]";
            }
            else if ( selected_values["amenity"] == "intersection_density" ) {//CYRINE
                propertyName_ji="Intersection [nb /ha]";
            }
            else if (  selected_values["amenity"] == "road_density" ) {//CYRINE
                propertyName_ji="Road density [km/ha]";
            }

            else if (  selected_values["amenity"] == "pt_frequ" ) {//CYRINE
                propertyName_ji="Frequency PT [min]";
            }

            else if ( selected_values["amenity"] == "dur_15" ) {//CYRINE
                propertyName_ji="Commuting for <15 min [% active pop]";
            }
            else if ( selected_values["amenity"] == "dur_15_30" ) {//CYRINE
                propertyName_ji="Commuting for 15-30 min [% active pop]";
            }
            else if (   selected_values["amenity"] == "dur_30" ) {//CYRINE
                propertyName_ji="Commuting for >30 min [% active pop]";
            }

            else if ( selected_values["amenity"] == "pt_usage" ) {//CYRINE
                propertyName_ji="PT for commuting [%active  pop]"}
            else if ( selected_values["amenity"] == "irr_pt_usage" ) {//CYRINE
                propertyName_ji="Irregular transport for commuting [%active  pop]"}

            else if ( selected_values["amenity"] == "walk_usage" ) {//CYRINE
                propertyName_ji="Walking for commuting [%active  pop]"}

            else if ( selected_values["amenity"] == "car_usage" ) {//CYRINE
                propertyName_ji="Car for commuting [%active  pop]"}
            if (propertyName_ji && propertyName) {

                if (bi_geojson == null || bi_geojson === 'undefined') {
                    mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathji,csvFilePathsg)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            bi_geojson = mergedGeoJSON;
                            handleJsonBiv(selectFeaturesWithTwoProperties(bi_geojson, propertyName,propertyName_ji ))
                        });
                } else {
                    handleJsonBiv(selectFeaturesWithTwoProperties(bi_geojson, propertyName, propertyName_ji))
                }
            }
         break;
        case "summ":{
            if(radar_geojson == null || radar_geojson === 'undefined'){
                mergeGeoJSONandCSV(jsonFilePath_map, csvradar)
                    .then(mergedGeoJSON => {
                        // Do something with the merged GeoJSON
                        radar_geojson = mergedGeoJSON;
                        handleJsonRadar(radar_geojson) });}
            else{
            handleJsonRadar(radar_geojson)}break;
            }
    }


}





// Update map size after menu transition
document.getElementById('navbar-left').addEventListener('change', function() {
    for (let i=0; i<500; i+=50) // 500 ms = 0.5s = transition time; 50 ms = 0.005s = invalidate size frame
        setTimeout(function(){ map.invalidateSize()}, i);
});
