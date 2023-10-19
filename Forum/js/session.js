
document.addEventListener("DOMContentLoaded", function (event) {
    var logged = false
    var username = sessionStorage.getItem("username");
    if (username != null) {
        logged = true
        document.getElementById("pseudo").value = sessionStorage.getItem("username");

        document.getElementById("titre").disabled = false;
        document.getElementById("contenu").disabled = false;
        document.getElementById("tags").disabled = false;
        document.getElementById("image").disabled = false;
        document.getElementById("envoyer").disabled = false;
    } else {
        document.getElementById("info_modal").hidden = false;
        document.getElementById("info_modal").innerHTML = "Vous devez être connecté pour pouvoir créer un post";
    }
});