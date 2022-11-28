import * as httpRequestService from "./http-request.service";
import * as queryVizualizationService from "./query-vizualization.service";

// Variables
let _historySelectedParametersList = [];
let _historyTremorMetricList = [];
let _historySuggestedValues = [];

// Exported methods
export function hasDoneQueryPreviously() {
  return _historySelectedParametersList.length > 0;
}

export function getCurrentSuggestedParametersList() {
  return _historySuggestedValues.slice(-1)?.pop() || [];
}

export function getLastQueryParametersList() {
  return _historySelectedParametersList.slice(-1)?.pop() || [];
}

export async function performQuery(parametersValueList, tremorMetric) {

  // Execute query
  const { suggestedParametersList } =
    await httpRequestService.postExecuteQuery(parametersValueList, tremorMetric);

  // Store values history
  addSuggestedParametersListToHistory(suggestedParametersList)
  addSelectedParametersListToHistory(parametersValueList)
  addTremorMetricToHistory(tremorMetric);

  // Update the query vizualizations
  queryVizualizationService.refreshVizualizations();
}

// Private methods
function addSelectedParametersListToHistory(slectedParametersList) {
  _historySelectedParametersList.push(slectedParametersList.map(value => Number(value)));
}

function addSuggestedParametersListToHistory(suggestedParametersList) {
  _historySuggestedValues.push(suggestedParametersList.map(value => Number(value)));
}

function addTremorMetricToHistory(tremorMetric) {
  _historyTremorMetricList.push(Number(tremorMetric));
}
