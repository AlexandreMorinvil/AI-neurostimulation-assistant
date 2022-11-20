import {
  initializeValueWithPersistantData,
  savePersistantData
} from "./persistant-data.service";

// Constants
export const POSSIBLE_DIMENSIONS_LIST = [10, 50, 100, 200, 500];
export const DEFAULT_PROBLEM_DIMENSION = POSSIBLE_DIMENSIONS_LIST[0];

const STORE_KEY_PROBLEM_DIMENSION = "problemDimension";

// Variables
let _problemDimension = DEFAULT_PROBLEM_DIMENSION;

export function getProblemDimension() {
  return _problemDimension;
}

export function setProblemDimension(dimension) {
  _problemDimension = dimension;
  savePersistantData(STORE_KEY_PROBLEM_DIMENSION, _problemDimension);
}

// Initialization
(async function initialize() {
  _problemDimension = await initializeValueWithPersistantData(STORE_KEY_PROBLEM_DIMENSION, _problemDimension);
})()
