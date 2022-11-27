import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { COLOR_BACKGROUND } from '../../../../styles/colors.style';

const TEXT_INSERT_VALUE = "Insert value";
const TEXT_SUGGESTED_VALUE_PRESENT = "Sugg. :";
const TEXT_SUGGESTED_VALUE = (value) => `Sugg. : ${value}`

const TEXT_OLD_VALUE_BUTTON = "Old";

const InputQueryParameter = ({ setParentValueFunction, ...props }) => {

  /**
   * Props
   */
  const { isDisabled, isFirstInput, parameter, previousValue, suggestedValue, value, style } = props;

  /**
   * States
   */
  const [stateIsDisabled, setStateIsDisabled] = useState(isDisabled);
  const [stateIsFirstInput, setStateIsFirstInput] = useState(isFirstInput);
  const [stateParameter, setStateParameter] = useState(parameter);
  const [stateSuggestedValue, setStateSuggestedValue] = useState(suggestedValue);
  const [stateValue, setStateValue] = useState(value);
  const [statePreviousValue, setStatePreviousValue] = useState(previousValue);

  /**
   * Functions
   */
  const isValueEmpty = () => {
    return Boolean(stateIsFirstInput);
  }

  const setValue = (value) => {
    setParentValueFunction(value);
    setStateValue(value);
  }

  const setValueToPreviousValue = () => {
    setValue(statePreviousValue);
  }

  const makeTitleText = () => {
    const name = stateParameter.getName();
    return `${name}`
  }

  const makeLabelText = () => {
    if (stateIsFirstInput) {
      if (isValueEmpty()) return TEXT_INSERT_VALUE;
      else return stateParameter.getName();
    } else {
      if (stateValue === stateSuggestedValue) return TEXT_SUGGESTED_VALUE_PRESENT;
      else return TEXT_SUGGESTED_VALUE(stateSuggestedValue);
    }
  }

  const makePreviousButtonText = () => {
    if (stateIsFirstInput) return TEXT_OLD_VALUE_BUTTON;
    else return statePreviousValue;
  }

  const makeRangeText = () => {
    const minimumValue = stateParameter.getMinimumValue();
    const maximumValue = stateParameter.getMaximumValue();
    const unit = stateParameter.getUnit();
    return `{ ${minimumValue}, ${minimumValue + 1}, ${minimumValue + 2}, ... , ${maximumValue} } ${unit}`;
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateIsDisabled(props.isDisabled);
    setStateIsFirstInput(props.isFirstInput);
    setStateParameter(props.parameter);
    setStatePreviousValue(props.previousValue);
    setStateSuggestedValue(props.suggestedValue);
    setStateValue(props.value);
  },
    [
      props.isDisabled,
      props.isFirstInput,
      props.parameter,
      props.previousValue,
      props.suggestedValue,
      props.value
    ]);

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textArea}>
        <Text style={styles.title}>
          {makeTitleText()}
        </Text>
        <Text style={styles.precision}>
          {makeRangeText()}
        </Text>
      </View>

      <View style={styles.controlArea}>
        {!stateIsFirstInput &&
          <Button
            disabled={stateIsDisabled || stateIsFirstInput}
            style={styles.previousValueButton}
            icon="sync"
            mode="elevated"
            dark={false}
            loading={false}
            onPress={setValueToPreviousValue}
            uppercase={true}>
            <Text variant="labelLarge" adjustsFontSizeToFit={true}>
              {makePreviousButtonText()}
            </Text>
          </Button>
        }


        <TextInput
          style={[
            styles.input,
            styles.textInput,
            stateIsDisabled && styles.disabledText
          ]}
          mode="outlined"
          disabled={stateIsDisabled}
          activeOutlineColor="black"
          outlineColor="white"
          selectionColor="#6f6f6f"
          multiline={false}
          value={stateValue}
          onChangeText={setValue}
          textColor="black"
          label={makeLabelText()}
          dense={true}
          keyboardType="numeric"
        />
      </View>
    </View >
  );

}

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BACKGROUND.ItemSubSection,
    borderRadius: 10,
    padding: 20,
  },
  textArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  controlArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  precision: {},
  previousValueButton: {
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  input: {
    flex: 1,
    color: "black",
    textAlign: 'center',
  },
  disabledText: {
    backgroundColor: "#BBBBBB"
  }
});

export default InputQueryParameter