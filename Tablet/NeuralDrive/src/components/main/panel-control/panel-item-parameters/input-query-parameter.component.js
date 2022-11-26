import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const InputQueryParameter = ({ setParentValueFunction, ...props }) => {

  /**
   * Props
   */
  const { initialValue, label, previousValue } = props;

  /**
   * States
   */
  const [stateLabel, setStateLabel] = useState(label);
  const [stateValue, setStateValue] = useState(initialValue);
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

  /**
   * Effects
   */
  useEffect(() => {
    setStateLabel(props.label);
    setStatePreviousValue(props.previousValue);
  },
    [
      props.label,
      props.previousValue
    ]);

  /**
   * Render
   */
  return (
    <View style={styles.container}>


      <TouchableOpacity
        onPress={setValueToPreviousValue}
      >
        <Text variant="titleMedium" style={{ color: '#374F42' }}>
          {statePreviousValue}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        mode="outlined"
        activeOutlineColor="black"
        outlineColor="white"
        selectionColor="#6f6f6f"
        multiline={false}
        value={stateValue}
        onChangeText={setValue}
        textColor="black"
        label={stateLabel}
        dense={true}
      />
    </View>
  );

}

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDDDDD",
    margin: 10,
    height: 100,
    width: 100,
  },
  input: {
    width: '60%',
    textAlign: 'center',
  }
});

export default InputQueryParameter