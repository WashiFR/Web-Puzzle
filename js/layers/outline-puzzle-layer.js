'use strict';

import { config } from "../config/config.js";

/**
 * Style des contours du puzzle
 * @type {Style}
 */
const outlinePuzzleStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'black',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'transparent'
    })
});

/**
 * Source des contours du puzzle
 * @type {VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>}
 */
export const outlinePuzzleSource = new ol.source.Vector({
    url: config.outline_puzzle_url,
    format: new ol.format.GeoJSON()
});

/**
 * Layer des contours du puzzle
 * @type {VectorLayer<ol.source.Vector, ExtractedFeatureType<ol.source.Vector>>}
 */
export const outlinePuzzleLayer = new ol.layer.Vector({
    source: outlinePuzzleSource,
    style: outlinePuzzleStyle
});