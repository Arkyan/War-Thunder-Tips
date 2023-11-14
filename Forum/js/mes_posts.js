var username = sessionStorage.getItem("username");

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        var reponse = JSON.parse(xhr.responseText);

        var taille = 1;
        for (var k in reponse) if (reponse.hasOwnProperty(k)) taille++;

        var total_post = 0;

        for (var i = taille - 1; i > 0; i--) {
            total_post += 1;
            var post = reponse[i];
            var titre = post.titre;
            var contenu = post.contenu;
            var pseudo = post.pseudo;
            var image = post.image;
            var tags = post.tags;
            var date = post.date;
            var id = post.id;


            var div = document.getElementById("posts");
            var tags = tags.split(",");
            var tags_total = "<div class='tags'>";
            for (var j = 0; j < tags.length; j++) {
                tags_total = tags_total + '<span class="badge badge-secondary">' + tags[j] + '</span> ';
            }
            if (pseudo == username) {

                tags_total = tags_total + "</div>";
                div.innerHTML = div.innerHTML + '<br><div class="col-md-12" style="background-color: #DFDFDF;">Posté par : ' + pseudo + '<div class="post"><div class="row"><div class="col-md-12"><img src="' + image + '" width="200" height="150" style="margin-top:10px;"><h3>' + titre + '</h3></div></div><div class="row"><div class="col-md-12"><p>' + contenu + '</p></div></div><div class="row"><div class="col-md-12"></div> ' + tags_total + '</div></div></div>';
            }
        }
        document.getElementById("post_id").innerHTML = "Vous avez posté " + total_post + " post(s)";
    }
}

xhr.open('GET', 'https://api.zehosting.fr/posts', false);
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