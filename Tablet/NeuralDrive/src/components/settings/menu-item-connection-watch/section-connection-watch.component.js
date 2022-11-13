import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";


import * as connectionBackendService from "../../../services/connection-backend.service";
import * as connectionWatchService from "../../../services/connection-watch.service";
import * as networkService from "../../../services/network.service";

const sectionTitle = "Connection Smart Watch :"
const HELP_INFORMATION =
  `Details... TODO.`

const MESSAGE_BACKEND_NOT_CONNECTED = "Smart watch cannot be connected if the backend is not connected.";
const MESSAGE_NO_WIFI = "Smart watch cannot be connected if the tablet is not connected to a wifi network.";
const MESSAGE_CONNECTED = (ipAddress) => `${ipAddress}\nConnected`;

const SectionConnectionWatch = () => {

  /**
   * States
   */
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);
  const [stateInstructionMessageType, setStateInstructionMessageType] = useState(SettingsMessageType.NEUTRAL);
  const [stateWatchIpToPutMessage, setStateWatchIpToPutMessage] = useState("");

  /**
   * Functions
   */
  const updateWatchIpToPutDisplay = () => {
    // Handle the lack of backend connection
    if (!connectionBackendService.getIsConnectedStatus()) {
      setStateInstructionMessageType(SettingsMessageType.DISABLED);
      setStateWatchIpToPutMessage(MESSAGE_BACKEND_NOT_CONNECTED);
    }

    // Handle the lack of wifi connection
    else if (!networkService.getIsConnectedStatus()) {
      setStateInstructionMessageType(SettingsMessageType.DISABLED);
      setStateWatchIpToPutMessage(MESSAGE_NO_WIFI);
    }

    // Connection to the smart watch
    else {
      const ipAddressToPutInSmartWatch = connectionWatchService.ipAddressToPutInSmartWatch();
      
      // Handle lack of connection to the smart watch
      if (!connectionWatchService.getIsConnectedStatus()) {
        setStateInstructionMessageType(SettingsMessageType.NEUTRAL);
        setStateWatchIpToPutMessage(connectionWatchService.ipAddressToPutInSmartWatch());
      }
      
      // Handle successful connection to the smart watch
      else {
        setStateInstructionMessageType(SettingsMessageType.CLEARED);
        setStateWatchIpToPutMessage(ipAddressToPutInSmartWatch);
      }
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setStateInstructionMessageType(SettingsMessageType.DISABLED);
    updateWatchIpToPutDisplay();
  }, [
    networkService.isConnected,
    connectionBackendService.isConnected,
    connectionBackendService.isInLocalhostMode
  ]);

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={styles.titleArea}>
        <InformationButton setParentIsActiveFunction={setStateIsHelpInformationDisplayed} />
        <Text style={styles.title}> {sectionTitle} </Text>
      </View>
      {
        stateIsHelpInformationDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={HELP_INFORMATION}
        />
      }
      <MessageBubble
        type={stateInstructionMessageType}
        message={stateWatchIpToPutMessage}
      />
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

export default SectionConnectionWatch;