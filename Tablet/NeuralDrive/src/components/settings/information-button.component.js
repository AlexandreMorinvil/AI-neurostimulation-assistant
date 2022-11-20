import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ICON_INFORMATION = "i";
const ICON_REMOVE = "✕";

const InformationButton = ({ setParentIsActiveFunction }) => {

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(false);

  /**
   * Functions
   */
  setParentIsActiveFunction = setParentIsActiveFunction ? setParentIsActiveFunction : () => { };

  const setActivation = (activation) => {
    setStateIsActive(activation);
    setParentIsActiveFunction(activation);
  }

  const handleToggleIsActive = () => {
    setActivation(!stateIsActive);
  }

  /**
 * Initialization
 */
  useEffect(() => {
    setActivation(stateIsActive);
  }, []);

  /**
   * Render
   */
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={handleToggleIsActive}
    >
      <Text style={styles.icon}>
        {stateIsActive ? ICON_REMOVE : ICON_INFORMATION}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  content: {
    backgroundColor: "#03BAFC",
    borderColor: "#07A9E3",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 2,
    fontSize: 20,
    opacity: 0.75,
    flexDirection: "row",
    alignItems: "center",
    width: 30,
    height: 30,
    flexDirection: "column",
  },
  icon: {
    color: "#444444",
    fontWeight: "bold",
    textAlign: "center",
  }

});

export default InformationButton;