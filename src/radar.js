/*******************************
 * radar.js                    *
 * Script file for Radar Plots *
 * Author: Héctor Ochoa Ortiz  *
 * Affil.: TUM SVP             *
 * Last update: 2023-05-03     *
 *******************************/

var currentLayer;

let labels_name = [
  "w",
  "u10",
  "u20",
  "o60",
  "vic",
  "ses",
  "m_slope",
  "walk_inf",
  "cycleway_density",
  "street_density",
  "fatalities",
  "injuries",
  "pollution",
  "car_use",
  "pt_use",
  "bicycle_use",
  "radar_walk_use",
  "moto_use",
  "time",
  "radar_e",
  "radar_h",
  "radar_g",
  "radar_c",
  "radar_ugs",
  "radar_PT",
  "radar_bike_sharing"
]

var radar;
var averages;

function radarPlot(e) {
  currentLayer = e.target;
  var properties = currentLayer.feature.properties;
  var propertyNames = Object.keys(properties).filter(key => typeof properties[key] === 'number').filter(name => properties[name] <= 1000);
  var labels = propertyNames.map(name => {
    // Split the name at the "[" sign and take the first part
    return name.split('[')[0].trim(); // trim() is used to remove any leading or trailing spaces
  });

  const config = {
    type: 'radar',
    data: {
      labels: labels_name.map(x => {
        // Tries to find the string "radar_<variable_name>" in the translation
        // If not found, just ask for the translation of <variable_name>
          tS = translateString(x);

        return tS;
      }),
      datasets: [
        {
          label: properties['nom_upz'],
          data: propertyNames.map(x =>  normalizeValue(properties[x], minMaxValues[x].min, minMaxValues[x].max)),
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderJoinStyle: 'round',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
        {
          label: translateString("avg_bogota"),
          data: propertyNames.map(x => normalizeValue(averages[x], minMaxValues[x].min, minMaxValues[x].max)),
          fill: true,
          backgroundColor: 'rgba(150, 150, 150, 0.2)',
          borderColor: 'rgb(150, 150, 150)',
          borderJoinStyle: 'round',
          pointBackgroundColor: 'rgb(150, 150, 150)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(150, 150, 150)'
        }
      ]
    },
    options: {
      aspectRatio: 1.4,
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          animate: false,
          angleLines: {
            display: true
          },
          suggestedMin: -0.2,
          suggestedMax: 1,
          pointLabels:{
            color: [
              ...Array(6).fill('#e41a1c'),
              ...Array(8).fill('#377eb8'),
              ...Array(6).fill('#4daf4a'),
              ...Array(4).fill('#984ea3'),
              ...Array(3).fill('#072140'),
            ],
            font: {
              size: 9
            },
            centerPointLabels: false
          },
        }
      },
      locale: document.querySelector("[data-i18n-switcher]").value

    },

  };

  return new Chart(document.getElementById('radar'), config);
}

function setAverage(data) {
  let found = data.features.find(element => element.properties["bzt_id"] == null);
  averages = found.properties;
}


function setAveragesForAllProperties(data) {
  let propertySums = {};
  let propertyCounts = {};

  data.features.forEach(feature => {
    Object.keys(feature.properties).forEach(propertyName => {
      let value = feature.properties[propertyName];
      // Check if the property value is numeric
      if (typeof value === 'number') {
        // Initialize if not already done
        if (!propertySums.hasOwnProperty(propertyName)) {
          propertySums[propertyName] = 0;
          propertyCounts[propertyName] = 0;
        }
        // Accumulate values and counts
        propertySums[propertyName] += value;
        propertyCounts[propertyName]++;
      }
    });
  });

  // Calculate averages
  let averagest = {};
  Object.keys(propertySums).forEach(propertyName => {
    averagest[propertyName] = propertySums[propertyName] / propertyCounts[propertyName];
  });

   averages=averagest;
}

var minMaxValues = {};

function setAveragesAndMinMaxForAllProperties(data) {

  // Initialize min and max tracking
  data.features.forEach(feature => {
    Object.keys(feature.properties).forEach(propertyName => {
      let value = feature.properties[propertyName];
      // Check if the property value is numeric
      if (typeof value === 'number') {
        if (!minMaxValues.hasOwnProperty(propertyName)) {
          minMaxValues[propertyName] = { min: Infinity, max: -Infinity };
        }
        // Initialize sums and counts if not already done
        // Accumulate values and counts
        // Update min and max values
        if (value < minMaxValues[propertyName].min) minMaxValues[propertyName].min = value;
        if (value > minMaxValues[propertyName].max) minMaxValues[propertyName].max = value;
      }

    });
  });


}

function normalizeValue(value, min, max) {
  return (value - min) / (max - min);
}

function handleJsonRadar(data) {
  biv = false;

  //setAverage(data);
  setAveragesForAllProperties(data);

  // Add data to download button
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  download.setAttribute("href", dataStr);
  download.setAttribute("download", "data.geojson");

  // If layer is empty, show error message and return
  if (data.features.length == 0) {
      alert('Error while querying, no features found.');
      return;
  }
  function style(feature) {
      return {
          fillColor: '#e8ae43',
          weight: 1,
          opacity: 1,
          color: 'grey',
          fillOpacity: 0.5
      };
  }

  var legend_text = '<h4>No neighbourhood selected</h4>';
  generateLegend(legend_text, true);

  // Callback when selecting a neighbourhood on the map
  function onClick(e) {
    // Remove the style, in case a previous neighbourhood was selected
    polygonLayer.resetStyle();

    // Zoom to the selected neighbourhood
    zoomToFeature(e);

    // Set style of the selected neighborhood
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.9
    });
    layer.bringToFront();

    // Generate the radar plot
    generateLegend('<div class="radar"><canvas id="radar"></canvas><div i18n="radar_norm" style="font-size:smaller;font-style:italic"></div></div>', true);
    setAveragesAndMinMaxForAllProperties(data);
    console.log(minMaxValues)
    radar = radarPlot(e);
  }

  function onEachFeature(feature, layer) {
      layer.on({
          click: onClick
      });
  }

  polygonLayer = L.geoJson(data, {
      attribution: '&copy; <a href="https://www.mos.ed.tum.de/sv/homepage/" i18n="chair"></a>',
      style: style,
      onEachFeature: onEachFeature
  }).addTo(map);

  translatePage();


}