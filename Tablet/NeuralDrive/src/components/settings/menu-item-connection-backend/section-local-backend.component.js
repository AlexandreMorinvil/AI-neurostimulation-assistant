import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import InformationButton from "../information-button.component";
import MessageBubble from "../../message-bubble.component";

import * as connectionBackendService from "../../../services/connection-backend.service";

const SECTION_TITLE = "Local Backend :";
const HELP_INFORMATION =
  `When using the local backend connection type, all that is needed for the user to do is click on the connect button in order to connect to the server.`;

const STATUS_CONNECTED = "Connected";
const STATUS_NOT_CONNECTED = "Not connected";

const SectionLocalBackend = () => {

  /**
   * States
   */
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);
  const [stateIsConnected, setStateIsConnected] = useState(false);

  /**
   * Functions
   */
  const updateConnectionStatus = () => {
    if (connectionBackendService.getIsInLocalhostMode())
      setStateIsConnected(connectionBackendService.getIsConnectedStatus());
    else
      setStateIsConnected(false);
  }

  /**
   * Effects
   */
  useEffect(() => {
    // Initialization
    updateConnectionStatus();

    // Reactive subcribtion
    const subscription = connectionBackendService.subject.subscribe({
      next: updateConnectionStatus
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

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
        type={stateIsConnected ? SettingsMessageType.CLEARED : SettingsMessageType.NEUTRAL}
        message={stateIsConnected ? STATUS_CONNECTED : STATUS_NOT_CONNECTED}
      />
    </View>
  );
};

export default SectionLocalBackend;