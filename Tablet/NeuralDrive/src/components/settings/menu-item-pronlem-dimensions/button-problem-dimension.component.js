import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ButtonProblemDimension = ({ setParentStateSelectedDimensionFunction, ...props }) => {

  /**
   * Props
   */
  const { isActive, dimension, style } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive);
  const [stateDimension, setStateDimension] = useState(dimension || 10);

  /**
   * Functions
   */
  setParentStateSelectedDimensionFunction = setParentStateSelectedDimensionFunction ? setParentStateSelectedDimensionFunction : () => { };

  const makeButtonText = () => {
    return `${stateDimension} × ${stateDimension}`;
  }

  const setSelectedDimension = () => {
    setParentStateSelectedDimensionFunction(stateDimension);
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateDimension(props.dimension);
  }, [props.dimension]);

  useEffect(() => {
    setStateIsActive(props.isActive);
  }, [props.isActive]);

  /**
   * Render
   */
  return (
    <TouchableOpacity
      style={[
        styles.container,
        stateIsActive && styles.active,
        props.style
      ]}
      activeOpacity={stateIsActive ? 1 : 0.85}
      onPress={setSelectedDimension}
    >
      <View style={styles.textArea}>
        <Text style={[styles.text, stateIsActive && styles.activeText]}>
          {makeButtonText()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 2,
    height: 150,
    minwidth: 150,
    maxWidth: 150,
    padding: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#CCCCCC",
    borderColor: "#C0C0C0",
  },
  textArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#999999",
    fontSize: 20,
    fontWeight: "bold",
  },
  active: {
    backgroundColor: "#32C832",
    borderColor: "#24C024",
    fill: "#128725",
  },
  activeText: {
    color: "#128725",
  }
});

export default ButtonProblemDimension;