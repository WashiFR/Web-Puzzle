'use strict';

import { config } from "../config/config.js";
import { zoomToCenterOfPuzzle } from "./zoom.js";

/**
 * Déplace aléatoirement les pièces du puzzle
 * @param features {Array} - Les pièces du puzzle
 */
function randomizePuzzlePiecesPos(features) {
    for (let i = 0; i < features.length; i++) {
        let geometry = features[i].getGeometry();
        let deltaX = getRandomInt();
        let deltaY = getRandomInt();
        geometry.translate(deltaX, deltaY);
    }
}

/**
 * Retourne un entier aléatoire entre min et max
 * @returns {number} - Un entier aléatoire entre min et max
 */
function getRandomInt() {
    let min = config.min_random;
    let max = config.max_random;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Démarre le jeu
 * @param map {Map} - La carte
 * @param outlinePuzzleSource {VectorSource} - La source des contours du puzzle
 * @param piecesPuzzleSource {VectorSource} - La source des pièces du puzzle
 */
export function startGame(map, outlinePuzzleSource, piecesPuzzleSource) {
    // Attend la fin du chargement du contour du puzzle
    outlinePuzzleSource.once('featuresloadend', () => zoomToCenterOfPuzzle(map, outlinePuzzleSource));

    // Attend la fin du chargement des pièces du puzzle
    piecesPuzzleSource.once('featuresloadend', function() {
        const features = piecesPuzzleSource.getFeatures();

        randomizePuzzlePiecesPos(features);
    });
}