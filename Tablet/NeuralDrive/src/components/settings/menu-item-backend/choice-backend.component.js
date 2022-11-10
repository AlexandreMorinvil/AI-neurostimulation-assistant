import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import * as backendChoice from "../../../services/backend-choice.service";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const sectionTitle = "Connection topology :"
const instructions =
  `Details... TODO.`

const ChoiceBackend = () => {

  /**
   * States
   */
  const [isInstructionsDisplayed, setIsInstructionsDisplayed] = useState(true);

  /**
   * Functions
   */

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={styles.titleArea}>
        <InformationButton setParentIsActiveFunction={setIsInstructionsDisplayed} />
        <Text style={styles.title}> {sectionTitle} </Text>
      </View>
      {
        isInstructionsDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={instructions}
        />
      }
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  titleArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
  },
});

export default ChoiceBackend;