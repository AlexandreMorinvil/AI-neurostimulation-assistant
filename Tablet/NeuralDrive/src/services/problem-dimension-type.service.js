
import { Subject } from "rxjs";

import { ProblemDimensionType } from "../class/problem-dimension-type.class";
import problemTypesConfiguration from "../configurations/problem-types.json"
import {
  initializeValueWithPersistantData,
  savePersistantData
} from "./persistant-data.service";

// Constants
const POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST = parsePossibleProblemDimensionTypesListFromConfigurations();
const DEFAULT_PROBLEM_DIMENSION_TYPE = POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST[0];

const STORE_KEY_PROBLEM_DIMENSION_TYPE_ID = "problemDimensionTypeId";

// Variables
let _problemDimensionType = DEFAULT_PROBLEM_DIMENSION_TYPE;

// Reactive behavior handlers
export const subject = new Subject();

// Exported methods
export function getParametersList() {
  return _problemDimensionType.getParametersList();
}

export function getPossibleProblemDimensionTypesList() {
  return POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST;
}

export function getProblemDimensionType() {
  return _problemDimensionType;
}

export function getProblemDimensionsList() {
  return _problemDimensionType.getDimensionsList();
}

export function getDefaultValuesList() {
  return _problemDimensionType.getDefaultValuesList();
}

export function getParameterNameByIndex(index) {
  return _problemDimensionType.getParameterNameByIndex(index);
}

export function setProblemDimensionType(problemDimensionType) {
  _problemDimensionType = problemDimensionType;
  savePersistantData(STORE_KEY_PROBLEM_DIMENSION_TYPE_ID, _problemDimensionType.getId());
  subject.next();
}

// Private methods
function parsePossibleProblemDimensionTypesListFromConfigurations() {
  return problemTypesConfiguration.map((problemType) => {
    return new ProblemDimensionType(problemType);
  })
}

function getProblemDimensionTypeFromId(problemDimensionTypeId) {
  const poblemDimensionType = POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST.find((problemDimensionType) => {
    return problemDimensionType.isSameId(problemDimensionTypeId);
  });
  return poblemDimensionType || DEFAULT_PROBLEM_TYPE;
}

// Initialization
export async function initialize() {
  const savecProblemDimensionTypeId = await initializeValueWithPersistantData(STORE_KEY_PROBLEM_DIMENSION_TYPE_ID, _problemDimensionType.getId());
  _problemDimensionType = getProblemDimensionTypeFromId(savecProblemDimensionTypeId);
  subject.next();
}

