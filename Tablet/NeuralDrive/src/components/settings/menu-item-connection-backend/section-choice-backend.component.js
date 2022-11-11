import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsMessageType } from '../../../const/settings';
import * as backendChoice from "../../../services/backend-choice.service";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

import ButtonBackendType from "./button-backend-type.component";


const SECTION_TITLE = "Backend Type :";
const INSTRUCTIONS =
  `Details... TODO.`;

const BUTTON_RADIUS = 50;

const SectionChoiceBackend = () => {

  /**
   * States
   */
  const [stateIsInstructionsDisplayed, setStateIsInstructionsDisplayed] = useState(true);
  const [stateIsLocalBackendTypeSelected, setStateIsLocalBackendTypeSelected] = useState(true);

  /**
   * Functions
   */
  const setBackendTypeToLocal = () => {
    setStateIsLocalBackendTypeSelected(true);
  }

  const setBackendTypeToExternal = () => {
    setStateIsLocalBackendTypeSelected(false);
  }

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
      <View style={styles.buttonArea}>
        <ButtonBackendType
          style={[styles.button, styles.leftButton]}
          onPress={setBackendTypeToLocal}
          isActive={stateIsLocalBackendTypeSelected}
          isLocalBackendButton={true}
        />
        <ButtonBackendType
          style={[styles.button, styles.rightButton]}
          onPress={setBackendTypeToExternal}
          isActive={!stateIsLocalBackendTypeSelected}
          isLocalBackendButton={false}
        />
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  buttonArea: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    maxWidth: 350,
    margin: 2.5,
  },
  leftButton: {
    borderTopLeftRadius: BUTTON_RADIUS,
    borderBottomLeftRadius: BUTTON_RADIUS,
  },
  rightButton: {
    borderTopRightRadius: BUTTON_RADIUS,
    borderBottomRightRadius: BUTTON_RADIUS,
  }
});

export default SectionChoiceBackend;