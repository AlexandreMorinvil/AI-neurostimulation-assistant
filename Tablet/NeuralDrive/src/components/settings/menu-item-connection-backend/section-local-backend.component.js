import React, { useState } from "react";
import { Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const SECTION_TITLE = "Local Backend :";
const HELP_INFORMATION =
  `Details... TODO.`;

const STATUS_NOT_CONNECTED = "Not connected";

const SectionLocalBackend = () => {

  /**
   * States
   */
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={settingsStyles.sectionTitleArea}>
        <InformationButton setParentIsActiveFunction={setStateIsHelpInformationDisplayed} />
        <Text style={[textStyles.default, settingsStyles.sectionTitle]}> {SECTION_TITLE} </Text>
      </View>
      {
        stateIsHelpInformationDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={HELP_INFORMATION}
        />
      }
      <MessageBubble
        type={SettingsMessageType.NEUTRAL}
        message={STATUS_NOT_CONNECTED}
      />
    </View>
  );
};

export default SectionLocalBackend;