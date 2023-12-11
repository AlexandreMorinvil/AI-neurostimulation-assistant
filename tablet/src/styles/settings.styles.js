import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "./colorStyles";

export const settingsStyles = StyleSheet.create({
  sectionContent: {
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 30,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: COLOR_BACKGROUND.TextInput,
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
  },
  sectionSpacing: {
    marginBottom: 20,
    backgroundColor: "blue"
  },
  sectionTitleArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
});