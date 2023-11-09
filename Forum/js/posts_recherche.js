
//get parametre url
var url = window.location.href;
var parametres = url.split("?recherche=")[1];
parametres = parametres.split("%20").join(" ");
console.log(parametres);

var xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        var reponse = JSON.parse(xhr.responseText);
        var taille = 0;
        for (var k in reponse) if (reponse.hasOwnProperty(k)) taille++;

        for (var i = 0; i < taille; i++) {
            var post = reponse[i];
            var titre = post.titre;
            var contenu = post.contenu;
            var pseudo = post.pseudo;
            var image = post.image;
            var tags = post.tags;
            var date = post.date;
            var id = post.id;

            var div = document.getElementById("posts");
            div.innerHTML = div.innerHTML + '<br><div class="col-md-12" style="background-color: #DFDFDF;">Posté par : ' + pseudo + '<div class="post"><div class="row"><div class="col-md-12"><img src="' + image + '" width="200" height="150" style="margin-top:10px;"><h3>' + titre + '</h3></div></div><div class="row"><div class="col-md-12"><p>' + contenu + '</p></div></div><div class="row"><div class="col-md-12"><button type="button" class="btn btn-primary" style="margin-bottom:10px;">Voir le post</button></div></div></div></div>';
        }
    }
}

xhr.open('GET', 'https://api.zehosting.fr/posts/' + parametres, false);
xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
xhr.send(null);

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
    console.log(tableau);

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            console.log(xhr.responseText);
        }
    }

    xhr.open('POST', 'https://api.zehosting.fr/posts/' + parametres, false);
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