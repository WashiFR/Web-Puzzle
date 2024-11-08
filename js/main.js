import { outlinePuzzleSource, outlinePuzzleLayer } from "./layers/outline-puzzle-layer.js";
import { piecesPuzzleSource, piecesPuzzleLayer } from "./layers/pieces-puzzle-layer.js";
import { referencePiecesSource, referencePiecesLayer } from "./layers/reference-pieces-layer.js";
import { checkPieceCorrectlyPlaced } from "./utils/check-piece-correctly-placed.js";
import { config } from "./config/config.js";
import { startGame } from "./utils/start-game.js";

// Initialiser la carte OpenLayers dans le conteneur plein écran
let map = new ol.Map({
    target: 'map',
    layers: [
        outlinePuzzleLayer,
        referencePiecesLayer,
        piecesPuzzleLayer
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: config.base_zoom,
        minZoom: config.min_zoom,
        maxZoom: config.max_zoom
    })
});

// Interaction de sélection sur les pièces du puzzle
let selectPiecesPuzzle = new ol.interaction.Select({
    layers: [piecesPuzzleLayer]
});

// Interaction de translation sur les pièces du puzzle
let translatePiecesPuzzle = new ol.interaction.Translate({
    features: selectPiecesPuzzle.getFeatures()
});

// Événement de fin de translation sur les pièces du puzzle
translatePiecesPuzzle.on('translateend', function(event) {
    let piecePuzzleMoved = event.features.getArray()[0];
    checkPieceCorrectlyPlaced(piecePuzzleMoved, piecesPuzzleSource, referencePiecesSource);
});

// Ajoute les interactions à la carte
map.addInteraction(selectPiecesPuzzle);
map.addInteraction(translatePiecesPuzzle);

startGame(map, outlinePuzzleSource, piecesPuzzleSource);
