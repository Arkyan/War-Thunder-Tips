const fs = require('fs');

function ActuStats() {
    fetch("/data/stats.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            fs.readFile("/data/stats.json", "utf8", function (err, data) {
                if (err) throw err;
                console.log(data);
            });
            document.getElementById("visiteurs").innerHTML = data.visiteurs_total;
        });
}

ActuStats();