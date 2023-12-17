// TODO: Delete this file.

import { StyleSheet } from "react-native";
import { COLOR_BACKGROUND } from "./colorStyles";

export const boxContentStyles = StyleSheet.create({
  sectionContent: {
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 30,
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