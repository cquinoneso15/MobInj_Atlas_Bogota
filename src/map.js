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
                "Delegation": feature.properties.nom_upz,
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
                "Delegation": feature.properties.nom_upz
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
        //social disadvantages
        case "sg":
            var propertyName;
            if ( selected_values["justice"] == "tp" ) {//Carlos
                propertyName="Total Population [people]";

            }
            else if (selected_values["justice"] == "w" ) {//Carlos
                propertyName="Women [%]";
            }
            else if ( selected_values["justice"] == "o60" ) {//Carlos
                propertyName="Older people [%]";

            }
            else if ( selected_values["justice"] == "u10" ) {//Carlos
                propertyName="Children [%]";
            }
            else if ( selected_values["justice"] == "u20" ) {//Carlos
                propertyName="Teenagers [%]";
            }
            else if ( selected_values["justice"] == "vic" ) {//Carlos
                propertyName="Victim Population [%]";
            }
            else if ( selected_values["justice"] == "ses" ) {//Carlos
                propertyName="SES 1 and 2 [% built-up area]";
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
        //transport disadvantages
        case "ji":
            var propertyName_ji;
            if (  selected_values["v1"] == "fatalities" ) {//Carlos
                propertyName_ji="Accidents (fatalities) [1/ha]";
            }
            else if (  selected_values["v1"] == "injuries" ) {//Carlos
                propertyName_ji="Accidents (injuries) [1/ha]";

            }
            else if ( selected_values["v1"] == "acc_ped" ) {//Carlos
                propertyName_ji="Accidents (pedestrians) [1/ha]";
            }
            else if (selected_values["v1"] == "acc_car" ) {//Carlos
                propertyName_ji="Accidents (cars) [1/ha]";

            }
            else if (  selected_values["v1"] == "acc_bike" ) {//Carlos
                propertyName_ji="Accidents (bicycles) [1/ha]";

            }
            else if ( selected_values["v1"] == "acc_moto" ) {//Carlos
                propertyName_ji="Accidents (motorcycles) [1/ha]";

            }
            else if ( selected_values["v1"] == "car_use" ) {//Carlos
                propertyName_ji="Car use [%]";
            }

            else if (  selected_values["v1"] == "pt_use" ) {//Carlos
                propertyName_ji="Use of PT [%]";

            }
            else if (  selected_values["v1"] == "bicycle_use" ) {//Carlos
                propertyName_ji="Bicycle Use [%]";
            }
            else if ( selected_values["v1"] == "moto_use" ) {//Carlos
                propertyName_ji="Motorcycle use [%]";
            }
            else if (  selected_values["v1"] == "walk_use" ) {//Carlos
                propertyName_ji="Walking [%]";
            }

            else if (  selected_values["v1"] == "time" ) {//Carlos
                propertyName_ji="Commuting time [min]";
            }
            else if ( selected_values["v1"] == "pollution" ) {//Carlos
                propertyName_ji="Pollution [PM2.5]";
            }

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
        //environmental disadvantages
        case "env":
            var propertyName_env;
            if (selected_values["v1"] == "h" ) {//Carlos
                propertyName_env="Health Services [1/ha]";
            }
            else if (selected_values["v1"] == "e" ) {//Carlos
                propertyName_env="Schools [1/ha]";
            }
            else if (selected_values["v1"] == "g" ) {//Carlos
                propertyName_env="Government Services [1/ha]";
            }
            else if (selected_values["v1"] == "c" ) {//Carlos
                propertyName_env="Cultural Activites [1/ha]";
            }
            else if (selected_values["v1"] == "ugs" ) {//Carlos
                propertyName_env="UGS [% area]";
            }
            else if (selected_values["v1"] == "cycleway_density" ) {//Carlos
                propertyName_env="Cycle paths [% area]";
            }
            else if (selected_values["v1"] == "street_density" ) {//Carlos
                propertyName_env="Streets [% area]";
            }
            else if (selected_values["v1"] == "walk_inf" ) {//Carlos
                propertyName_env="Sidewalks [% area]";
            }
            else if (selected_values["v1"] == "PT_stops" ) {//Carlos
                propertyName_env="PT Stations [1/ha]";
            }
            else if (selected_values["v1"] == "bike_sharing" ) {//Carlos
                propertyName_env="Bike sharing [1/ha]";
            }
            else if (selected_values["v1"] == "m_slope" ) {//Carlos
                propertyName_env="Mean slope [%]";
            }
            if (propertyName_env) {
                if(env_geojson == null || env_geojson === 'undefined'){
                    mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathji)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            env_geojson= mergedGeoJSON;
                            handleJsonSeq(selectFeatureByProperty(env_geojson, propertyName_env),propertyName_env)
                        });
                }
                else{
                    handleJsonSeq(selectFeatureByProperty(env_geojson, propertyName_env),propertyName_env)}
            }
            break;

        //mobility disadvantages
        case "ji_v_sg":
            var propertyName;
            var propertyName_ji;
            if ( selected_values["v1"] == "tp" ) {//Carlos
                propertyName="Total Population [people]";

            }
            else if (selected_values["v1"] == "w" ) {//Carlos
                propertyName="Women [%]";
            }
            else if ( selected_values["v1"] == "o60" ) {//Carlos
                propertyName="Older people [%]";

            }
            else if ( selected_values["v1"] == "u10" ) {//Carlos
                propertyName="Children [%]";
            }
            else if ( selected_values["v1"] == "u20" ) {//Carlos
                propertyName="Teenagers [%]";
            }
            else if ( selected_values["v1"] == "vic" ) {//Carlos
                propertyName="Victim Population [%]";
            }
            else if ( selected_values["v1"] == "ses" ) {//Carlos
                propertyName = "SES 1 and 2 [% built-up area]";
            }


            if (  selected_values["mot"] == "fatalities" ) {//Carlos
                propertyName_ji="Accidents (fatalities) [1/ha]";
            }
            else if (  selected_values["mot"] == "injuries" ) {//Carlos
                propertyName_ji="Accidents (injuries) [1/ha]";

            }
            else if ( selected_values["mot"] == "acc_ped" ) {//Carlos
                propertyName_ji="Accidents (pedestrians) [1/ha]";
            }
            else if (selected_values["mot"] == "acc_car" ) {//Carlos
                propertyName_ji="Accidents (cars) [1/ha]";

            }
            else if (  selected_values["mot"] == "acc_bike" ) {//Carlos
                propertyName_ji="Accidents (bicycles) [1/ha]";

            }
            else if ( selected_values["mot"] == "acc_moto" ) {//Carlos
                propertyName_ji="Accidents (motorcycles) [1/ha]";

            }
            else if ( selected_values["mot"] == "car_use" ) {//Carlos
                propertyName_ji="Car use [%]";
            }

            else if (  selected_values["mot"] == "pt_use" ) {//Carlos
                propertyName_ji="Use of PT [%]";

            }
            else if (  selected_values["mot"] == "bicycle_use" ) {//Carlos
                propertyName_ji="Bicycle Use [%]";
            }
            else if ( selected_values["mot"] == "moto_use" ) {//Carlos
                propertyName_ji="Motorcycle use [%]";
            }
            else if (  selected_values["mot"] == "walk_use" ) {//Carlos
                propertyName_ji="Walking [%]";
            }

            else if (  selected_values["mot"] == "time" ) {//Carlos
                propertyName_ji="Commuting time [min]";
            }
            else if ( selected_values["mot"] == "pollution" ) {//Carlos
                propertyName_ji="Pollution [PM2.5]";
            }

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
        //spatial disadvantages
        case "spat":
            var propertyName;
            var propertyName_env;
            if ( selected_values["v1"] == "tp" ) {//Carlos
                propertyName="Total Population [people]";

            }
            else if (selected_values["v1"] == "w" ) {//Carlos
                propertyName="Women [%]";
            }
            else if ( selected_values["v1"] == "o60" ) {//Carlos
                propertyName="Older people [%]";

            }
            else if ( selected_values["v1"] == "u10" ) {//Carlos
                propertyName="Children [%]";
            }
            else if ( selected_values["v1"] == "u20" ) {//Carlos
                propertyName="Teenagers [%]";
            }
            else if ( selected_values["v1"] == "vic" ) {//Carlos
                propertyName="Victim Population [%]";
            }
            else if ( selected_values["v1"] == "ses" ) {//Carlos
                propertyName = "SES 1 and 2 [% built-up area]";
            }

            if (selected_values["amenity"] == "h" ) {//Carlos
                propertyName_env="Health Services [1/ha]";
            }
            else if (selected_values["amenity"] == "e" ) {//Carlos
                propertyName_env="Schools [1/ha]";
            }
            else if (selected_values["amenity"] == "g" ) {//Carlos
                propertyName_env="Government Services [1/ha]";
            }
            else if (selected_values["amenity"] == "c" ) {//Carlos
                propertyName_env="Cultural Activites [1/ha]";
            }
            else if (selected_values["amenity"] == "ugs" ) {//Carlos
                propertyName_env="UGS [% area]";
            }
            else if (selected_values["mot"] == "cycleway_density" ) {//Carlos
                propertyName_env="Cycle paths [% area]";
            }
            else if (selected_values["mot"] == "street_density" ) {//Carlos
                propertyName_env="Streets [% area]";
            }
            else if (selected_values["mot"] == "walk_inf" ) {//Carlos
                propertyName_env="Sidewalks [% area]";
            }
            else if (selected_values["mot"] == "PT_stops" ) {//Carlos
                propertyName_env="PT Stations [1/ha]";
            }
            else if (selected_values["mot"] == "bike_sharing" ) {//Carlos
                propertyName_env="Bike sharing [1/ha]";
            }
            else if (selected_values["mot"] == "m_slope" ) {//Carlos
                propertyName_env="Mean slope [%]";
            }

            if (propertyName_env && propertyName) {

                if (spat_geojson == null || spat_geojson === 'undefined') {
                    mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathji,csvFilePathsg)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            spat_geojson = mergedGeoJSON;
                            handleJsonBiv(selectFeaturesWithTwoProperties(spat_geojson, propertyName,propertyName_env ))
                        });
                } else {
                    handleJsonBiv(selectFeaturesWithTwoProperties(spat_geojson, propertyName, propertyName_env))
                }
            }
        break;
        //accessibility disadvantages
        case "access":
            var propertyName_ji;
            var propertyName_env;
            if (selected_values["v1"] == "h" ) {//Carlos
                propertyName_env="Health Services [1/ha]";
            }
            else if (selected_values["v1"] == "e" ) {//Carlos
                propertyName_env="Schools [1/ha]";
            }
            else if (selected_values["v1"] == "g" ) {//Carlos
                propertyName_env="Government Services [1/ha]";
            }
            else if (selected_values["v1"] == "c" ) {//Carlos
                propertyName_env="Cultural Activites [1/ha]";
            }
            else if (selected_values["v1"] == "ugs" ) {//Carlos
                propertyName_env="UGS [% area]";
            }
            else if (selected_values["v1"] == "cycleway_density" ) {//Carlos
                propertyName_env="Cycle paths [% area]";
            }
            else if (selected_values["v1"] == "street_density" ) {//Carlos
                propertyName_env="Streets [% area]";
            }
            else if (selected_values["v1"] == "walk_inf" ) {//Carlos
                propertyName_env="Sidewalks [% area]";
            }
            else if (selected_values["v1"] == "PT_stops" ) {//Carlos
                propertyName_env="PT Stations [1/ha]";
            }
            else if (selected_values["v1"] == "bike_sharing" ) {//Carlos
                propertyName_env="Bike sharing [1/ha]";
            }
            else if (selected_values["v1"] == "m_slope" ) {//Carlos
                propertyName_env = "Mean slope [%]";
            }

            if (  selected_values["mot"] == "fatalities" ) {//Carlos
                propertyName_ji="Accidents (fatalities) [1/ha]";
            }
            else if (  selected_values["mot"] == "injuries" ) {//Carlos
                propertyName_ji="Accidents (injuries) [1/ha]";

            }
            else if ( selected_values["mot"] == "acc_ped" ) {//Carlos
                propertyName_ji="Accidents (pedestrians) [1/ha]";
            }
            else if (selected_values["mot"] == "acc_car" ) {//Carlos
                propertyName_ji="Accidents (cars) [1/ha]";

            }
            else if (  selected_values["mot"] == "acc_bike" ) {//Carlos
                propertyName_ji="Accidents (bicycles) [1/ha]";

            }
            else if ( selected_values["mot"] == "acc_moto" ) {//Carlos
                propertyName_ji="Accidents (motorcycles) [1/ha]";

            }
            else if ( selected_values["mot"] == "car_use" ) {//Carlos
                propertyName_ji="Car use [%]";
            }

            else if (  selected_values["mot"] == "pt_use" ) {//Carlos
                propertyName_ji="Use of PT [%]";

            }
            else if (  selected_values["mot"] == "bicycle_use" ) {//Carlos
                propertyName_ji="Bicycle Use [%]";
            }
            else if ( selected_values["mot"] == "moto_use" ) {//Carlos
                propertyName_ji="Motorcycle use [%]";
            }
            else if (  selected_values["mot"] == "walk_use" ) {//Carlos
                propertyName_ji="Walking [%]";
            }

            else if (  selected_values["mot"] == "time" ) {//Carlos
                propertyName_ji="Commuting time [min]";
            }
            else if ( selected_values["mot"] == "pollution" ) {//Carlos
                propertyName_ji="Pollution [PM2.5]";
            }
            if (propertyName_env && propertyName_ji) {

                if (access_geojson == null || access_geojson === 'undefined') {
                    mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathji,csvFilePathsg)
                        .then(mergedGeoJSON => {
                            // Do something with the merged GeoJSON
                            access_geojson = mergedGeoJSON;
                            handleJsonBiv(selectFeaturesWithTwoProperties(access_geojson, propertyName_ji,propertyName_env ))
                        });
                } else {
                    handleJsonBiv(selectFeaturesWithTwoProperties(access_geojson, propertyName_ji, propertyName_env))
                }
            }
            break;

        //UTAM Summary
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
