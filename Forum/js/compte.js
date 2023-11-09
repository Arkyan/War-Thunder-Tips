document.addEventListener('DOMContentLoaded', function () {

    var username = sessionStorage.getItem('username');
    if (username) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.zehosting.fr/Forum/user/' + username, false);
        xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
        xhr.onload = function () {
            var user = JSON.parse(xhr.responseText);

            console.log(user);
            document.getElementById('username').value = user.pseudo ? user.pseudo : "";
            document.getElementById('email').value = user.mail ? user.mail : "";
            document.getElementById('nom').value = user.nom ? user.nom : "";
            document.getElementById('prenom').value = user.prenom ? user.prenom : "";
            document.getElementById('dateNaissance').value = user.dateNaissance ? user.dateNaissance : "";
            document.getElementById('pays').value = user.pays ? user.pays : "";
            document.getElementById('telephone').value = user.telephone ? user.telephone : "";
            document.getElementById('photo_profil').src = user.photo ? user.photo : "http://bootdey.com/img/Content/avatar/avatar1.png";
        }
        xhr.send();

        var xhr2 = new XMLHttpRequest();
        xhr2.onload = function () {
            if (xhr2.readyState === 4) {
                var country = JSON.parse(xhr2.responseText);
                var select = document.getElementById("pays");
                for (var i = 0; i < country.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = country[i].name;
                    opt.innerHTML = country[i].name;
                    select.appendChild(opt);
                }
            }
        }

        xhr2.open('GET', 'https://api.zehosting.fr/getcountries', false);
        xhr2.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
        xhr2.send(null);

    } else {
        window.location.href = "seConnecter.html";
    }
});

function envoyer_modif() {
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var pays = document.getElementById("pays").value;
    var telephone = document.getElementById("telephone").value;
    var dateNaissance = document.getElementById("dateNaissance").value;

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4) {
            window.location.reload();
        }
    }
    xhr.open('POST', 'https://api.zehosting.fr/Forum/updateuser', false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({
        "pseudo": sessionStorage.getItem("username"),
        "prenom": prenom,
        "nom": nom,
        "pays": pays,
        "telephone": telephone,
        "dateNaissance": dateNaissance
    }));
}

function Envoyer_Post() {
    var lien = document.getElementById("image_modal").value;
    if (lien.endsWith(".png") || lien.endsWith(".jpg")) {
        document.getElementById("image_modal").style.borderColor = "green";
        document.getElementById("image_modal").disabled = true;
        document.getElementById("progress").hidden = false;

        document.getElementById("modal_close").disabled = true;
        document.getElementById("modal_send").disabled = true;

        var progress_bar = document.getElementById("progress_bar");
        var progress_interval = setInterval(function () {
            var width = parseInt(progress_bar.style.width);
            if (width < 100) {
                progress_bar.style.width = (width + 1) + "%";
            } else {
                progress_bar.style.width = "1%";
                clearInterval(progress_interval);

                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        window.location.reload();
                    }
                }

                xhr.open('POST', 'https://api.zehosting.fr/Forum/updatephoto', false);
                xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({
                    "pseudo": sessionStorage.getItem("username"),
                    "image": lien
                }));
            }
        }, 30);
    } else {
        document.getElementById("image_modal").value = "";
        document.getElementById("image_modal").style.borderColor = "red";
        alert("Le lien doit finir par .png ou .jpg");
    }

}

function recherche() {
    var recherche = document.getElementById("recherche").value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.zehosting.fr/posts/' + recherche, false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));

    xhr.send(null);

    window.location.href = "./posts_recherche.html?recherche=" + recherche;
}

function deco() {
    sessionStorage.removeItem("username");
    window.location.href = "./index.html";
}