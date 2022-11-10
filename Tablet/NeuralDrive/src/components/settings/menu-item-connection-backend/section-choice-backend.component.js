import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import * as backendChoice from "../../../services/backend-choice.service";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const sectionTitle = "Backend Type :"
const instructions =
  `Details... TODO.`

const SectionChoiceBackend = () => {

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
      <View style={settingsStyles.sectionTitleArea}>
        <InformationButton setParentIsActiveFunction={setIsInstructionsDisplayed} />
        <Text style={settingsStyles.sectionTitle}> {sectionTitle} </Text>
      </View>
      {
        isInstructionsDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={instructions}
        />
      }
      <View>

      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({

});

export default SectionChoiceBackend;