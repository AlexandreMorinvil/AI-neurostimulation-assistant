import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const SECTION_TITLE = "Local Backend :";
const INSTRUCTIONS =
  `Details... TODO.`;

const STATUS_NOT_CONNECTED = "Not connected";

const SectionLocalBackend = () => {

  /**
   * States
   */
  const [stateIsInstructionsDisplayed, setStateIsInstructionsDisplayed] = useState(true);

  /**
   * Functions
   */

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={settingsStyles.sectionTitleArea}>
        <InformationButton setParentIsActiveFunction={setStateIsInstructionsDisplayed} />
        <Text style={settingsStyles.sectionTitle}> {SECTION_TITLE} </Text>
      </View>
      {
        stateIsInstructionsDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={INSTRUCTIONS}
        />
      }
        <MessageBubble
          type={SettingsMessageType.NEUTRAL}
          message={STATUS_NOT_CONNECTED}
        />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
});

export default SectionLocalBackend;