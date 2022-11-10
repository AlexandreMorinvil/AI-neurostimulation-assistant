import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SettingsMessageType } from '../../const/settings';

const ICON_INFORMATION = "ⓘ";
const ICON_WARNING = "⚠️";
const ICON_NOTHING = " ";

const COLOR_ORANGE = "orangeColor";
const COLOR_GREY = "greyColor";
const COLOR_BLUE = "blueColor";

const MessageBubble = (props) => {

  /**
   * Props
   */
  const { message, type } = props;

  /**
   * States
   */
  const [stateMessage, setStateMessage] = useState(message);
  const [stateIcon, setStateIcon] = useState(ICON_NOTHING);
  const [stateBackgoundColor, setStateBackgoundColor] = useState(ICON_NOTHING);

  /**
   * Functions
   */
  const initializeFormat = () => {
    switch (type) {
      case SettingsMessageType.DISABLED:
        setStateIcon(ICON_NOTHING);
        setStateBackgoundColor(COLOR_GREY);
        break;
      case SettingsMessageType.WARNING:
        setStateIcon(ICON_WARNING);
        setStateBackgoundColor(COLOR_ORANGE);
        break;
      default: // Includes "INFORMATION"
        setStateIcon(ICON_INFORMATION);
        setStateBackgoundColor(COLOR_BLUE);
        break;
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateMessage(props.message);
  }, [props.message]);

  /**
   * Initialization
   */
  useEffect(() => {
    initializeFormat();
  }, []);

  /**
   * Render
   */
  return (
    <View style={[styles.content, styles[stateBackgoundColor]]}>
      <View style={styles.iconArea}>
        <Text style={styles.icon}>
          {stateIcon}
        </Text>
      </View>
      <View style={styles.messageArea}>
        <Text style={styles.message}>
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
    opacity: 0.75,
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
  [`${COLOR_BLUE}`]: {
    backgroundColor: "#03BAFC",
    borderColor: "#07A9E3",
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