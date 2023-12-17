import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND, COLOR_BUTTON } from "./colorStyles";

const mainButtonStyles = {
  width: 250,
  padding: 5,
}

export const stylesButton = StyleSheet.create({
  highlighted: {
    ...mainButtonStyles,
    backgroundColor: COLOR_BUTTON.activeHighlighted,
  },
  important: {
    ...mainButtonStyles,
    backgroundColor: COLOR_BUTTON.important,
  },
  inactive: {
    ...mainButtonStyles,
    backgroundColor: COLOR_BUTTON.innactive,
  },
  normal: {
    ...mainButtonStyles,
    backgroundColor: 'white',
  },
});