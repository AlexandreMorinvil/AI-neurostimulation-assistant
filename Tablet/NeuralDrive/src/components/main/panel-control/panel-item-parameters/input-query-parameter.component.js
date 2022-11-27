import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { COLOR_BACKGROUND } from '../../../../styles/colors.style';

const TEXT_INSERT_VALUE = "Insert value";
const TEXT_SUGGESTED_VALUE_PRESENT = "Suggestion :";
const TEXT_SUGGESTED_VALUE = (value) => `Suggestion : ${value}`

const InputQueryParameter = ({ setParentValueFunction, ...props }) => {

  /**
   * Props
   */
  const { isDisabled, isFirstInput, parameterName, previousValue, suggestedValue, value, style } = props;

  /**
   * States
   */
  const [stateIsDisabled, setStateIsDisabled] = useState(isDisabled);
  const [stateIsFirstInput, setStateIsFirstInput] = useState(isFirstInput);
  const [stateParameterName, setStateParameterName] = useState(parameterName);
  const [stateSuggestedValue, setStateSuggestedValue] = useState(suggestedValue);
  const [stateValue, setStateValue] = useState(value);
  const [statePreviousValue, setStatePreviousValue] = useState(previousValue);

  /**
   * Functions
   */
  const setValue = (value) => {
    setParentValueFunction(value);
    setStateValue(value);
  }

  const setValueToPreviousValue = () => {
    setValue(statePreviousValue);
  }

  const makeLabelText = () => {
    if (stateIsFirstInput) return TEXT_INSERT_VALUE;
    else if (stateValue === stateSuggestedValue) return TEXT_SUGGESTED_VALUE_PRESENT;
    else return TEXT_SUGGESTED_VALUE(stateSuggestedValue);

  }

  const makeSpecification = () => {
    return "{ 0, 1, 2, ... , 9 }"
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateIsDisabled(props.isDisabled);
    setStateIsFirstInput(props.isFirstInput);
    setStateParameterName(props.parameterName);
    setStatePreviousValue(props.previousValue);
    setStateSuggestedValue(props.suggestedValue);
    setStateValue(props.value);
  },
    [
      props.isDisabled,
      props.isFirstInput,
      props.parameterName,
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
          {stateParameterName}
        </Text>
        <Text style={styles.precision}>
          {makeSpecification()}
        </Text>
      </View>

      <View style={styles.controlArea}>
        <Button
          style={styles.previousValueButton}
          icon="sync"
          mode="elevated"
          dark={false}
          loading={false}
          onPress={setValueToPreviousValue}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            {statePreviousValue}
          </Text>
        </Button>

        <TextInput
          style={[styles.input, styles.textInput]}
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
    // backgroundColor: "#C3DCE6",
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
  }
});

export default InputQueryParameter