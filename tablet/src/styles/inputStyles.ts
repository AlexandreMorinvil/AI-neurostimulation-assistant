import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "./colorStyles";

export const inputStyles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    borderColor: COLOR_BACKGROUND.TextInput,
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
  },
});