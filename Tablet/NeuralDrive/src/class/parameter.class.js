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

  getUnit() {
    return this.unit;
  }

  getminimumValue() {
    return 0;
  }

  getMaximumValue() {
    return (this.dimension - 1);
  }

  getName() {
    return this.name;
  }

  isValueAccepted(value) {
    if (value < 0) return { isAccepted: false, reason: REFUSAL_REASON_ABOVE_MAX(this.getMaximumValue()) };
    else if (value > this.maxValue) return { isAccepted: false, reason: REFUSAL_REASON_BELOW_MIN(this.getminimumValue()) };
    else if (/^\d+$/.test(value)) return { isAccepted: false, reason: REFUSAL_REASON_WHOLE_NUMBER };
    else return { isAccepted: false, reason: ACCEPTANCE_MESSAGE };
  }
}