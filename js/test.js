import { test } from "./test_2.js";

console.log(test);

let puzzleOutlineSource = new ol.source.Vector({
    url: 'https://france-geojson.gregoiredavid.fr/repo/regions/grand-est/region-grand-est.geojson',
    format: new ol.format.GeoJSON()
});

let puzzleOutlineLayer = new ol.layer.Vector({
    source: puzzleOutlineSource
});

// Initialiser la carte OpenLayers dans le conteneur plein écran
let map = new ol.Map({
    target: 'map',
    layers: [
        puzzleOutlineLayer
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 10
    })
});

// Attend la fin du chargement du contour du puzzle
puzzleOutlineSource.once('featuresloadend', function() {
    zoomToCenterOfPuzzle(map, puzzleOutlineSource);
});

/**
 * Zoom sur le centre du puzzle
 * @param map {Map} - La carte
 * @param puzzleOutlineSource {VectorSource} - La source des contours du puzzle
 */
function zoomToCenterOfPuzzle(map, puzzleOutlineSource) {
    let feature = puzzleOutlineSource.getFeatures()[0];
    map.getView().fit(feature.getGeometry(), {padding: [150, 150, 150, 150]});
}
