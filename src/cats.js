/**************************************************
 * map.js                                         *
 * Script file for categories and other variables *
 * Author: Héctor Ochoa Ortiz                     *
 * Affil.: TUM SVP                                *
 * Last update: 2023-04-27                        *
 **************************************************/

/**
 * Find out if a selector is disabled, by checking its children nodes.
 *
 * @param {string} name The name of the selector.
 * @return {boolean} True if the selector with name name has no children (is disabled). False otherwise.
 */
function isDisabled(name) {
    return document.querySelector('#' + name).children.length == 0;
}

/**
 * Returns the checked value of a selector with name name.
 *
 * @param {string} name The name of the selector.
 * @return {string} Returns the checked value of a selector with name name.
 */
function getValue(name) {
    return $('input[name="' + name +'"]:checked').val();
}

/**
 * Sets the checked value of a selector with name name.
 * If the value is not in the selector, do nothing.
 *
 * @param {string} name The name of the selector.
 */
function setValue(name, value) {
    if (valueInSelect(name, value)) {
        let input = $('input[name="' + name +'"][value="' + value + '"]')[0];
        input.checked = true;
        input.dispatchEvent(new Event('change'));
    }
}

/**
 * Find out if an option with value value is in a selector with name name.
 *
 * @param {string} name The name of the selector.
 * @return {boolean} True if the selector with name name has an option with value value. False otherwise.
 */
function valueInSelect(name, value) {
    if (value === '' || value === '#') return false;

    // Check if the value is among the options
    return $('input[name="' + name +'"][value="' + value + '"]').length != 0;
}

// Starting values
var selector_values_before_sp_0 = [
    {
        "value": "sg",
        "desc": "desc_sg"
    },
    {
        "value": "ji",
        "desc": "desc_ji"
    },
    {
        "value": "env",
        "desc": "env_desc"
    },
    {
        "value": "ji_v_sg",
        "desc": "desc_ji_v_sg"
    },
    {
        "value": "spat",
        "desc": "spat_desc"
    },
    {
        "value": "access",
        "desc": "access_desc"
    },
    {
        "value": "mobinj",
        "desc": "mobinj_desc"
    },
    {
        "value": "summ",
        "desc": "desc_summ"
    },
    /*{
        "value": "diff_sg",
        "desc": "desc_diff_sg"
    },*/

]

// Selector values
var selector_values_after_sp_0 = {
    "sg": {
        "title": "select_sg",
        "values": [
            {
                "value": "tp",
                "desc": "desc"
            },
            {
                "value": "w",
                "desc": "desc"
            },
            {
                "value": "o60",
                "desc": "desc"
            },
            {
                "value": "u10",
                "desc": "desc"
            },

            {
                "value": "u20",
                "desc": "desc"
            },
            {
                "value": "vic",
                "desc": "desc"
            },
            {
                "value": "ses",
                "desc": "desc"
            }
        ]
    },
    "ji": {
        "title": "select_justice",
        "values": [
            {
                "value": "accidents",
                "desc": "desc"
            },
            {
                "value": "beh",
                "desc": "desc"
            },
            {
                "value": "time",
                "desc": "desc"
            },
            {
                "value": "pollution",
                "desc": "desc"
            }

        ]
    },

    "env":{
        "title": "select_justice",
        "values": [
            {
                "value": "amenities",
                "desc": "desc"
            },
            {
                "value": "ava",
                "desc": "desc"
            },
            {
                "value": "stations",
                "desc": "desc"
            },
            {
                "value": "m_slope",
                "desc": "desc"
            }

        ]
    },

    "ji_v_sg": {
        "title": "select_justice",
        "values": [
            {
                "value": "accidents",
                "desc": "desc"
            },
            {
                "value": "select_beh",
                "desc": "desc"
            },
            {
                "value": "time",
                "desc": "desc"
            },
            {
                "value": "pollution",
                "desc": "desc"
            }
        ]
    },
    "spat":{
        "title": "select_justice",
        "values": [
            {
                "value": "amenities",
                "desc": "desc"
            },
            {
                "value": "ava",
                "desc": "desc"
            },
            {
                "value": "stations",
                "desc": "desc"
            },
            {
                "value": "m_slope",
                "desc": "desc"
            }
        ]
    },
    "access":{
        "title": "select_justice",
        "values": [
            {
                "value": "accidents",
                "desc": "desc"
            },
            {
                "value": "select_beh",
                "desc": "desc"
            },
            {
                "value": "time",
                "desc": "desc"
            },
            {
                "value": "pollution",
                "desc": "desc"
            }
        ]
    },
    "mobinj":{
        "title": "select_justice",
        "values": [
            {
                "value": "clusters",
                "desc": "desc"
            },
            {
                "value": "mob_inj_score",
                "desc": "desc"
            }
        ]
    },
    "summ": {}

}

