export class Query {
  constructor(parametersValueList, recommendedValuesList, tremorValue) {
    this.tremorValue = tremorValue;
    this.parametersValueList = parametersValueList;
    this.recommendedValuesList = recommendedValuesList;
  }

  getTremorValue() {
    return this.tremorValue;
  }

  getRecommendedValuesList() {
    return this.recommendedValuesList;
  }

  getParametersValueList() {
    return this.parametersValueList;
  }
}