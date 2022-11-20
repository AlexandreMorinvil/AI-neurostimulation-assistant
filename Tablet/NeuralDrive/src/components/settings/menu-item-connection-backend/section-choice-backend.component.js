import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";
import ButtonBackendType from "./button-backend-type.component";

const SECTION_TITLE = "Backend Type :";
const INSTRUCTIONS =
  `Details... TODO.`;

const BUTTON_RADIUS = 50;

const SectionChoiceBackend = ({ setParentIsLocalBackendTypeSelected }) => {

  /**
   * States
   */
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);
  const [stateIsLocalBackendTypeSelected, setStateIsLocalBackendTypeSelected] = useState(true);

  /**
   * Functions
   */
  setParentIsLocalBackendTypeSelected = setParentIsLocalBackendTypeSelected ? setParentIsLocalBackendTypeSelected : () => { };

  const setBackendTypeToLocal = () => {
    setStateIsLocalBackendTypeSelected(true);
  }

  const setBackendTypeToExternal = () => {
    setStateIsLocalBackendTypeSelected(false);
  }

  /**
   * Effects
   */
  useEffect(() => {
    setParentIsLocalBackendTypeSelected(stateIsLocalBackendTypeSelected);
  }, [stateIsLocalBackendTypeSelected]);

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