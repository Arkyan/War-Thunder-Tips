document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    var xhr_post_only = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);

            document.getElementById('visiteurs').innerHTML = responseObject.visiteurs_total;
            document.getElementById('version').innerHTML = responseObject.version;
            var visiteurs = parseInt(document.getElementById('visiteurs').innerHTML) + 1
            xhr_post_only.open('GET', 'https://api.zehosting.fr/setstats/visiteurs_total/' + visiteurs, false);

            xhr_post_only.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));

            xhr_post_only.send(null);
        }
    }

    xhr.open('GET', 'https://api.zehosting.fr/getstats', false);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.send(null);
});