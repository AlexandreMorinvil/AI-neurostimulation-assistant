import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import InformationButton from "../information-button.component";
import InputIpAddress from "./input-ip-address.component";
import MessageBubble from "../message-bubble.component";

import * as connectionBackendService from "../../../services/connection-backend.service";

const SECTION_TITLE = "External Backend :";
const SECTION_DETAILS = "Insert the IP address indicated by the NeuralDrive desktop application."
const HELP_INFORMATION =
  `When using the external backend connection type, the user will need to either enter the ip address of the server or use the ip address provided by the\n\
  application which will be the last ip addressed used in the application.`;

const STATUS_CONNECTED = "Connected";
const STATUS_NOT_CONNECTED = "Not connected";

const SectionExternalBackend = ({ setParentInputIpAddressFunction, setParentIsInputIpAddressValidFunction, ...props }) => {

  /**
   * Props
   */
  const { } = props;

  /**
   * States
   */
  const [stateInputIpAddress, setStateInputIpAddress] = useState("");
  const [statIsInputIpAddressValid, setStatIsInputIpAddressValid] = useState(true);
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);
  const [stateIsConnected, setStateIsConnected] = useState(false);

  /**
   * Functions
   */
  setParentInputIpAddressFunction = setParentInputIpAddressFunction ? setParentInputIpAddressFunction : () => { };
  setParentIsInputIpAddressValidFunction = setParentIsInputIpAddressValidFunction ? setParentIsInputIpAddressValidFunction : () => { };

  const updateConnectionStatus = () => {
    setStateIsConnected(false);
    if (!connectionBackendService.getIsInLocalhostMode() &&
      connectionBackendService.isIpCurrentIpAddress(stateInputIpAddress))
      setStateIsConnected(connectionBackendService.getIsConnectedStatus());
    else
      setStateIsConnected(false);
  }

  /**
   * Effects
   */
  useEffect(() => {
    updateConnectionStatus();
    setParentInputIpAddressFunction(stateInputIpAddress);
    setParentIsInputIpAddressValidFunction(statIsInputIpAddressValid);
  }, [stateInputIpAddress, statIsInputIpAddressValid]);

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
        <Text style={[textStyles.default, settingsStyles.sectionTitle]}>  {SECTION_TITLE} </Text>
      </View>
      <Text style={textStyles.default}>
        {SECTION_DETAILS}
      </Text>
      {
        stateIsHelpInformationDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={HELP_INFORMATION}
        />
      }
      <InputIpAddress
        initialIpAddress={connectionBackendService.getBackendIpAddress()}
        setParentInputIpAddressFunction={setStateInputIpAddress}
        setParentIsInputIpAddressValidFunction={setStatIsInputIpAddressValid}
      />
      <MessageBubble
        style={styles.spacing}
        type={stateIsConnected ? SettingsMessageType.CLEARED : SettingsMessageType.NEUTRAL}
        message={stateIsConnected ? STATUS_CONNECTED : STATUS_NOT_CONNECTED}
      />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginTop: 20,
  }
});

export default SectionExternalBackend;