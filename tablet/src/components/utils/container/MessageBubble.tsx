import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/textStyles";
import { COLOR_TEXT } from '@styles/colorStyles';

type Props = {
  fontSize?: number,
  message: string,
  style: ViewStyle,
  type?: SettingsMessageType,
}

const COLOR_DARKER_GREY = "darkerGreyColor";
const COLOR_ORANGE = "orangeColor";
const COLOR_GREEN = "greenColor";
const COLOR_GREY = "greyColor";
const COLOR_BLUE = "blueColor";

const MessageBubble = (props: Props) => {

  /**
   * Constants
   */ 
  const ICON_CLEARED = "check-circle";
  const ICON_DISABLED = "ban";
  const ICON_INFORMATION = "info-circle";
  const ICON_WARNING = "exclamation-triangle";
  const ICON_NOTHING = "";

  /**
   * States
   */
  const [stateMessage, setStateMessage] = useState(props.message);
  const [stateIcon, setStateIcon] = useState(ICON_NOTHING);
  const [stateHasIcon, setStateHasIcon] = useState(false);
  const [stateBackgoundColor, setStateBackgoundColor] = useState(ICON_NOTHING);

  /**
   * Functions
   */
  const initializeFormat = (type: SettingsMessageType = SettingsMessageType.NEUTRAL): void => {
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
    setStateMessage(props.message);
    initializeFormat(props.type);
  }, [props]);

  /**
   * Render
   */
  return (
    <View style={[styles.content, props.style, (styles as any)[stateBackgoundColor]]}>
      {stateHasIcon &&
        <View style={styles.iconArea}>
          <FontAwesome
            name={stateIcon}
            color={COLOR_TEXT.DrawerItemSelected}
            size={50}
          />
        </View>
      }
      <View style={styles.messageArea}>
        <Text style={[textStyles.default, styles.message]}>
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
    flexDirection: "row",
    opacity: 0.75,
    padding: 20,
    alignItems: "center",
  },
  iconArea: {
    marginRight: 15,
  },
  messageArea: {
    flex: 1,
  },
  message: {
    textAlign: 'justify',
  },
  [`${COLOR_DARKER_GREY}`]: {
    backgroundColor: "#CECECE",
  },
  [`${COLOR_BLUE}`]: {
    backgroundColor: "#03BAFC",
  },
  [`${COLOR_GREEN}`]: {
    backgroundColor: "#32C832",
  },
  [`${COLOR_GREY}`]: {
    backgroundColor: "#DEDEDE",
  },
  [`${COLOR_ORANGE}`]: {
    backgroundColor: "#FCBA03",
  },
});

export default MessageBubble;