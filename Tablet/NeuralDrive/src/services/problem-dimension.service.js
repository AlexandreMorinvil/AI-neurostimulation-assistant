
import problemTypesConfiguration from "../configurations/problem-types.json"
import {
  initializeValueWithPersistantData,
  savePersistantData
} from "./persistant-data.service";

// Constants
export const POSSIBLE_DIMENSIONS_LIST = [
  [10, 10],
  [20, 30],
  [50, 50],
  [10, 10, 10],
  [5, 20, 10]
];
const DEFAULT_PROBLEM_DIMENSION = POSSIBLE_DIMENSIONS_LIST[0];

const STORE_KEY_PROBLEM_DIMENSION = "problemDimension";

// Variables
let _problemDimension = DEFAULT_PROBLEM_DIMENSION;

// Exported methods
export function getProblemDimension() {
  return _problemDimension;
}

export function getDefaultValues() {
  return _problemDimension.slice().fill(0);
}

export function isIpCurrentDimension(dimension) {
  return dimension === getProblemDimension();
}

export function setProblemDimension(dimension) {
  _problemDimension = dimension;
  savePersistantData(STORE_KEY_PROBLEM_DIMENSION, _problemDimension);
}

// Private methods
// TODO : Implement properly
function parsePossibleDimensionsListFromConfigurations() {
  return problemTypesConfiguration.map((type) => {
    const { system, parameters } = type;
    return parameters.map((parameter) => {
      return parameter.dimension;
    })
  })
}

// Initialization
export async function initialize() {
  _problemDimension = await initializeValueWithPersistantData(STORE_KEY_PROBLEM_DIMENSION, _problemDimension);
}
