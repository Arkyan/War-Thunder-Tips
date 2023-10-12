document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    var xhr_post_only = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);

            document.getElementById('visiteurs').innerHTML = responseObject.visiteurs_total;
            document.getElementById('version').innerHTML = responseObject.version;
            var visiteurs = parseInt(document.getElementById('visiteurs').innerHTML) + 1
            xhr_post_only.open('GET', 'https://watch2earn.zehosting.fr/getstats' + visiteurs, true);

            xhr_post_only.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr_post_only.send(null);
        }
    }

    xhr.open('GET', 'https://watch2earn.zehosting.fr/getstats', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
});

var xhr2 = new XMLHttpRequest();

xhr2.open('GET', 'https://cors-anywhere.herokuapp.com/https://watch2earn.zehosting.fr/getstats', true);
xhr2.setRequestHeader("X-Requested-With", "XMLHttpRequest");

xhr2.send(null);

xhr2.onload = function () {
    if (xhr2.status === 200) {
        console.log(xhr2.responseText);
    }
}