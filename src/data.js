
const jsonFilePath_map = './data/map_UTAMs.geojson';
const csvFilePathsg = './data/Social_disadvantage.csv';
const csvFilePathji = './data/Transport_disadvantage.csv';
const csvFilePathenv = './data/Environmental_disadvantage.csv';
const csvradar = './data/Radar.csv';
const csvmobinj = './data/MobInj.csv';

async function mergeGeoJSONandCSV(geojsonPath, csvPath) {
    // Load and parse the GeoJSON file
    const geojsonResponse = await fetch(geojsonPath);
    const geojson = await geojsonResponse.json();

    // Load and parse the CSV file
    const csvResponse = await fetch(csvPath);
    const csvText = await csvResponse.text();
    const csvData = Papa.parse(csvText, { header: true, delimiter: ";" }).data;

    // Create a lookup from the CSV data
    const csvLookup = {};
    csvData.forEach(row => {
        csvLookup[row.cod_upz] = row;
    });

    // Merge the CSV data into the GeoJSON features
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.cod_upz;
        if (csvLookup[refTnCod]) {
            // Convert numeric properties to float
            const floatProperties = convertNumericPropertiesToFloat(csvLookup[refTnCod]);
            feature.properties = { ...feature.properties, ...floatProperties };
        }
    });
    return geojson;
}

async function mergeGeoJSONandCSV2(geojsonPath, csvPath,csvPath2) {
    // Load and parse the GeoJSON file
    const geojsonResponse = await fetch(geojsonPath);
    const geojson = await geojsonResponse.json();

    // Load and parse the CSV file
    const csvResponse = await fetch(csvPath);
    const csvText = await csvResponse.text();
    const csvData = Papa.parse(csvText, { header: true, delimiter: ";" }).data;
    const csvResponse2 = await fetch(csvPath2);
    const csvText2 = await csvResponse2.text();
    const csvData2 = Papa.parse(csvText2, { header: true, delimiter: ";" }).data;

    // Create a lookup from the CSV data
    const csvLookup = {};
    csvData.forEach(row => {
        csvLookup[row.cod_upz] = row;
    });
    const csvLookup2 = {};
    csvData2.forEach(row => {
        csvLookup2[row.cod_upz] = row;
    });

    // Merge the CSV data into the GeoJSON features
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.cod_upz;
        if (csvLookup[refTnCod]) {
            // Convert numeric properties to float
            const floatProperties = convertNumericPropertiesToFloat(csvLookup[refTnCod]);
            feature.properties = { ...feature.properties, ...floatProperties };
        }
    })
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.cod_upz;
        if (csvLookup2[refTnCod]) {
            // Convert numeric properties to float
            const floatProperties = convertNumericPropertiesToFloat(csvLookup2[refTnCod]);
            feature.properties = { ...feature.properties, ...floatProperties };
        }
    });

    return geojson;
}
// Function to convert numeric properties to float
function convertNumericPropertiesToFloat(properties) {
    const floatProperties = {};
    for (const key in properties) {
        floatProperties[key] = isNumeric(properties[key]) ? parseFloat(properties[key]) : properties[key];
    }
    return floatProperties;
}

// Function to check if a value is numeric
function isNumeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

let ji_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathji)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        ji_geojson= mergedGeoJSON;
    });
let env_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathenv)
    .then(mergedGeoJSON => {
        env_geojson= mergedGeoJSON;
    });

let bi_geojson;
mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathsg,csvFilePathji)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        bi_geojson= mergedGeoJSON;
    });

let spat_geojson;
mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathsg, csvFilePathenv)
    .then(mergedGeoJSON => {
        spat_geojson= mergedGeoJSON;
    });

let access_geojson;
mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathji, csvFilePathenv)
    .then(mergedGeoJSON => {
        access_geojson= mergedGeoJSON;
    });

var sg_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathsg)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        sg_geojson= mergedGeoJSON;
    });
let mobinj_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvmobinj)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        mobinj_geojson= mergedGeoJSON;
    });


var radar_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvradar)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        radar_geojson= mergedGeoJSON;
    });
