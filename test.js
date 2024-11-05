import { test } from "./test_2.js";

console.log(test);

// Initialiser la carte OpenLayers dans le conteneur plein écran
let map = new ol.Map({
    target: 'map', // Cible le conteneur plein écran
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Exemple : couche OpenStreetMap
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([2.3522, 48.8566]), // Centrer la carte (ex: Paris)
        zoom: 10
    })
});
console.log("Carte OpenLayers plein écran initialisée.");