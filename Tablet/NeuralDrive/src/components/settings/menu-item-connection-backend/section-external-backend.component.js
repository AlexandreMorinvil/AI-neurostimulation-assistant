import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import InformationButton from "../information-button.component";
import InputIpAddress from "./input-ip-address.component";
import MessageBubble from "../message-bubble.component";

const SECTION_TITLE = "External Backend :";
const SECTION_DETAILS = "Insert the IP address indicated by the NeuralDrive desktop application."
const INSTRUCTIONS =
  `Details... TODO.`;

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

  const [stateIsInstructionsDisplayed, setStateIsInstructionsDisplayed] = useState(true);

  /**
   * Functions
   */
  setParentInputIpAddressFunction = setParentInputIpAddressFunction ? setParentInputIpAddressFunction : () => { };
  setParentIsInputIpAddressValidFunction = setParentIsInputIpAddressValidFunction ? setParentIsInputIpAddressValidFunction : () => { };

  /**
   * Effects
   */
  useEffect(() => {
    setParentInputIpAddressFunction(stateInputIpAddress);
    setParentIsInputIpAddressValidFunction(statIsInputIpAddressValid);
  }, [stateInputIpAddress, statIsInputIpAddressValid]);

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={settingsStyles.sectionTitleArea}>
        <InformationButton setParentIsActiveFunction={setStateIsInstructionsDisplayed} />
        <Text style={settingsStyles.sectionTitle}> {SECTION_TITLE} </Text>
      </View>
      <Text>
        {SECTION_DETAILS}
      </Text>
      {
        stateIsInstructionsDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={INSTRUCTIONS}
        />
      }
      <InputIpAddress
        setParentInputIpAddressFunction={setStateInputIpAddress}
        setParentIsInputIpAddressValidFunction={setStatIsInputIpAddressValid}
      />
      <MessageBubble
        style={styles.spacing}
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
  spacing: {
    marginTop: 20,
  }
});

export default SectionExternalBackend;