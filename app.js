document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    var xhr_post_only = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);

            document.getElementById('visiteurs').innerHTML = responseObject.visiteurs_total;
            var visiteurs = parseInt(document.getElementById('visiteurs').innerHTML) + 1
            xhr_post_only.open('GET', 'https://api.zehosting.fr/setstats/visiteurs_total/' + visiteurs, false);

            xhr_post_only.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));

            xhr_post_only.send(null);

            document.getElementById('utilisateurs').innerHTML = responseObject.users_total;
            document.getElementById('posts').innerHTML = responseObject.posts_total;
        }
    }

    xhr.open('GET', 'https://api.zehosting.fr/getstats', false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.send(null);
});

function traiterFluxRSS(xml) {
    var items = xml.querySelectorAll("item");

    /*

    ################################################################################
    ############################## Article 1 #######################################
    ################################################################################

    */
    var titre1 = items[0].querySelector("title").textContent;
    var desc1 = items[0].querySelector("description").textContent;
    var link1 = items[0].querySelector("link").textContent;
    var date1 = items[0].querySelector("pubDate").textContent;

    desc1 = desc1.replace(/ *\[[^)]*\] */g, ""); //supprime les balises [ ... ]

    var regex = /<img[^>]+src="([^">]+)"/g; //permet de récupérer l'url de l'image
    for (let match of desc1.matchAll(regex)) {
        desc1 = desc1.replace(match[0], ""); //supprime l'image du texte
        document.getElementById("news_img1").src = match[1] ?? "";
    }

    desc1 = desc1.replace(/\/>/g, ""); //supprime les balises img

    if (desc1.length > 400) { //si la description est trop longue, on la coupe
        desc1 = desc1.substring(0, 400) + "..."; //on coupe la description
    }

    document.getElementById("news_title1").innerHTML = titre1;
    document.getElementById("news_description1").innerHTML = desc1;
    document.getElementById("news_link1").href = link1;

    var date1_var = new Date(date1);
    var heures = date1_var.getHours();
    if (heures < 10) {
        heures = "0" + heures;
    }

    var minutes = date1_var.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var date1_final = date1_var.getDate() + "/" + (date1_var.getMonth() + 1) + "/" + date1_var.getFullYear() + " à " + heures + "h" + minutes;
    document.getElementById("news_date1").innerHTML = "Date : " + date1_final;

    /*

    ################################################################################
    ############################## Article 2 #######################################
    ################################################################################

    */

    var titre2 = items[1].querySelector("title").textContent;
    var desc2 = items[1].querySelector("description").textContent;

    var link2 = items[1].querySelector("link").textContent;
    var date2 = items[1].querySelector("pubDate").textContent;

    desc2 = desc2.replace(/ *\[[^)]*\] */g, ""); //supprime les balises [ ... ]

    var regex = /<img[^>]+src="([^">]+)"/g; //permet de récupérer l'url de l'image
    for (let match of desc2.matchAll(regex)) {
        desc2 = desc2.replace(match[0], ""); //supprime l'image du texte
        document.getElementById("news_img2").src = match[1] ?? "";
    }
    desc2 = desc2.replace(/\/>/g, ""); //supprime les balises img

    if (desc2.length > 400) { //si la description est trop longue, on la coupe
        desc2 = desc2.substring(0, 400) + "..."; //on coupe la description
    }

    document.getElementById("news_title2").innerHTML = titre2;
    document.getElementById("news_description2").innerHTML = desc2;
    document.getElementById("news_link2").href = link2;

    var date2_var = new Date(date2);
    var heures = date2_var.getHours();
    if (heures < 10) {
        heures = "0" + heures;
    }

    var minutes = date2_var.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var date2_final = date2_var.getDate() + "/" + (date2_var.getMonth() + 1) + "/" + date2_var.getFullYear() + " à " + heures + "h" + minutes;
    document.getElementById("news_date2").innerHTML = "Date : " + date2_final;

    /*

    ################################################################################
    ############################## Article 3 #######################################
    ################################################################################

    */

    var titre3 = items[2].querySelector("title").textContent;
    var desc3 = items[2].querySelector("description").textContent;
    var link3 = items[2].querySelector("link").textContent;
    var date3 = items[2].querySelector("pubDate").textContent;

    desc3 = desc3.replace(/ *\[[^)]*\] */g, ""); //supprime les balises [ ... ]

    var regex = /<img[^>]+src="([^">]+)"/g; //permet de récupérer l'url de l'image
    for (let match of desc3.matchAll(regex)) {
        desc3 = desc3.replace(match[0], ""); //supprime l'image du texte
        document.getElementById("news_img3").src = match[1] ?? "";
    }
    desc3 = desc3.replace(/\/>/g, ""); //supprime les balises img

    if (desc3.length > 400) { //si la description est trop longue, on la coupe
        desc3 = desc3.substring(0, 400) + "..."; //on coupe la description
    }
    document.getElementById("news_title3").innerHTML = titre3;
    document.getElementById("news_description3").innerHTML = desc3;
    document.getElementById("news_link3").href = link3;

    var date3_var = new Date(date3);
    var heures = date3_var.getHours();
    if (heures < 10) {
        heures = "0" + heures;
    }

    var minutes = date3_var.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var date3_final = date3_var.getDate() + "/" + (date3_var.getMonth() + 1) + "/" + date3_var.getFullYear() + " à " + heures + "h" + minutes;
    document.getElementById("news_date3").innerHTML = "Date : " + date3_final;
}

// Récupérer le flux RSS en utilisant XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
            // Convertir la réponse en XML
            var parser = new DOMParser();
            var xml = parser.parseFromString(xhr.responseText, "application/xml");

            // Appeler la fonction pour traiter le flux
            traiterFluxRSS(xml);
        } else {
            console.error("Erreur lors de la récupération du flux RSS");
        }
    }
};
xhr.open('GET', 'https://api.zehosting.fr/getnews');
xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
xhr.send();