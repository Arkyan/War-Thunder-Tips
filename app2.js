document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();


    xhr.onload = function () {
        console.log("xhr.onload");
        if (xhr.status === 200) {
            console.log("xhr.status === 200");
            responseObject = JSON.parse(xhr.responseText);
            console.log(responseObject);
        }
    }

    xhr.open('GET', 'https://api.zehosting.fr/getstats', false);

    xhr.setRequestHeader("Authorization", "Basic " + btoa("miniprojet:2024"));
    xhr.send(null);
});