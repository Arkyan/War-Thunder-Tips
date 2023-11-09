var username = sessionStorage.getItem("username");

function connection() {
    var pseudo = document.getElementById("connect_pseudo").value;
    var mdp = document.getElementById("connect_mdp").value;
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            if (xhr.responseText.startsWith("Utilisateur non trouvé")) {
                document.getElementById("connect_pseudo").style.borderColor = "red";
                document.getElementById("connect_mdp").style.borderColor = "red";
                document.getElementById("alert_div").innerHTML = "<div class='alert alert-danger' role='alert'>Utilisateur non trouvé</div>";
            } else {
                document.getElementById("connect_pseudo").style.borderColor = "green";
                document.getElementById("connect_mdp").style.borderColor = "green";
                document.getElementById("alert_div").innerHTML = "<div class='alert alert-success' role='alert'>Connexion réussie</div>";
                sessionStorage.setItem("username", pseudo);
                window.location.href = "./compte.html";
            }
        }
    }

    xhr.open('POST', 'https://api.zehosting.fr/Forum/user/connect', false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({
        "pseudo": pseudo,
        "mdp": mdp
    }));
}

function Envoyer_Post() {
    var pseudo = document.getElementById("pseudo").value;
    var titre = document.getElementById("titre").value;
    var contenu = document.getElementById("contenu").value;
    var tags = document.getElementById("tags").value;
    var image = document.getElementById("image").value;

    if (pseudo == "" || titre == "" || contenu == "" || tags == "") {
        alert("Veuillez remplir tous les champs");
        return;
    } else {
        if (image == "") {
            image = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
        } else {
            //vérifier que l'image est bien une image qui fini par .png ou .jpg et qui commence par http ou https
            if (image.startsWith("http://") || image.startsWith("https://")) {
                if (image.endsWith(".png") || image.endsWith(".jpg")) {
                    //tout est bon
                } else {
                    alert("L'image doit être au format .png ou .jpg");
                    return;
                }
            } else {
                alert("L'image doit commencer par http:// ou https://");
                return;
            }
        }
    }

    var tableau = [pseudo, titre, contenu, tags, image];

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            console.log(xhr.responseText);
        }
    }
    xhr.open('POST', 'https://api.zehosting.fr/posts', false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "pseudo": pseudo,
        "titre": titre,
        "contenu": contenu,
        "tags": tags,
        "image": image
    }));

    alert("Post envoyé");
}

function recherche() {
    var recherche = document.getElementById("recherche").value;
    console.log(recherche);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.zehosting.fr/posts/' + recherche, false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));

    xhr.send(null);

    window.location.href = "./posts_recherche.html?recherche=" + recherche;
}