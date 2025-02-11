/************************************
 * bivariate.js                     *
 * Ajax callback for bivariate data *
 * Author: Héctor Ochoa Ortiz       *
 * Affil.: TUM SVP                  *
 ************************************/

var biv_breakpoint_pop;
var biv_quart_pop;
var biv_breakpoint_X;
var biv_quart_X;

// This function gets called from the GeoServer response
function handleJsonBiv(data) {
    biv = true;

    var X = selected_values["justice"];
    if (X == "income") {X = "inc";}
    console.log(data)

    var quants_social = getQuants(data,"Social");
    var quants_mob = getQuants(data,"Mob");
    biv_breakpoint_pop = data.features[0].properties["pop_breakpoint_value"];
    biv_quart_pop = quants_social['Q3'];
    biv_breakpoint_X = data.features[0].properties[X + "_breakpoint_value"];
    biv_quart_X = quants_mob['Q2'];
    // Add data to download button
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    download.setAttribute("href", dataStr);
    download.setAttribute("download", "data.geojson");

    // If layer is empty, show error message and return
    if (data.features.length == 0) {
        alert('Error while querying, no features found.');
        return;
    }

    function getCritical(variable) {
        return 'High' ;
    }

    function getNonCritical(variable) {
        return ((getCritical(variable) == 'High') ? 'Low' : 'High');
    }

    function getColorBiv(v1, v2) {
        let v1_critical =biv_quart_pop;
        let v2_critical = biv_quart_X;
        if (v1 < v1_critical) {
            if (v2 < v2_critical) {
                return '#64acbe';
            } else {
                return '#e8e8e1';
            }
        } else {
            if (v2 >= v2_critical) {
                return '#574249';
            } else {
                return '#c85a5a';
            }
        }
    }


    function style(feature) {
        return {
            fillColor: getColorBiv(feature.properties["Social"], feature.properties["Mob"]),
            weight: 0.5,
            opacity: 1,
            color: '#1a1a1a',
            fillOpacity: 0.7
        };
    }

    // Add legend
    if(selected_values["amenity"]!='accidents'){
    generateLegend('<svg width="220" height="200" viewBox="-13 0 107 100" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>' +
        '<g transform="translate(15 30) rotate(-45)">' +
        '<title>Bivariate legend</title>' +
        '<rect height="18" width="18" y="2" x="0" stroke="#000" fill="' + '#e8e8e1' + '"/>' + //low social  high
        '<rect height="18" width="18" y="2" x="18" stroke="#000" fill="' + '#574249' + '"/>' + //high high
        '<rect height="18" width="18" y="20" x="0" stroke="#000" fill="' + '#64acbe' + '"/>' + //low low
        '<rect height="18" width="18" y="20" x="18" stroke="#000" fill="' + '#c85a5a' + '"/>' +
        '<path d="M0,0 v38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none"' + ((getCritical(biv_quart_X) == 'High') ? ' marker-start="url(#arrow)"' : ' marker-end="url(#arrow)"') + '/>' +
        '<path d="M0,38 h38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none"' + ((getCritical(biv_quart_pop) == 'Low') ? ' marker-start="url(#arrow)"' : ' marker-end="url(#arrow)"') + '/>' +
        '<text font-weight="bold" font-size="0.4em" transform="translate(-10, 18) rotate(90)" text-anchor="middle" i18n="' + selected_values["amenity"] + '"></text>' +
        //'<text font-size="0.4em" transform="translate(-17, 18) rotate(90)" text-anchor="middle" i18n="' + data.features[0].properties["value_desc_" + X] + '"></text>' +
        '<text font-weight="bold" font-size="0.4em" transform="translate(18, 48)" text-anchor="middle" i18n="' + selected_values["v1"] + '"></text>' +
        //'<text font-size="0.4em" transform="translate(18, 55)" text-anchor="middle" i18n="' + data.features[0].properties["value_desc_pop"] + '"></text>' +
        '</g>' +
        '<g transform="translate(25 10)">' +
        '<path d="M0,80 h38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>' +
        '<text font-size="0.4em" transform="translate(-5, 82)" text-anchor="end" i18n="Low"></text>' +
        '<text font-size="0.4em" transform="translate(45, 82)" text-anchor="start" i18n="High"></text>' +
        '</g>' +
        '</svg>'+
        '<div style="width:220px;"><span i18n="desc_biv" style="font-size:smaller;"></span> (<i class="square" style="display:inline-block;float:none;margin:0;background:' + '#c85a5a' + '" ></i>)</div>',
        false);
    }
    else{
        generateLegend('<svg width="220" height="200" viewBox="-13 0 107 100" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>' +
            '<g transform="translate(15 30) rotate(-45)">' +
            '<title>Bivariate legend</title>' +
            '<rect height="18" width="18" y="2" x="0" stroke="#000" fill="' + '#e8e8e1' + '"/>' + //low social  high
            '<rect height="18" width="18" y="2" x="18" stroke="#000" fill="' + '#574249' + '"/>' + //high high
            '<rect height="18" width="18" y="20" x="0" stroke="#000" fill="' + '#64acbe' + '"/>' + //low low
            '<rect height="18" width="18" y="20" x="18" stroke="#000" fill="' + '#c85a5a' + '"/>' +
            '<path d="M0,0 v38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none"' + ((getCritical(biv_quart_X) == 'High') ? ' marker-start="url(#arrow)"' : ' marker-end="url(#arrow)"') + '/>' +
            '<path d="M0,38 h38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none"' + ((getCritical(biv_quart_pop) == 'Low') ? ' marker-start="url(#arrow)"' : ' marker-end="url(#arrow)"') + '/>' +
            '<text font-weight="bold" font-size="0.4em" transform="translate(-10, 18) rotate(90)" text-anchor="middle" i18n="' + selected_values["amenity"] + '"></text>' +
            //'<text font-size="0.4em" transform="translate(-17, 18) rotate(90)" text-anchor="middle" i18n="' + data.features[0].properties["value_desc_" + X] + '"></text>' +
            '<text font-weight="bold" font-size="0.4em" transform="translate(18, 48)" text-anchor="middle" i18n="' + selected_values["v1"] + '"></text>' +
            //'<text font-size="0.4em" transform="translate(18, 55)" text-anchor="middle" i18n="' + data.features[0].properties["value_desc_pop"] + '"></text>' +
            '</g>' +
            '<g transform="translate(25 10)">' +
            '<path d="M0,80 h38" opacity="1" stroke-linecap="butt" stroke-linejoin="bevel" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>' +
            '<text font-size="0.4em" transform="translate(-5, 82)" text-anchor="end" i18n="Low"></text>' +
            '<text font-size="0.4em" transform="translate(45, 82)" text-anchor="start" i18n="High"></text>' +
            '</g>' +
            '</svg>'+
            '<div style="width:220px;"><span i18n="desc_biv" style="font-size:smaller;"></span> (<i class="square" style="display:inline-block;float:none;margin:0;background:' +  '#574249' + '" ></i>)</div>',
            false);
    }


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

    // Reorder layers
    if (areaLayer) {
        areaLayer.bringToFront();
        if (poiLayer) {
            poiLayer.bringToFront();
        }
    }

    translatePage();
}
