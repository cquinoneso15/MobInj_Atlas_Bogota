
const jsonFilePath_map = './data/map_delegation.geojson';
const csvFilePathsg = './data/Social_disadvantage.csv';
const csvFilePathji = './data/geojson_transport_disa.csv';
const csvradar = './data/Radar.csv';

async function mergeGeoJSONandCSV(geojsonPath, csvPath) {
    // Load and parse the GeoJSON file
    const geojsonResponse = await fetch(geojsonPath);
    const geojson = await geojsonResponse.json();

    // Load and parse the CSV file
    const csvResponse = await fetch(csvPath);
    const csvText = await csvResponse.text();
    const csvData = Papa.parse(csvText, { header: true }).data;

    // Create a lookup from the CSV data
    const csvLookup = {};
    csvData.forEach(row => {
        csvLookup[row.ref_tn_cod] = row;
    });

    // Merge the CSV data into the GeoJSON features
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.ref_tn_cod;
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
    const csvData = Papa.parse(csvText, { header: true }).data;
    const csvResponse2 = await fetch(csvPath2);
    const csvText2 = await csvResponse2.text();
    const csvData2 = Papa.parse(csvText2, { header: true }).data;

    // Create a lookup from the CSV data
    const csvLookup = {};
    csvData.forEach(row => {
        csvLookup[row.ref_tn_cod] = row;
    });
    const csvLookup2 = {};
    csvData2.forEach(row => {
        csvLookup2[row.ref_tn_cod] = row;
    });

    // Merge the CSV data into the GeoJSON features
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.ref_tn_cod;
        if (csvLookup[refTnCod]) {
            // Convert numeric properties to float
            const floatProperties = convertNumericPropertiesToFloat(csvLookup[refTnCod]);
            feature.properties = { ...feature.properties, ...floatProperties };
        }
    })
    geojson.features.forEach(feature => {
        const refTnCod = feature.properties.ref_tn_cod;
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
let bi_geojson;
mergeGeoJSONandCSV2(jsonFilePath_map, csvFilePathsg,csvFilePathji)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        bi_geojson= mergedGeoJSON;
    });

var sg_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvFilePathsg)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        sg_geojson= mergedGeoJSON;
    });


var radar_geojson;
mergeGeoJSONandCSV(jsonFilePath_map, csvradar)
    .then(mergedGeoJSON => {
        // Do something with the merged GeoJSON
        radar_geojson= mergedGeoJSON;
    });
