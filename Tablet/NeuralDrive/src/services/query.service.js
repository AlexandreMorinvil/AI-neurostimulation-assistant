import { Subject } from "rxjs";

import * as httpRequestService from "./http-request.service";
import * as queryVizualizationService from "./query-vizualization.service";

// Variables
let _historySelectedParametersList = [];
let _historyTremorMetricList = [];
let _historySuggestedValues = [];

// Exported methods
export function getCurrentSuggestedParametersList() {
  return _historySuggestedValues.at(-1);
}

export function getLastQueryParametersList() {
  return _historySelectedParametersList.at(-1);
}

export async function performQuery(parametersValueList, tremorMetric) {

  // Execute query
  const { suggestedParametersList } =
    await httpRequestService.postExecuteQuery(parametersValueList, tremorMetric);

  // Store values history
  _historySuggestedValues.push(suggestedParametersList);
  _historySelectedParametersList.push(parametersValueList);
  _historyTremorMetricList.push(tremorMetric);

  // Update the query vizualizations
  queryVizualizationService.refreshVizualizations();
}

