document.addEventListener('DOMContentLoaded', function () {
    cookies = document.cookie.split(';');

    var username = cookies[0].split('=')[1];
    if (username) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/Forum/user/' + username, true);
        xhr.onload = function () {
            var user = JSON.parse(xhr.responseText);

            document.getElementById('username').value = user.pseudo ? user.pseudo : "";
            document.getElementById('email').value = user.mail ? user.mail : "";
            document.getElementById('nom').value = user.nom ? user.nom : "";
            document.getElementById('prenom').value = user.prenom ? user.prenom : "";
            document.getElementById('dateNaissance').value = user.dateNaissance ? user.dateNaissance : "";
            document.getElementById('pays').value = user.pays ? user.pays : "";
            document.getElementById('telephone').value = user.tel ? user.tel : "";
            document.getElementById('photo').src = user.photo ? user.photo : "http://bootdey.com/img/Content/avatar/avatar1.png";
        }
        xhr.send();
    } else {
        console.log("Pas de session trouvé");
        window.location.href = "seConnecter.html";
    }
});