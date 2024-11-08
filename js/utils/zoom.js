'use strict';

/**
 * Zoom sur le centre du puzzle
 * @param map {Map} - La carte
 * @param outlinePuzzleSource {VectorSource<import("../Feature.js").default<import("../geom.js").Geometry>>} - La source du contour du puzzle
 */
export function zoomToCenterOfPuzzle(map, outlinePuzzleSource) {
    let feature = outlinePuzzleSource.getFeatures()[0];
    map.getView().fit(feature.getGeometry(), {padding: [150, 150, 150, 150]});
}