//subcategories of the disadvantages
var selector_values_after_sp_1 = {
    //no subcategories for social disadvantages
    "sg": {},
    //subcategories for transport disadvantages
    "ji": {
        "accidents": {
            "v1": {
                "title": "accidents",
                "values": [
                    {
                        "value": "fatalities",
                        "desc": "desc"
                    },
                    {
                        "value": "injuries",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_ped",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_car",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_bike",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_moto",
                        "desc": "desc"
                    }
                ]
            }
        },
        "beh": {
            "v1": {
                "title": "select_beh",
                "values": [
                    {
                        "value": "car_use",
                        "desc": "desc"
                    },
                    {
                        "value": "pt_use",
                        "desc": "desc"
                    },
                    {
                        "value": "bicycle_use",
                        "desc": "desc"
                    },
                    {
                        "value": "moto_use",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_use",
                        "desc": "desc"
                    }
                ]
            }
        },
        "time": {
            "v1":{
                "title": "time",
                "values": [
                    {
                        "value": "time",
                        "desc": "desc"
                    }
                ]
            }
        },
        "pollution": {
            "v1":{
                "title": "pollution",
                "values": [
                    {
                        "value": "pollution",
                        "desc": "desc"
                    }
                ]
            }
        }

    },
    //subcategories for environmental disadvantages
    "env":{
        "amenities": {
            "v1": {
                "title": "amenities",
                "values": [
                  {
                      "value":"h",
                      "desc": "desc"
                  },
                  {
                      "value":"e",
                      "desc": "desc"
                  },
                  {
                      "value":"g",
                      "desc": "desc"
                  },
                  {
                      "value":"c",
                      "desc": "desc"
                  },
                  {
                      "value":"ugs",
                      "desc": "desc"
                  }
              ]
          }
      },
        "ava":{
          "v1":{
              "title": "select_ava",
              "values": [
                  {
                      "value": "cycleway_density",
                      "desc": "desc"
                  },
                  {
                      "value": "street_density",
                      "desc": "desc"
                  },
                  {
                      "value": "walk_inf",
                      "desc": "desc"
                  }
              ]
          }
        },
        "stations":{
          "v1":{
              "title": "stations",
              "values": [
                  {
                      "value": "PT_stops",
                      "desc": "desc"
                  },
                  {
                      "value": "bike_sharing",
                      "desc": "desc"
                  },
              ]
          }
        },
        "m_slope":{
            "v1":{
                "title": "m_slope",
                "values": [
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            }
        }
    },
    //subcategories for mobility disadvantages
    "ji_v_sg": {
        "accidents": {
          "v1":{
              "title": "select_sg",
              "values": [
                  {
                      "value": "tp",
                      "desc": "desc"
                  },
                  {
                      "value": "w",
                      "desc": "desc"
                  },
                  {
                      "value": "o60",
                      "desc": "desc"
                  },
                  {
                      "value": "u10",
                      "desc": "desc"
                  },

                  {
                      "value": "u20",
                      "desc": "desc"
                  },
                  {
                      "value": "vic",
                      "desc": "desc"
                  },
                  {
                      "value": "ses",
                      "desc": "desc"
                  }
              ]
          },
            "mot": {
                "title": "accidents",
                "values": [
                    {
                        "value": "fatalities",
                        "desc": "desc"
                    },
                    {
                        "value": "injuries",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_ped",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_car",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_bike",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_moto",
                        "desc": "desc"
                    }
                ]
            }
        },
        "select_beh":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "select_beh",
                "values": [
                    {
                        "value": "car_use",
                        "desc": "desc"
                    },
                    {
                        "value": "pt_use",
                        "desc": "desc"
                    },
                    {
                        "value": "bicycle_use",
                        "desc": "desc"
                    },
                    {
                        "value": "moto_use",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_use",
                        "desc": "desc"
                    }
                ]
            }
        },
        "time":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "time",
                "values": [
                    {
                        "value": "time",
                        "desc": "desc"
                    }
                ]
            }
        },
        "pollution":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "pollution",
                "values": [
                    {
                        "value": "pollution",
                        "desc": "desc"
                    }
                ]
            }
        }
    },
    //subcategories for spatial disadvantages
    "spat":{
        "amenities":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "amenities",
                "values": [
                    {
                        "value":"h",
                        "desc": "desc"
                    },
                    {
                        "value":"e",
                        "desc": "desc"
                    },
                    {
                        "value":"g",
                        "desc": "desc"
                    },
                    {
                        "value":"c",
                        "desc": "desc"
                    },
                    {
                        "value":"ugs",
                        "desc": "desc"
                    }
                ]
            }
        },
        "ava":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "select_ava",
                "values": [
                    {
                        "value": "cycleway_density",
                        "desc": "desc"
                    },
                    {
                        "value": "street_density",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_inf",
                        "desc": "desc"
                    }
                ]
            }
        },
        "stations":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "stations",
                "values": [
                    {
                        "value": "PT_stops",
                        "desc": "desc"
                    },
                    {
                        "value": "bike_sharing",
                        "desc": "desc"
                    }
                ]
            }
        },
        "m_slope":{
            "v1":{
                "title": "select_sg",
                "values": [
                    {
                        "value": "tp",
                        "desc": "desc"
                    },
                    {
                        "value": "w",
                        "desc": "desc"
                    },
                    {
                        "value": "o60",
                        "desc": "desc"
                    },
                    {
                        "value": "u10",
                        "desc": "desc"
                    },

                    {
                        "value": "u20",
                        "desc": "desc"
                    },
                    {
                        "value": "vic",
                        "desc": "desc"
                    },
                    {
                        "value": "ses",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "m_slope",
                "values": [
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            }
        }
    },
    //subcategories for accessibility disadvantages
    "access":{
        "accidents": {
            "v1":{
                "title": "env",
                "values": [
                    {
                        "value":"h",
                        "desc": "desc"
                    },
                    {
                        "value":"e",
                        "desc": "desc"
                    },
                    {
                        "value":"g",
                        "desc": "desc"
                    },
                    {
                        "value":"c",
                        "desc": "desc"
                    },
                    {
                        "value":"ugs",
                        "desc": "desc"
                    },
                    {
                        "value": "cycleway_density",
                        "desc": "desc"
                    },
                    {
                        "value": "street_density",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_inf",
                        "desc": "desc"
                    },
                    {
                        "value": "PT_stops",
                        "desc": "desc"
                    },
                    {
                        "value": "bike_sharing",
                        "desc": "desc"
                    },
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "accidents",
                "values": [
                    {
                        "value": "fatalities",
                        "desc": "desc"
                    },
                    {
                        "value": "injuries",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_ped",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_car",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_bike",
                        "desc": "desc"
                    },
                    {
                        "value": "acc_moto",
                        "desc": "desc"
                    }
                ]
            }
        },
        "select_beh":{
            "v1":{
                "title": "env",
                "values": [
                    {
                        "value":"h",
                        "desc": "desc"
                    },
                    {
                        "value":"e",
                        "desc": "desc"
                    },
                    {
                        "value":"g",
                        "desc": "desc"
                    },
                    {
                        "value":"c",
                        "desc": "desc"
                    },
                    {
                        "value":"ugs",
                        "desc": "desc"
                    },
                    {
                        "value": "cycleway_density",
                        "desc": "desc"
                    },
                    {
                        "value": "street_density",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_inf",
                        "desc": "desc"
                    },
                    {
                        "value": "PT_stops",
                        "desc": "desc"
                    },
                    {
                        "value": "bike_sharing",
                        "desc": "desc"
                    },
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "select_beh",
                "values": [
                    {
                        "value": "car_use",
                        "desc": "desc"
                    },
                    {
                        "value": "pt_use",
                        "desc": "desc"
                    },
                    {
                        "value": "bicycle_use",
                        "desc": "desc"
                    },
                    {
                        "value": "moto_use",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_use",
                        "desc": "desc"
                    }
                ]
            }
        },
        "time":{
            "v1":{
                "title": "env",
                "values": [
                    {
                        "value":"h",
                        "desc": "desc"
                    },
                    {
                        "value":"e",
                        "desc": "desc"
                    },
                    {
                        "value":"g",
                        "desc": "desc"
                    },
                    {
                        "value":"c",
                        "desc": "desc"
                    },
                    {
                        "value":"ugs",
                        "desc": "desc"
                    },
                    {
                        "value": "cycleway_density",
                        "desc": "desc"
                    },
                    {
                        "value": "street_density",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_inf",
                        "desc": "desc"
                    },
                    {
                        "value": "PT_stops",
                        "desc": "desc"
                    },
                    {
                        "value": "bike_sharing",
                        "desc": "desc"
                    },
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "time",
                "values": [
                    {
                        "value":"time",
                        "desc": "desc"
                    }
                ]
            }
        },
        "pollution":{
            "v1":{
                "title": "env",
                "values": [
                    {
                        "value":"h",
                        "desc": "desc"
                    },
                    {
                        "value":"e",
                        "desc": "desc"
                    },
                    {
                        "value":"g",
                        "desc": "desc"
                    },
                    {
                        "value":"c",
                        "desc": "desc"
                    },
                    {
                        "value":"ugs",
                        "desc": "desc"
                    },
                    {
                        "value": "cycleway_density",
                        "desc": "desc"
                    },
                    {
                        "value": "street_density",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_inf",
                        "desc": "desc"
                    },
                    {
                        "value": "PT_stops",
                        "desc": "desc"
                    },
                    {
                        "value": "bike_sharing",
                        "desc": "desc"
                    },
                    {
                        "value": "m_slope",
                        "desc": "desc"
                    }
                ]
            },
            "mot":{
                "title": "pollution",
                "values": [
                    {
                        "value":"pollution",
                        "desc": "desc"
                    }
                ]
            }
        }
    },

    "mobinj":{},

    "diff_sg": {
        "ava": {
            "v1": {
                "title": "select_sg",
                "values": [
                    {
                        "value": "gender",
                        "desc": "desc"
                    },
                    {
                        "value": "education",
                        "desc": "desc"
                    },
                    {
                        "value": "income",
                        "desc": "desc"
                    },
                    {
                        "value": "age_young",
                        "desc": "desc"
                    },
                    {
                        "value": "age_old",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "select_mot",
                "values": [
                    {
                        "value": "has_driving_license",
                        "desc": "desc"
                    },
                    {
                        "value": "owns_bike",
                        "desc": "desc"
                    },
                    {
                        "value": "owns_ebike",
                        "desc": "desc"
                    },
                    {
                        "value": "owns_car_sharing_membership",
                        "desc": "desc"
                    }
                ]
            }
        },
        "beh": {
            "v1": {
                "title": "select_sg",
                "values": [
                    {
                        "value": "gender",
                        "desc": "desc"
                    },
                    {
                        "value": "education",
                        "desc": "desc"
                    },
                    {
                        "value": "income",
                        "desc": "desc"
                    },
                    {
                        "value": "age_young",
                        "desc": "desc"
                    },
                    {
                        "value": "age_old",
                        "desc": "desc"
                    }
                ]
            },
            "mot": {
                "title": "select_mot",
                "values": [
                    {
                        "value": "car_usage",
                        "desc": "desc"
                    },
                    {
                        "value": "pt_usage",
                        "desc": "desc"
                    },
                    {
                        "value": "irr_pt_usage",
                        "desc": "desc"
                    },
                    {
                        "value": "walk_usage",
                        "desc": "desc"
                    }
                ]
            }
        }
        ,
        "temp": {
            "v1": {
                "title": "select_temp",
                "values": [
                    {
                        "value": "pt_frequ",
                        "desc": "desc"
                    }
                    ,
                    {
                        "value": "dur_15",
                        "desc": "desc"
                    },
                    {
                        "value": "dur_30",
                        "desc": "desc"
                    }
                ]
            },
            "summ":{},
        }
    }
}

var selected_values;

function updateSelectorAfterSP0(name, map_type_value) {
    // Find the .select-main to change
    let curr_sp = document.querySelector('#sp-1');
    curr_sp.style.display = 'block';

    try {
        // Change its title
        let select_title_text = curr_sp.querySelector('.select-title-text');
        select_title_text.setAttribute("i18n", selector_values_after_sp_0[map_type_value]["title"])

        // Fetch possible values
        let selector_dict = selector_values_after_sp_0[map_type_value]["values"];
        if (selector_dict.length == 0) { throw EvalError; }

        // Empty select options
        let select_options = curr_sp.querySelector(".select-options");
        select_options.innerHTML = "";

        // Create the different options
        for (const v of selector_dict) {
            var option = document.createElement("div");
            option.setAttribute("class", "select-option");

            var radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", name);
            radio.setAttribute("id", v["value"]);
            radio.setAttribute("value", v["value"]);
            option.appendChild(radio);

            var label = document.createElement("label");
            label.setAttribute("for", v["value"]);
            label.setAttribute("i18n", v["value"]);
            option.appendChild(label);

            if (v["desc"] !== "desc") {
                var info = document.createElement("div");
                info.setAttribute("class", "select-title-info");
                info.innerHTML = "&#x1F6C8;";

                var info_tooltip = document.createElement("span");
                info_tooltip.setAttribute("class", "info-tooltip");
                info_tooltip.setAttribute("i18n", v["desc"]);
                info.appendChild(info_tooltip);

                option.appendChild(info);
            }
            select_options.appendChild(option);
        }

        // Unfold in the interface
        curr_sp.querySelector("input[type=checkbox]").checked = true;

        // Add function when checked
        $('input[type=radio][name=' + name + ']').change(function() {
            updateSelectorAfterSP1("v1", this.value);
            updateSelectorAfterSP1("amenity", this.value);
            updateSelectorAfterSP1("mot", this.value);
            
            if (correctValues()) {
                changeMap();
            }
        });
    } catch (error) {
        curr_sp.style.display = 'none';

        // Empty select options
        let select_options = curr_sp.querySelector(".select-options");
        select_options.innerHTML = "";
    }
    translatePage();
}

function updateSelectorAfterSP1(name, justice_value) {
    let map_type_value = getValue("map_type");

    let sp = {
        "v1": "sp-2",
        "amenity": "sp-3",
        "mot": "sp-4"
    }

    // Find the .select-main to change
    let curr_sp = document.querySelector('#' + sp[name]);
    curr_sp.style.display = 'block';

    try {
        // Change its title
        let select_title_text = curr_sp.querySelector('.select-title-text');
        select_title_text.setAttribute("i18n", selector_values_after_sp_1[map_type_value][justice_value][name]["title"])

        // Fetch possible values
        let selector_dict = selector_values_after_sp_1[map_type_value][justice_value][name]["values"];
        if (selector_dict.length == 0) { throw EvalError; }

        // Empty select options
        let select_options = curr_sp.querySelector(".select-options");
        select_options.innerHTML = "";

        // Create the different options
        for (const v of selector_dict) {
            var option = document.createElement("div");
            option.setAttribute("class", "select-option");

            var radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", name);
            radio.setAttribute("id", v["value"]);
            radio.setAttribute("value", v["value"]);
            option.appendChild(radio);

            var label = document.createElement("label");
            label.setAttribute("for", v["value"]);
            label.setAttribute("i18n", v["value"]);
            option.appendChild(label);

            if (v["desc"] !== "desc") {
                var info = document.createElement("div");
                info.setAttribute("class", "select-title-info");
                info.innerHTML = "&#x1F6C8;";

                var info_tooltip = document.createElement("span");
                info_tooltip.setAttribute("class", "info-tooltip");
                info_tooltip.setAttribute("i18n", v["desc"]);
                info.appendChild(info_tooltip);

                option.appendChild(info);
            }
            select_options.appendChild(option);
        }

        // Unfold in the interface
        curr_sp.querySelector("input[type=checkbox]").checked = true;

        // Add function when checked
        $('input[type=radio][name=' + name + ']').change(function() {
            if (correctValues()) {
                changeMap();
            }
        });
    } catch (error) {
        curr_sp.style.display = 'none';

        // Empty select options
        let select_options = curr_sp.querySelector(".select-options");
        select_options.innerHTML = "";
    }
    translatePage();
}

// Add callback for SP0
$('input[type=radio][name=map_type]').change(function() {
    updateSelectorAfterSP0("justice", this.value);
    updateSelectorAfterSP1("v1", "", "");
    updateSelectorAfterSP1("amenity", "", "");
    updateSelectorAfterSP1("mot", "", "");

    if (correctValues()) {
        changeMap();
    }
});

function valueInList(list, value) {
    try {
        for (let item of list["values"]) {
            if (item.value === value)
                return true;
        }
    } catch {}
    return false;
}

function listLength(list) {
    try {
        return list["values"].length;
    } catch {}
    return 0;
}

function correctValues(values) {
    if (values == undefined) {
        // If value dict not passed, use selectors
        if (getValue("map_type") == "summ") return true;

        if (getValue("justice") == undefined) return false;
        
        return ((!isDisabled("v1") && getValue("v1") != undefined) || isDisabled("v1"))
        && ((!isDisabled("amenity") && getValue("amenity") != undefined) || isDisabled("amenity"))
        && ((!isDisabled("mot") && getValue("mot") != undefined) || isDisabled("mot"));
    } else {
        // Otherwise check in values dict
        if (values["map_type"] == "summ") return true;

        if (values["justice"] == undefined) return false;

        let c_v1;
        try {
            c_v1 = (listLength(selector_values_after_sp_1[values["map_type"]][values["justice"]]["v1"]) == 0) ||
            (valueInList(selector_values_after_sp_1[values["map_type"]][values["justice"]]["v1"], values["v1"]));
        } catch {
            c_v1 = true;
        }

        let c_amenity;
        try {
            c_amenity = (listLength(selector_values_after_sp_1[values["map_type"]][values["justice"]]["amenity"]) == 0) ||
            (valueInList(selector_values_after_sp_1[values["map_type"]][values["justice"]]["amenity"], values["amenity"]));
        } catch {
            c_amenity = true;
        }

        let c_mot;
        try {
            c_mot = (listLength(selector_values_after_sp_1[values["map_type"]][values["justice"]]["mot"]) == 0) ||
            (valueInList(selector_values_after_sp_1[values["map_type"]][values["justice"]]["mot"], values["mot"]));
        } catch {
            c_mot = true;
        }
        
        return c_v1 && c_amenity && c_mot;
    }
}
