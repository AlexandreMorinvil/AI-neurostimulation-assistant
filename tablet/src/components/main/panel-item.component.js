import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLOR_BACKGROUND } from '../../styles/colors.style.js';

const HEIGHT = 80;
const FONT_SIZE = 20;

const BACKGROUND_COLOR_BLUE = "#00BCD4";

const PanelItem = (props) => {

  /**
   * Props
   */
  const { isActive, title, children } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive);
  const [stateTitle] = useState(title || "");

  /**
   * Functions
   */
  const handleToggleIsActive = () => {
    setStateIsActive(!stateIsActive);
  }

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View style={styles.headerContainer}>

          <TouchableOpacity
            style={styles.expandIconArea}
            onPress={handleToggleIsActive}
          >
            <Text style={styles.expandIcon}>
              {stateIsActive ? '-' : '+'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            {`${stateTitle}`}
          </Text>
        </View>
        <View style={[
          styles.contentContainer,
          !stateIsActive && styles.invisible
        ]}>
          {children}
        </View>
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: BACKGROUND_COLOR_BLUE,
    flexDirection: "row",
    alignItems: "center",
    height: HEIGHT,
    width: "100%",
  },
  contentContainer: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
    padding: 25,
    fontSize: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  expandIconArea: {
    height: HEIGHT,
    width: HEIGHT,
  },
  expandIcon: {
    fontSize: 50,
    alignItems: "center",
    textAlign: "center",
    height: HEIGHT,
    width: HEIGHT,
  },
  title: {
    color: "white",
    fontSize: FONT_SIZE,
    fontWeight: "bold",
  },
  invisible: {
    display: 'none'
  }
});

export default PanelItem;