document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    var xhr_post_only = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);

            document.getElementById('visiteurs').innerHTML = responseObject.visiteurs_total;
            document.getElementById('version').innerHTML = responseObject.version;
            var visiteurs = parseInt(document.getElementById('visiteurs').innerHTML) + 1
            xhr_post_only.open('GET', 'http://localhost:3000/setstats/visiteurs_total/' + visiteurs, true);

            xhr_post_only.send(null);
        }
    }

    xhr.open('GET', 'http://localhost:3000/getstats', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
});