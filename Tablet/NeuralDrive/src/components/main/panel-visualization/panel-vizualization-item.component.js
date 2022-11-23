import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR_BACKGROUND } from '../../../styles/colors.style.js';

const HEIGHT = 80;
const FONT_SIZE = 20;

const BACKGROUND_COLOR_BLUE = "#00BCD4";

const PanelVizualizationItem = (props) => {

  /**
   * Props
   */
  const { title, children } = props;

  /**
   * Render
   */
  return (
    <View style={[styles.container]}>
      <View style={styles.shadow}>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {`${title}`}
          </Text>
        </View>
        <View style={styles.contentContainer}>
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
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  shadow: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContainer: {
    backgroundColor: BACKGROUND_COLOR_BLUE,
    flexDirection: "row",
    alignItems: "center",
    height: HEIGHT,
    width: "100%",
    paddingLeft: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
    padding: 25,
    fontSize: 20,
  },
  title: {
    color: "white",
    fontSize: FONT_SIZE,
    fontWeight: "bold",
  }
});

export default PanelVizualizationItem;