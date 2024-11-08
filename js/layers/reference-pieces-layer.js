'use strict';

import { config } from "../config/config.js";

/**
 * Style des pièces de référence du puzzle
 * @type {Style}
 */
const referencePiecesStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'transparent'
    })
});

/**
 * Style des pièces du puzzle trouvées
 * @param piecePuzzleFeature {Feature} - La pièce du puzzle trouvée
 * @returns {Style} - Le style de la pièce du puzzle trouvée
 */
export function foundStyle(piecePuzzleFeature) {
    return new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'black'
        }),
        fill: new ol.style.Fill({
            color: 'rgba(20,204,86,0.4)'
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: 'black'
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 2
            }),
            text: piecePuzzleFeature.get('nom'),
            overflow: true
        })
    });
}

/**
 * Source des pièces de référence du puzzle
 * @type {VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>}
 */
export const referencePiecesSource = new ol.source.Vector({
    url: config.pieces_puzzle_url,
    format: new ol.format.GeoJSON()
});

/**
 * Layer de référence des pièces du puzzle
 * @type {VectorLayer<VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>, ExtractedFeatureType<VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>>>}
 */
export const referencePiecesLayer = new ol.layer.Vector({
    source: referencePiecesSource,
    style: referencePiecesStyle
});