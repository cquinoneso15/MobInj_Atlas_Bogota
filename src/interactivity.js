/*********************
 * MAP INTERACTIVITY *
 *********************/

// Add hovering functionality
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

    layer.bringToFront();
    if (areaLayer) { areaLayer.bringToFront(); }
    if (poiLayer) { poiLayer.bringToFront(); }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    polygonLayer.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    //this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    if (selected_values["map_type"] == "summ") {
        this._div.innerHTML = '<h4><span i18n="click"></span></h4>';
    } else {
        this._div.innerHTML = '<h4><span i18n="hover"></span></h4>';
    }

    if (biv) {
        var X = selected_values["justice"];
        if (X == "income") X = "inc";
        var Y = selected_values["v1"];
        var Z = selected_values["mot"];
        if((Y == "h"|| Y == "e" || Y == "g" || Y == "c" || Y == "ugs" || Y == "cicleway_density" || Y == "street_density" || Y == "walk_inf" || Y == "PT_stops" || Y == "bike_sharing" || Y == "m_slope") && (Z == "fatalities" || Z == "injuries" || Z == "acc_ped" || Z == "acc_car" || Z == "acc_bike" || Z == "acc_moto" || Z == "car_use" || Z == "pt_use" || Z == "bicycle_use" || Z == "moto_use" || Z == "walk_use" || Z == "time" || Z == "pollution")) {
            this._div.innerHTML += (props
                ? '<b>' + props.Delegation + '</b><br /><span i18n="' + selected_values["v1"] + '"></span> ' + props['Mob'].toFixed(2)  +' ('+ props['Unit_mobil'] +')'+'&nbsp;<br /><span i18n="' + selected_values["mot"] + '"></span> ' + props.Social.toFixed(2) +' ('+ props['Unit_social'] +')</span> '
                : '');
        } else {
            this._div.innerHTML += (props
                ? '<b>' + props.Delegation + '</b><br /><span i18n="' + selected_values["mot"] + '"></span> ' + props['Mob'].toFixed(2) + ' (' + props['Unit_mobil'] + ')' + '&nbsp;<br /><span i18n="' + selected_values["v1"] + '"></span> ' + props.Social.toFixed(2) + ' (' + props['Unit_social'] + ')</span> '
                : '');
        }
    } else {
        this._div.innerHTML += (props
            ? '<b>' + props.Delegation + '</b><br />' + props.Value.toFixed(2)  +' ('+ props['Unit'] +')'+ '&nbsp;<span i18n="'  + '"></span>'
            : '');
    }
    translatePage();
};

info.addTo(map);


// Add scale
var scale = L.control.scale({ metric: true, imperial: false }).addTo(map);

/*************************
 * END MAP INTERACTIVITY *
 *************************/