import * as watchDataService from "./watch-data.service";

// Constants
const MOVING_AVERAGE_WINDOW = 50;

// Variables
let _scalarizedTremorPointsBuffer = Array(watchDataService.COUNT_BUFFER_POINTS).fill(0);
let _movingAverageTremorPointsBuffer = Array(watchDataService.COUNT_BUFFER_POINTS).fill(0);
let _watchDataBufferSubscription = null;

// Exported methods
export function getScalarizedTremorPointListToDisplay(countPoints) {
  return _scalarizedTremorPointsBuffer.slice(-countPoints);
}

export function getMovingAveragePointsListToDisplay(countPoints) {
  const countPointsToTake = countPoints - Math.ceil(MOVING_AVERAGE_WINDOW / 2);
  return _movingAverageTremorPointsBuffer.slice(-countPointsToTake);
}

// Private methods
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
  updateMovingAverageTremorPointsBuffer();
}

function updateScalarizedTremorPointsBuffer(rawDataPointsBuffer) {
  _scalarizedTremorPointsBuffer = rawDataPointsBuffer.map(scalarizeTremorPoint);
}

function updateMovingAverageTremorPointsBuffer() {

  const countPointsTakenBefore = Math.floor(MOVING_AVERAGE_WINDOW / 2);
  const countPointsTakenAfter = Math.ceil(MOVING_AVERAGE_WINDOW / 2);

  const startIndex = countPointsTakenBefore;
  const endIndex = _scalarizedTremorPointsBuffer.length - countPointsTakenAfter;
  const computeAverage = (pointsWindow) => {
    return pointsWindow.reduce((a, b) => a + b, 0) / pointsWindow.length;
  };

  const movingAverageList = [];
  for (let i = startIndex; i < endIndex; i++) {
    const pointsWindow = _scalarizedTremorPointsBuffer.slice(i - countPointsTakenBefore, i + countPointsTakenAfter);
    const average = computeAverage(pointsWindow);
    movingAverageList.push(average);
  }

  _movingAverageTremorPointsBuffer.splice(0, movingAverageList.length, ...movingAverageList);
  console.log(movingAverageList.length, _movingAverageTremorPointsBuffer.length);
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
