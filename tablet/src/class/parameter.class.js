// TODO: Transform into typescript file
// TODO: Rename the class

const REFUSAL_REASON_ABOVE_MAX = (maximum) => `The maximum value is ${maximum}.`;
const REFUSAL_REASON_BELOW_MIN = (minimum) => `The minimum value is ${minimum}.`;
const REFUSAL_REASON_WHOLE_NUMBER = "The value must be a whole number.";
const ACCEPTANCE_MESSAGE = "Accepted value."

export class Parameter {
  constructor(jsonDefinition) {
    this.name = jsonDefinition.name;
    this.default = jsonDefinition.default;
    this.dimension = jsonDefinition.dimension;
    this.unit = jsonDefinition.unit;
  }

  getDefaultValue() {
    return this.default;
  }

  getDimension() {
    return this.dimension;
  }

  getMinimumValue() {
    return 0;
  }

  getMaximumValue() {
    return (this.dimension - 1);
  }

  getName() {
    return this.name;
  }

  getUnit() {
    return this.unit;
  }

  isValueAccepted(value) {
    const valueToTest = Number(value);
    if (!/^\d+$/.test(valueToTest)) return { isAccepted: false, reason: REFUSAL_REASON_WHOLE_NUMBER };
    else if (valueToTest > this.getMaximumValue()) return { isAccepted: false, reason: REFUSAL_REASON_ABOVE_MAX(this.getMaximumValue()) };
    else if (valueToTest < this.getMinimumValue()) return { isAccepted: false, reason: REFUSAL_REASON_BELOW_MIN(this.getMinimumValue()) };
    else return { isAccepted: true, reason: ACCEPTANCE_MESSAGE };
  }
}