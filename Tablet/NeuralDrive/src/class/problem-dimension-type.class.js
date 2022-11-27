import { Parameter } from "./parameter.class";

export class ProblemDimensionType {
  constructor(jsonDefinition) {
    this.id = jsonDefinition.id || 1;
    this.system = jsonDefinition.system;
    this.parametersList = jsonDefinition.parameters?.map((systemJsonDefinition) => {
      return new Parameter(systemJsonDefinition);
    });
  }

  getDefaultValuesList() {
    return this.parametersList.map((parameter) => {
      return parameter.getDefaultValue();
    });
  }

  getDimensionsList() {
    return this.parametersList.map((parameter) => {
      return parameter.getDimension();
    });
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.system;
  }

  getParametersList() {
    return this.parametersList;
  }

  isSame(problemDimensionType) {
    return this.id === problemDimensionType.getId();
  }

  isSameId(id) {
    return this.id === id;
  }
}
