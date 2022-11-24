import { Subject } from "rxjs";

import * as watchDataService from "./watch-data.service";

// Constants
const MOVING_AVERAGE_WINDOW = 200;

// Variables
let _scalarizedTremorPointsBuffer = Array(watchDataService.COUNT_BUFFER_POINTS).fill(0);
let _watchDataBufferSubscription = null;

// Reactive behavior handlers
export const subject = new Subject();

// Exported methods
export function getScalarizedTremorPointListToDisplay(countPoints, keepPointFrequency) {
  const pointsList = _scalarizedTremorPointsBuffer.slice(-countPoints);
  return pointsList.filter((value, index) => { return index % keepPointFrequency === 0 })
}

export function getMovingAveragePointsListToDisplay(countPoints, keepPointFrequency) {
  const countPointsToTake = countPoints - Math.ceil(MOVING_AVERAGE_WINDOW / 2);
  const movingAverageTremorPointsBuffer = computeMovingAverageTremorPointsBuffer();
  const pointsList =  movingAverageTremorPointsBuffer.slice(-countPointsToTake);
  return pointsList.filter((value, index) => { return index % keepPointFrequency === 0 });
}

export function getTremorMetricToDisplay() {
  const lastTrenorPointsWindow = _scalarizedTremorPointsBuffer.slice(-MOVING_AVERAGE_WINDOW);
  return computeAverage(lastTrenorPointsWindow);
}

// Private methods
function computeAverage(pointsList) {
  return pointsList.reduce((a, b) => a + b, 0) / pointsList.length;
};

function computeMovingAverageTremorPointsBuffer() {

  const countPointsTakenBefore = Math.floor(MOVING_AVERAGE_WINDOW / 2);
  const countPointsTakenAfter = Math.ceil(MOVING_AVERAGE_WINDOW / 2);

  const startIndex = countPointsTakenBefore;
  const endIndex = _scalarizedTremorPointsBuffer.length - countPointsTakenAfter;

  const movingAverageList = [];
  for (let i = startIndex; i < endIndex; i++) {
    const pointsWindow = _scalarizedTremorPointsBuffer.slice(i - countPointsTakenBefore, i + countPointsTakenAfter);
    const average = computeAverage(pointsWindow);
    movingAverageList.push(average);
  }

  return movingAverageList;
}

function scalarizeTremorPoint(rawDataPoint) {
  const { xAcceleration, yAcceleration, zAcceleration } = rawDataPoint;
  return Math.sqrt(
    Math.pow(xAcceleration, 2),
    Math.pow(yAcceleration, 2),
    Math.pow(zAcceleration, 2)
  );
}

async function updateBuffers(rawDataPointsBuffer) {
  updateScalarizedTremorPointsBuffer(rawDataPointsBuffer);
  subject.next();
}

function updateScalarizedTremorPointsBuffer(rawDataPointsBuffer) {
  _scalarizedTremorPointsBuffer = rawDataPointsBuffer.map(scalarizeTremorPoint);
}

// Initialization
export function initialize() {
  // Subscribe to the watch data buffer
  _watchDataBufferSubscription = watchDataService.subject.subscribe({ next: updateBuffers });
}

export function cleanUp() {
  // Unsubscribe to the watch data buffer
  _watchDataBufferSubscription && _watchDataBufferSubscription.unsubscribe();
}
