import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import * as patientService from "../../../services/patient.service";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

const sectionTitle = "Patient ID :"
const HELP_INFORMATION =
  `The patient ID is an unique identifier assigned to each patient to be able to distinguish each patient while preserving the anonymity of each patient.\n\n\
The patient ID can be a random sequence of characters that respects these specifications :\n\n\
Containing only numbers and/or letters;\n\
Containing a minimum of ${patientService.MIN_CHARACTERS_COUNT} characters;\n\
Containing a maximum of ${patientService.MAX_CHARACTERS_COUNT} characters`

const SectionInputPatientId = ({ setParentIsValidPatientIdFunction, setParentInputPatientId }) => {

  /**
   * States
   */
  const [stateIsIdValid, setStateIsIdValid] = useState(true);
  const [stateInvalidPatientIdReason, setInvalidPatientIdReason] = useState("");
  const [statePatientId, setStatePatientId] = useState(patientService.getPatientId());

  const [stateInputIsInFocus, setStateInputIsInFocus] = useState(false);
  const [stateShouldDisplayInvalidityReason, setStateShouldDisplayInvalidityReason] = useState(true);
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);

  /**
   * Functions
   */
  setParentIsValidPatientIdFunction = setParentIsValidPatientIdFunction ? setParentIsValidPatientIdFunction : () => { };
  setParentInputPatientId = setParentInputPatientId ? setParentInputPatientId : () => { };

  const indicateIsInFocus = () => {
    setStateInputIsInFocus(true);
  }

  const updateToIsNotInFocus = () => {
    setStateInputIsInFocus(false);
    validateId();
  }

  const updateInputPatientId = (newPatientId) => {
    setStatePatientId(newPatientId);
    setParentInputPatientId(newPatientId);
    validateId();
  }

  const validateId = () => {
    const { isValid, reason } = patientService.validatePatientId(statePatientId);
    setStateIsIdValid(isValid);
    setParentIsValidPatientIdFunction(isValid);
    setInvalidPatientIdReason(reason);
  }

  /**
   * Effects
   */
  // Verify if we should display the invalidity message.
  useEffect(() => {
    if (stateIsIdValid)
      setStateShouldDisplayInvalidityReason(false);

    else if (stateInputIsInFocus)
      setStateShouldDisplayInvalidityReason(false);

    else if (statePatientId.length == 0)
      setStateShouldDisplayInvalidityReason(false);

    else
      setStateShouldDisplayInvalidityReason(true);
  }, [stateIsIdValid, statePatientId, stateInputIsInFocus]);

  useEffect(() => {
    validateId();
  }, [statePatientId]);

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={settingsStyles.sectionTitleArea}>
        <InformationButton setParentIsActiveFunction={setStateIsHelpInformationDisplayed} />
        <Text style={[textStyles.default, settingsStyles.sectionTitle]}> {sectionTitle} </Text>
      </View>
      {
        stateIsHelpInformationDisplayed &&
        <MessageBubble
          type={SettingsMessageType.INFORMATION}
          message={HELP_INFORMATION}
        />
      }
      {
        stateShouldDisplayInvalidityReason &&
        <MessageBubble
          type={SettingsMessageType.WARNING}
          message={stateInvalidPatientIdReason}
        />
      }

      <TextInput
        style={[textStyles.default, settingsStyles.textInput]}
        onEndEditing={updateToIsNotInFocus}
        onFocus={indicateIsInFocus}
        value={statePatientId}
        onChangeText={updateInputPatientId}
        placeholder="Insert a patient ID"
        keyboardType="default"
      />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
});

export default SectionInputPatientId;