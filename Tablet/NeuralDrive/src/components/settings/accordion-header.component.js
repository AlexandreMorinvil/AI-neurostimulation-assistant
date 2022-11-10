import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SettingsStatus } from '../../const/settings';

const HEIGHT = 80;
const FONT_SIZE = 20;

const BACKGROUND_COLOR_BLUE = "#00BCD4";
const BACKGROUND_COLOR_GREEN = "#32C832";
const BACKGROUND_COLOR_GREY = "#AAAAAA";
const BACKGROUND_COLOR_ORANGE = "#fac832";
const BACKGROUND_COLOR_RED = "#FA4632";

const STATE_STATUS_ICON_CHECKED = "✓";
const STATE_STATUS_ICON_NOTHING = " ";
const STATE_STATUS_ICON_CROSS_MARK = "✕";
const STATE_STATUS_ICON_EXCLAMATION = "!";
const STATE_STATUS_ICON_QUESTION = "?";

const AccordionHeader = ({ setParentIsActiveFunction, ...props }) => {

  /**
   * Props
   */
  const { isActive, summaryText, titleText, settingStatus } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive || false);
  const [stateSummaryText, setStateSummaryText] = useState(summaryText || "");
  const [stateTitleText] = useState(titleText || "");
  const [stateSettingStatus, setStateSettingsStatus] = useState(settingStatus || SettingsStatus.UNSET);
  const [stateBackgroundColor, setStateBackgroundColor] = useState(BACKGROUND_COLOR_GREY);
  const [stateStatusIcon, setStateStatusIcon] = useState(STATE_STATUS_ICON_NOTHING);

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

  const updateHeaderForStatus = () => {
    console.log("This function was called! 2 : ", stateSettingStatus);
    switch (stateSettingStatus) {
      case SettingsStatus.NEEDED:
        setStateBackgroundColor(BACKGROUND_COLOR_ORANGE);
        setStateStatusIcon(STATE_STATUS_ICON_EXCLAMATION);
        break;
      case SettingsStatus.SET:
        setStateBackgroundColor(BACKGROUND_COLOR_GREEN);
        setStateStatusIcon(STATE_STATUS_ICON_CHECKED);
        break;
      case SettingsStatus.UNSET:
        setStateBackgroundColor(BACKGROUND_COLOR_BLUE);
        setStateStatusIcon(STATE_STATUS_ICON_NOTHING);
        break;
      case SettingsStatus.PROBLEMATIC:
        setStateBackgroundColor(BACKGROUND_COLOR_RED);
        setStateStatusIcon(STATE_STATUS_ICON_CROSS_MARK);
        break;
      default:
        setStateBackgroundColor(BACKGROUND_COLOR_GREY);
        setStateStatusIcon(STATE_STATUS_ICON_QUESTION);
        break;
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateSettingsStatus(props.settingStatus);
    updateHeaderForStatus();
  }, [props.settingStatus]);

  useEffect(() => {
    setStateSummaryText(summaryText);
  }, [props.summaryText]);

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
    <View style={[styles.container, { backgroundColor: stateBackgroundColor }]}>

      <TouchableOpacity
        style={styles.expandIconArea}
        onPress={handleToggleIsActive}
      >
        <Text style={styles.expandIcon}>
          {stateIsActive ? '-' : '+'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {`${stateTitleText} : `}
      </Text>

      <View style={styles.spacer}></View>

      <Text style={styles.summary}>
        {stateSummaryText}
      </Text>

      <View style={styles.statusArea}>
        <Text style={styles.statusIcon}>
          {stateStatusIcon}
        </Text>
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_GREY,
    flexDirection: "row",
    alignItems: "center",
    height: HEIGHT,
    width: "100%",
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
  spacer: {
    flex: 1,
  },
  summary: {
    color: "white",
    fontSize: FONT_SIZE,
    paddingRight: 10,
  },
  statusArea: {
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT,
    width: HEIGHT,
  },
  statusIcon: {
    textAlign: "center",
    fontSize: 40,
    opacity: 0.5
  }
});

export default AccordionHeader;