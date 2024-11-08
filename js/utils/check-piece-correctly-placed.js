'use strict';

import { foundStyle } from "../layers/reference-pieces-layer.js";
import { config } from "../config/config.js";

/**
 * Vérifie si la pièce est correctement placée dans le puzzle
 * @param piecePuzzleMoved {Feature} - La pièce du puzzle déplacée
 * @param piecesPuzzleSource {VectorSource} - La source des pièces du puzzle
 * @param referencePiecesSource {VectorSource} - La source des pièces de référence du puzzle
 */
export function checkPieceCorrectlyPlaced(piecePuzzleMoved, piecesPuzzleSource, referencePiecesSource) {
    // Récupère les nouvelles coordonnées de la pièce du puzzle
    let newExtent = piecePuzzleMoved.getGeometry().getExtent();

    // Récupère le code de la pièce du puzzle
    let code = piecePuzzleMoved.get('code');
    let referencePieceFeature = getFeatureByCode(code, referencePiecesSource.getFeatures());
    let oldExtent = referencePieceFeature.getGeometry().getExtent();

    // Calcule la différence entre les anciennes et les nouvelles coordonnées
    let difference = Math.abs(newExtent[0] - oldExtent[0]) +
        Math.abs(newExtent[1] - oldExtent[1]) +
        Math.abs(newExtent[2] - oldExtent[2]) +
        Math.abs(newExtent[3] - oldExtent[3]);

    // Vérifie si la pièce est bien placée
    if (difference <= config.difference_allowed) {
        referencePieceFeature.setStyle(foundStyle);

        piecesPuzzleSource.removeFeature(piecePuzzleMoved);
    }
}

/**
 * Retourne la pièce du puzzle par son code
 * @param code {string} - Le code de la pièce
 * @param features {Array} - Les pièces du puzzle
 * @returns {Feature} - La pièce du puzzle
 */
function getFeatureByCode(code, features) {
    for (let i = 0; i < features.length; i++) {
        if (features[i].get('code') === code) {
            return features[i];
        }
    }
}