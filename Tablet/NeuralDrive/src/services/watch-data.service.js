// Const 
const COUNT_POINTS_BUFFER_POINTS_DISPLAYED = 600;
const INTERVAL_BUFFER_PULL_IN_MS = 100;
const FREQUENCY_WATCH_POINT_GENERATION_IN_HZ = 50;
const MIN_POINTS_RENEWED_PER_BUFFER_PULL = INTERVAL_BUFFER_PULL_IN_MS / 1000 * FREQUENCY_WATCH_POINT_GENERATION_IN_HZ;

// Variables
let _intervalBufferRefresh = 0;
let _isLocked = false;
let _watchPointsRawDataBuffer = [];
let _watchPointDisplayedBuffer = Array(COUNT_POINTS_BUFFER_POINTS_DISPLAYED).fill(0);

// Exported methods
export function getWatchPointsToDisplay(countPoints) {
  return _watchPointDisplayedBuffer.slice(-countPoints);
}

export async function handleReceivedWatchPacket(watchPacket) {
  try {
    console.log("Here is the packet", watchPacket);
    const parsedWatchPacket = JSON.parse(watchPacket);
    _watchPointsRawDataBuffer = _watchPointsRawDataBuffer.concat(parsedWatchPacket);
  } catch (error) {
    console.error("Watch data format is invalid: ", error);
  }
}

// Private methods
function tranformWatchRawDataPointToDisplayedPoint(rawDataPoint) {
  return Math.sqrt(
    Math.pow(rawDataPoint.acc_x, 2),
    Math.pow(rawDataPoint.acc_y, 2),
    Math.pow(rawDataPoint.acc_z, 2)
  );
}

async function updateWatchPointDisplayedBuffer() {
  // Lock the buffer;
  if (_isLocked) return;
  _isLocked = true;

  // Determine the amount of points that must be refreshed
  const retreivedRawPointList = _watchPointsRawDataBuffer.splice(0, _watchPointsRawDataBuffer.length);
  const countPointsRefreshed = Math.max(retreivedRawPointList.length, MIN_POINTS_RENEWED_PER_BUFFER_PULL);

  // Generate the new points to diplay
  let newPointsToDisplayList = Array(countPointsRefreshed).fill(0);
  const pointsFromBuffer = retreivedRawPointList.map(tranformWatchRawDataPointToDisplayedPoint);
  newPointsToDisplayList.splice(0, pointsFromBuffer.length);
  newPointsToDisplayList = newPointsToDisplayList.concat(pointsFromBuffer);

  // Shift the points in the buffer of points to diplay
  _watchPointDisplayedBuffer.splice(0, newPointsToDisplayList.length);
  _watchPointDisplayedBuffer = _watchPointDisplayedBuffer.concat(newPointsToDisplayList);

  // Unlock the buffer;
  _isLocked = false;
}

// Initialization
export function initialize() {
  _isLocked = false;
  _intervalBufferRefresh = setInterval(updateWatchPointDisplayedBuffer, INTERVAL_BUFFER_PULL_IN_MS);
}

export function cleanUp() {
  clearInterval(_intervalBufferRefresh);
}
