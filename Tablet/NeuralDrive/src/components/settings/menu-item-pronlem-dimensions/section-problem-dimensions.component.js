import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import * as patientService from "../../../services/patient.service";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const SECTION_TITLE = "Problem Size :"
const HELP_INFORMATION =
  `Details... TODO.`

const SectionInputPatientId = ({ setParentIsValidPatientIdFunction }) => {

  /**
   * States
   */
  const [stateIsIdValid, setStateIsIdValid] = useState(true);
  const [statePatientId, setStatePatientId] = useState(patientService.getPatientId());

  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);

  /**
   * Functions
   */
  setParentIsValidPatientIdFunction = setParentIsValidPatientIdFunction ? setParentIsValidPatientIdFunction : () => { };

  /**
   * Effects
   */

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

      <Text> {"Content of the section"} </Text>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
});

export default SectionInputPatientId;