'use strict';

import { config } from "../config/config.js";

/**
 * Style des pièces du puzzle
 * @param piecePuzzleFeature {Feature} - La pièce du puzzle
 */
function piecesPuzzleStyle(piecePuzzleFeature) {
    return new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'black'
        }),
        fill: new ol.style.Fill({
            color: 'rgba(20,86,204,0.4)'
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
 * Source des pièces du puzzle
 * @type {VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>}
 */
export const piecesPuzzleSource = new ol.source.Vector({
    url: config.pieces_puzzle_url,
    format: new ol.format.GeoJSON()
});

/**
 * Layer des pièces du puzzle
 * @type {VectorLayer<VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>, ExtractedFeatureType<VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>>>}
 */
export const piecesPuzzleLayer = new ol.layer.Vector({
    source: piecesPuzzleSource,
    style: piecesPuzzleStyle
});