import * as map from './map.js';
import * as ajax from './ajax.js';

let poi;

const loadPOI = () => {
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";
    function poiLoaded (jsonString) {
        poi = JSON.parse(jsonString);
        for (let p of poi) {
            map.addMarker(p.coordinates, p.title, "Point of Interest", "poi");
        }
    }
    ajax.downloadFile(url, poiLoaded);
}

const setupUI = () => {
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    // RIT Zoom 15.5
    btn1.onclick = () => {
        map.setZoom(15.5);
        map.setPitchAndBearing();
        map.flyTo(lnglatRIT);
    }

    // RIT isometric view
    btn2.onclick = () => {
        map.setZoom(15.5);
        map.setPitchAndBearing(45, 0);
        map.flyTo(lnglatRIT);
    }

    // World zoom 0
    btn3.onclick = () => {
        map.setZoom();
        map.setPitchAndBearing();
        map.flyTo();
    }

    // IGM zoom 18
    btn4.onclick = () => {
        map.setZoom(18);
        map.setPitchAndBearing();
        map.flyTo(lnglatIGM);
    }

    btn5.onclick = () => {
        if (!poi) {
            loadPOI();
            btn5.disabled = true;
        }
    }
}

export const init = () => {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}
