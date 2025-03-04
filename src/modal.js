const about_us_btn = document.querySelector('#about_us');
var span = document.getElementsByClassName("close")[0];
var modal_about = document.getElementById("modal-about");

var temporaryValues = {};

function createCatSelection (name) {
    var content = modal_about.querySelector('.modal-content').querySelector('.modal-text');
    if (correctValues(temporaryValues)) {
        selected_values = temporaryValues;
        window.location.href = createShareURL();
    } else {
        let cat_selection = content.querySelector('.cat-selection');
        cat_selection.innerHTML = "";
        var values_dict;
        try {
            switch (name) {
                case "map_type":
                    values_dict = selector_values_before_sp_0;
                    break;
                case "justice":
                    values_dict = selector_values_after_sp_0[temporaryValues["map_type"]]["values"];
                    break;
                default:
                    values_dict = selector_values_after_sp_1[temporaryValues["map_type"]][temporaryValues["justice"]][name]["values"];
                    break;
            }
        } catch {
            var next;
            switch(name) {
                case "map_type":
                    next = "justice";
                    break;
                case "justice":
                    next = "amenity";
                    break;
                case "amenity":
                    next = "mot";
                    break;
                case "mot":
                    next = "v1";
                    break;
            }

            createCatSelection(next);
            return;
        }

        for (let v of values_dict) {
            let option = document.createElement("button");
            option.setAttribute("class", "cat-selection-option");
            option.setAttribute("value", v["value"]);

            let option_text = document.createElement("div");
            option_text.setAttribute("class", "cat-selection-option-text");
            option_text.setAttribute("i18n", v["value"]);
            option.appendChild(option_text);

            let option_desc = document.createElement("div");
            option_desc.setAttribute("class", "cat-selection-option-desc");
            option_desc.setAttribute("i18n", v["desc"]);
            option.appendChild(option_desc);

            option.onclick = function() {
                temporaryValues[name] = this.value;

                var next;
                switch(name) {
                    case "map_type":
                        next = "justice";
                        break;
                    case "justice":
                        next = "amenity";
                        break;
                    case "amenity":
                        next = "mot";
                        break;
                    case "mot":
                        next = "v1";
                        break;
                }

                createCatSelection(next);
            }
            cat_selection.appendChild(option);
        }

        let cat_title = content.querySelector('.cat-title');
        var select_name;
        switch (name) {
            case "map_type":
                select_name = "select_map_type";
                break;
            case "justice":
                select_name = selector_values_after_sp_0[temporaryValues["map_type"]]["title"];
                break;
            default:
                select_name = selector_values_after_sp_1[temporaryValues["map_type"]][temporaryValues["justice"]][name]["title"];
                break;
        }

        cat_title.setAttribute("i18n", select_name);
        translatePage();
    }

}

function createPersonDiv (name, affil, photo, desc, socials) {
    // Create the person div
    var p = document.createElement("div");
    p.setAttribute("class", "person");

    // Create each element, append it to the person div

    var photo_img = document.createElement("img");
    photo_img.setAttribute("class", "person-photo");
    photo_img.setAttribute("src", photo);
    photo_img.setAttribute("alt", name);
    p.appendChild(photo_img);

    var name_div = document.createElement("div");
    name_div.setAttribute("class", "person-name");
    name_div.textContent = name;
    p.appendChild(name_div);

    var affil_div = document.createElement("div");
    affil_div.setAttribute("class", "person-affil");
    affil_div.setAttribute("i18n", affil);
    p.appendChild(affil_div);

    p.appendChild(document.createElement("hr"));

    var desc_p = document.createElement("p");
    desc_p.setAttribute("class", "person-desc");
    desc_p.setAttribute("i18n", desc);
    p.appendChild(desc_p);

    var affil_div = document.createElement("div");
    affil_div.setAttribute("class", "person-socials");
    // Loop for each social
    for (let s of Object.keys(socials)) {
        var social_a = document.createElement("a");
        social_a.setAttribute("class", "social-button");
        social_a.setAttribute("href", socials[s]);
        social_a.setAttribute("target", "_blank");

        var social_i = document.createElement("i");
        social_i.setAttribute("class", s);
        social_a.appendChild(social_i);
        
        affil_div.appendChild(social_a);
    }
    p.appendChild(affil_div);

    return p;
}

// Parameter true if welcome modal, false if about us modal
function displayModal(welcomeOrAboutUs) {
    var content = modal_about.querySelector('.modal-content').querySelector('.modal-text');
    if (welcomeOrAboutUs) {
        // Welcome
        content.innerHTML = '<h2 i18n="welcome"></h2><p i18n="project_description"></p><p i18n="tool_tutorial" class="cursive-small"></p>';
        
        // Cat selection
        content.innerHTML += '<div class="cats"><div class="line-wrapper"><hr class="line"><div class="cat-title"></div></div><div class="cat-selection"></div></div>';
        createCatSelection("map_type");
    } else {
        // About
        content.innerHTML = '<p i18n="about_us"></p>'
            + '<p i18n="data_source"></p>' +
            '<div class="custom-bullets"> <p class="bullet" >  <span i18n="source1"></span><a href="https://bogota-laburbano.opendatasoft.com/explore/dataset/poblacion-upz-bogota/table/" i18n="ok"></a></p>  <p class="bullet" >  <span i18n="source2"></span><a href="https://experience.arcgis.com/template/141b974f29a948ce8386ebf9f135a455/page/Viajes-Origen---Destino/?draft=true&views=ACB-2022%2CTotal-2022" i18n="ok"></a></p>  <p class="bullet" >  <span i18n="source3"></span><a href="https://observatorio.movilidadbogota.gov.co/encuesta/encuesta-de-movilidad-2023" i18n="ok"></a></p> <p class="bullet" >  <span i18n="source4"></span><a href="https://mapas.bogota.gov.co" i18n="ok"></a></p>


        translatePage();
    }
    modal_about.style.display = "block";
    translatePage();
}

// When About button is clicked, show About modal
about_us_btn.onclick = (event) => {
    displayModal(false);
}

// When X button is clicked, close the modal
span.onclick = function() {
    modal_about.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_about) {
        modal_about.style.display = "none";
    }
}
