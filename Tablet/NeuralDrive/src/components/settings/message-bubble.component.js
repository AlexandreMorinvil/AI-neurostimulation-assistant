import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SettingsMessageType, SettingsMessageFontSize } from '../../const/settings';
import { textStyles } from "../../styles/text.styles";

const ICON_CLEARED = "✓";
const ICON_DISABLED = "🛇";
const ICON_INFORMATION = "ⓘ";
const ICON_WARNING = "⚠️";
const ICON_NOTHING = "";

const COLOR_DARKER_GREY = "darkerGreyColor";
const COLOR_ORANGE = "orangeColor";
const COLOR_GREEN = "greenColor";
const COLOR_GREY = "greyColor";
const COLOR_BLUE = "blueColor";

const MessageBubble = (props) => {

  /**
   * Props
   */
  const { message, type, fontSize } = props;

  /**
   * States
   */
  const [stateMessage, setStateMessage] = useState(message);
  const [stateIcon, setStateIcon] = useState(ICON_NOTHING);
  const [stateHasIcon, setStateHasIcon] = useState(false);
  const [stateBackgoundColor, setStateBackgoundColor] = useState(ICON_NOTHING);
  const [stateFontSize, setStateFontSize] = useState(SettingsMessageFontSize.NORMAL);

  /**
   * Functions
   */
  const initializeFormat = (type) => {
    switch (type) {
      case SettingsMessageType.CLEARED:
        setStateIcon(ICON_CLEARED);
        setStateBackgoundColor(COLOR_GREEN);
        setStateHasIcon(true);
        break;
      case SettingsMessageType.DISABLED:
        setStateIcon(ICON_DISABLED);
        setStateBackgoundColor(COLOR_DARKER_GREY);
        setStateHasIcon(true);
        break;
      case SettingsMessageType.INFORMATION:
        setStateIcon(ICON_INFORMATION);
        setStateBackgoundColor(COLOR_BLUE);
        setStateHasIcon(true);
        break;
      case SettingsMessageType.WARNING:
        setStateIcon(ICON_WARNING);
        setStateBackgoundColor(COLOR_ORANGE);
        setStateHasIcon(true);
        break;
      default: // Includes "NEUTRAL"
        setStateIcon(ICON_NOTHING);
        setStateBackgoundColor(COLOR_GREY);
        setStateHasIcon(false);
        break;
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateFontSize(props.fontSize);
    setStateMessage(props.message);
    initializeFormat(props.type);
  }, [props]);

  /**
   * Initialization
   */
  useEffect(() => {
    initializeFormat(props.type);
  }, []);

  /**
   * Render
   */
  return (
    <View style={[styles.content, styles[stateBackgoundColor]]}>
      {stateHasIcon &&
        <View style={styles.iconArea}>
          <Text style={styles.icon}>
            {stateIcon}
          </Text>
        </View>
      }
      <View style={styles.messageArea}>
        <Text style={[textStyles.default, styles.message, { fontSize: stateFontSize }]}>
          {stateMessage}
        </Text>
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    opacity: 0.9,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
  },
  messageArea: {
    flex: 1,
  },
  message: {
    textAlign: "center",
  },
  [`${COLOR_DARKER_GREY}`]: {
    backgroundColor: "#CECECE",
    borderColor: "#C1C1C1",
  },
  [`${COLOR_BLUE}`]: {
    backgroundColor: "#03BAFC",
    borderColor: "#07A9E3",
  },
  [`${COLOR_GREEN}`]: {
    backgroundColor: "#32C832",
    borderColor: "#24C024",
  },
  [`${COLOR_GREY}`]: {
    backgroundColor: "#DEDEDE",
    borderColor: "#D1D1D1",
  },
  [`${COLOR_ORANGE}`]: {
    backgroundColor: "#FCBA03",
    borderColor: "#F5B200",
  },
});

export default MessageBubble;