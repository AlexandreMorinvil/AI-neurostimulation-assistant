import { StyleSheet } from "react-native";
import { COLOR_TEXT } from "./colorStyles";

export const textStyles = StyleSheet.create({
  default: {
    color: COLOR_TEXT.default,
  },
  boxText: {
    color: COLOR_TEXT.default,
  },
  buttonText: {
    color: COLOR_TEXT.button,
  },
  cellText: {
    color: COLOR_TEXT.default,
    fontSize: 12,
  },
  inputText: {
    color: COLOR_TEXT.default,
  }
});