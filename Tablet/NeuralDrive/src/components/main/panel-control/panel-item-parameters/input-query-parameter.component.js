import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const InputQueryParameter = (props) => {

  /**
   * Props
   */
  const { dimension, setFunction, value, oldAlgorithmValue, boxFunction } = props;

  /**
   * Render
   */
  return (
    <View style={styles.container}>


      <TouchableOpacity onPress={boxFunction}>
        <Text variant="titleMedium" style={{ color: '#374F42' }}>
          {oldAlgorithmValue}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        mode="outlined"
        activeOutlineColor="black"
        outlineColor="white"
        selectionColor="#6f6f6f"
        multiline={false}
        value={value}
        onChangeText={setFunction}
        textColor="black"
        label={dimension}
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
    backgroundColor: "green",
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