import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtkBVPgQV87ZMWzlqHbnYeys2D-ZhmFCc",
    authDomain: "nys-park-buddy-85a9f.firebaseapp.com",
    projectId: "nys-park-buddy-85a9f",
    storageBucket: "nys-park-buddy-85a9f.appspot.com",
    messagingSenderId: "507872664469",
    appId: "1:507872664469:web:60b8a027145e767b4fb49c",
    measurementId: "G-S4TRBM9YDE"
};
const app = initializeApp(firebaseConfig);

const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = storage.readFromLocalStorage("favoriteIds") || [];


// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector('#btn1').onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};
	
	// NYS isometric view
	document.querySelector('#btn2').onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	};
	
	// World zoom 0
	document.querySelector('#btn3').onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatUSA);
	};

	refreshFavorites();

}

const showFeatureDetails = (id) => {
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `
		<p><b>Address:</b> ${feature.properties.address}</p>
		<p><b>Phone:</b> ${feature.properties.phone}</p>
		<p><b>Website:</b> <a href="${feature.properties.url}">${feature.properties.url}</a></p>
		<div class="columns m-1">
			<button id="btn-favorite" class="column button is-primary mr-1 is-flex is-align-items-center">Favorite</button>
			<button id="btn-remove" class="column button is-danger ml-1 is-flex is-align-items-center">Remove</button>
		</div>
	`;
	document.querySelector("#btn-favorite").onclick = () => addToFavorites();
	document.querySelector("#btn-remove").onclick = () => removeFromFavorites();
	document.querySelector("#details-3").innerHTML = feature.properties.description
	refreshFavorites();
}

const getFeatureById = (id) => { return geojson.features.find((feature) => feature.id === id); }

const getFeatureByTitle = (title) => { return geojson.features.find((feature) => feature.properties.title === title); }

const getIdByTitle = (title) => { return getFeatureByTitle(title).id; }

const addToFavorites = () => {
	const title = document.querySelector("#details-1").innerHTML.replace("Info for ", "");
	const id = getIdByTitle(title);
	if (!favoriteIds.includes(id)) {
		favoriteIds.push(id);
		const db = getDatabase();
		const scoreRef = ref(db, 'favorites/' + id);

		runTransaction(scoreRef, (currentScore) => {
            // If the node doesn't exist or isn't a number, initialize to 1, otherwise increment
            if (currentScore === null || typeof currentScore !== 'number') {
                return 1;
            }
            return currentScore + 1;
        }).then((result) => {
            if (result.committed) {
                console.log('Score updated:', result.snapshot.val());
            } else {
                console.log('Transaction failed');
            }
        }).catch((error) => {
            console.error('Transaction failed with error:', error);
        });
	}
	refreshFavorites();
}

const removeFromFavorites = () => {
	const title = document.querySelector("#details-1").innerHTML.replace("Info for ", "");
	const id = getIdByTitle(title);
	if (favoriteIds.includes(id)) {
		favoriteIds.splice(favoriteIds.indexOf(id), 1);
		const db = getDatabase();
		const scoreRef = ref(db, 'favorites/' + id);

		runTransaction(scoreRef, (currentScore) => {
			// If the node doesn't exist or isn't a number, initialize to 1, otherwise increment
			if (currentScore === null || typeof currentScore !== 'number') {
				return 0;
			}
			return currentScore - 1;
		}).then((result) => {
			if (result.committed) {
				console.log('Score updated:', result.snapshot.val());
			} else {
				console.log('Transaction failed');
			}
		}).catch((error) => {
			console.error('Transaction failed with error:', error);
		});
	}
	refreshFavorites();
}

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	favoriteIds.forEach((id) => { favoritesContainer.appendChild(createFavoriteItem(id)); });

	storage.writeToLocalStorage("favoriteIds", favoriteIds);

	// disable the favorite button if the current feature is already a favorite
	const title = document.querySelector("#details-1").innerHTML.replace("Info for ", "");
	if (title === "") return;
	const id = getIdByTitle(title);
	const btnFavorite = document.querySelector("#btn-favorite");
	if (favoriteIds.includes(id)) btnFavorite.disabled = true;
	else btnFavorite.disabled = false;

	// disable the remove button if the current feature is not a favorite
	const btnRemove = document.querySelector("#btn-remove");
	if (!favoriteIds.includes(id)) btnRemove.disabled = true;
	else btnRemove.disabled = false;
}

const createFavoriteItem = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	}
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a;
}

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile('./data/parks.geojson', (str) => {
		geojson = JSON.parse(str);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	});
};

init();