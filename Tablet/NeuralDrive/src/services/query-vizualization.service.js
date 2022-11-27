import { Subject } from "rxjs";

import * as httpRequestService from "./http-request.service";

// Variables
let _selectedFirstParameterIndex = 0;
let _selectedSecondParameterIndex = 1;

let _isLoadingHeatmap = false;
let _loadedHeatmapBase64JpegImageFirstIndex = _selectedFirstParameterIndex;
let _loadedHeatmapBase64JpegImageSecondIndex = _selectedSecondParameterIndex;
let _loadedHeatmapBase64JpegImageData = "";

let _isLoadingParameterGraph = false;
let _loadedParameterGraphBase64JpegImageIndex = _selectedFirstParameterIndex;
let _loadedParameterGraphBase64JpegImageData = "";


// Reactive behavior handlers
export const subjectHeatmap = new Subject();
export const subjectParameterGraph = new Subject();

// Exported methods
export function getIsLoadingHeatmap() {
  return _isLoadingHeatmap;
}

export function getIsLoadingParameterGraph() {
  return _isLoadingParameterGraph;
}

export function getHeatmapBase64JpegImageData() {
  return _loadedHeatmapBase64JpegImageData;
}

export function getParameterGraphBase64JpegImageData() {
  return _loadedParameterGraphBase64JpegImageData;
}

export function hasNoLoadedHeatmap() {
  return Boolean(_loadedHeatmapBase64JpegImageData);
}

export async function refreshVizualizations() {
    _isLoadingHeatmap = true;
    _isLoadingParameterGraph = true;
    subjectHeatmap.next();
    subjectParameterGraph.next();
    const { heatMapBase64JpegImage, parameterGraphBase64JpegImage } =
    await httpRequestService.getVisualizationsForParameters(
      _selectedFirstParameterIndex,
      _selectedSecondParameterIndex
    );
    _loadedHeatmapBase64JpegImageData = heatMapBase64JpegImage;
    _loadedParameterGraphBase64JpegImageData = parameterGraphBase64JpegImage;
    subjectHeatmap.next();
    subjectParameterGraph.next();
}

export function setHeatmapBase64JpegImageData() {
  return _loadedHeatmapBase64JpegImageData;
}

export function setParameterGraphBase64JpegImageData() {
  return _loadedParameterGraphBase64JpegImageData;
}

export function setFirstSelectedParameter(index) {
  _selectedFirstParameterIndex = index;
  updateVizualizations(_selectedFirstParameterIndex, _selectedSecondParameterIndex);
}

export function setSecondSelectedParameter(index) {
  _selectedSecondParameterIndex = index;
  updateVizualizations(_selectedFirstParameterIndex, _selectedSecondParameterIndex);
}

// Private methods
function isLoadedHeatmapDifferentFromSelected() {
  return _loadedHeatmapBase64JpegImageFirstIndex !== _selectedFirstParameterIndex ||
    _loadedHeatmapBase64JpegImageSecondIndex !== _selectedSecondParameterIndex;
}

function isLoadedParameterGraphDifferentFromSelected() {
  return _loadedParameterGraphBase64JpegImageIndex !== _selectedFirstParameterIndex;
}

async function updateVizualizations(firstParameterIndex, secondParameterIndex) {

  // If no vizualization requires an update, we do nothing
  const mustUpdateHeatmap = isLoadedHeatmapDifferentFromSelected();
  const mustUpdateParameterGraph = isLoadedParameterGraphDifferentFromSelected();
  if (!mustUpdateHeatmap && !mustUpdateParameterGraph) return;

  // Otherwise, we fetch the vizualizations and update the loaded version
  // Indicate the loading state
  if (mustUpdateHeatmap) {
    _isLoadingHeatmap = true;
    subjectHeatmap.next();
  }

  if (mustUpdateParameterGraph) {
    _isLoadingParameterGraph = true;
    subjectParameterGraph.next();
  }

  // Fetch the updated graph
  const { heatMapBase64JpegImage, parameterGraphBase64JpegImage } =
    await httpRequestService.getVisualizationsForParameters(
      _selectedFirstParameterIndex,
      _selectedSecondParameterIndex
    );

  // Update the vizualizations and remove the loading state
  if (mustUpdateHeatmap) {
    _isLoadingHeatmap = false;
    _loadedHeatmapBase64JpegImageData = heatMapBase64JpegImage;
    _loadedHeatmapBase64JpegImageFirstIndex = firstParameterIndex;
    _loadedHeatmapBase64JpegImageSecondIndex = secondParameterIndex;
    subjectHeatmap.next();
  }

  if (mustUpdateParameterGraph) {
    _isLoadingParameterGraph = false;
    _loadedParameterGraphBase64JpegImageData = parameterGraphBase64JpegImage;
    _loadedParameterGraphBase64JpegImageIndex = firstParameterIndex;
    subjectParameterGraph.next();
  }
}