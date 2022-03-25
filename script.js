(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            if (h <= 12) {
                c.innerHTML = h + ":" + m + ":" + s + "AM";
            } else {
                c.innerHTML = h - 12 + ":" + m + ":" + s + "PM";
            }

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let present = document.getElementById("v1");
        let contactless = document.getElementById("v2");

        let checkboxes = [present, contactless];
        let elements = [linn];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                elements.push(checkboxes[i]);
            }
        }
        let radios = document.getElementsByName("delivery");

        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) {
                elements.push(radios[i]);
            }
        }

        let prices = {"tln": 0, "trt": 2.5, "nrv": 2.5, "prn": 3, "present": 5, "contactless": 1, "normal": 0, "express": 5, "eco": 1};

        let price = 0;
        for (let i = 0; i < elements.length; i++) {
            price += prices[elements[i].value];
        }

        if(!checkInput()) return;

        e.innerHTML = price.toFixed(2).replace(".", ",") + " &euro;";


        console.log("Tarne hind on arvutatud");
    }


    function checkInput() {
        let firstName = document.getElementById("fname").value;
        let lastName = document.getElementById("lname").value;
        if(firstName==="" || lastName==="") {
            alert("Täida nimeväljad!");
            return false;
        }
        let hasNumber = /\d/;
        if(hasNumber.test(firstName) || hasNumber.test(lastName)) {
            alert("Nimi ei saa numbreid sisaldada!");
            return false;
        }

        let radios = document.getElementsByName("delivery");
        let isChecked = false;
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) {
                isChecked = true;
            }
        }
        if (!isChecked) {
            alert("Vali tarnemeetod!");
            return false;
        }
        let linn = document.getElementById("linn");
        if (linn.value === "") {
            e.innerHTML = "0,00 &euro;";

            alert("Palun valige linn nimekirjast");

            linn.focus();


            return false;
        }
        return true;


    }

})();

// map

let mapAPIKey = "AuQCGP7ffmwMd15Uhx5lnCscxViQ1OJL8fPtm1xyeTurLcWYag1BEzle9VDqSUYC";

let map;

function GetMap() {

    "use strict";

    let tartu1 = 58.38104, tartu2 =  26.71992, viljandi1 = 58.366531577656474, viljandi2 = 25.597461711376113;

    let tartuLoc = new Microsoft.Maps.Location(
        tartu1,
        tartu2
    );

    let viljandiLoc = new Microsoft.Maps.Location(
        viljandi1,
        viljandi2
    );

    let centerPoint = new Microsoft.Maps.Location(
        (tartu1+viljandi1)/2,
        (tartu2+viljandi2)/2
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false
    });


    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });


    infobox.setMap(map);



    let tartu = new Microsoft.Maps.Pushpin(tartuLoc, {
        text: 'UT'
    });

    let viljandi = new Microsoft.Maps.Pushpin(viljandiLoc, {
        text: 'TÜVKA'
    });

    tartu.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht',
    };

    viljandi.metadata = {
        title: 'Viljandi Kultuuriakadeemia',
        description: 'Tore koht',
    };

    Microsoft.Maps.Events.addHandler(tartu, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(viljandi, 'click', pushpinClicked);

    map.entities.push(tartu);
    map.entities.push(viljandi);

}

    function pushpinClicked(e) {
        if (e.target.metadata) {

            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

