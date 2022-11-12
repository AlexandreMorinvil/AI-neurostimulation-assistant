import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import SectionInputPatientId from "./section-input-patient-id.component";
import * as patientService from "../../../services/patient.service";

const CONFIRM_BUTTON_TEXT = "Set Patient ID";
const NO_PATIENT_HEADER_SUMMARY = "No Patient";

const SettingsMenuItemPatient = () => {

  /**
   * States
   */
  const [stateInputPatientId, setStateInputPatientId] = useState(patientService.getPatientId());
  const [stateIsPatientIdValid, setStateIsPatientIdValid] = useState(false);
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);
  const [stateIsConfirmButtonActive, setStateIsConfirmButtonActive] = useState(false);

  /**
   * Functions
   */
  const setPatientId = () => {
    patientService.setPatientId(stateInputPatientId);
    updateIsConfirmButtonActive();
  }

  const updateSettingStatus = () => {
    if (patientService.hasPatientId()) {
      const storedPatientId = patientService.getPatientId();
      setStateSettingStatus(SettingsStatus.SET);
      setStateHeaderSummary(storedPatientId);
    }

    else {
      setStateSettingStatus(SettingsStatus.UNSET);
      setStateHeaderSummary(NO_PATIENT_HEADER_SUMMARY);
    }
  }

  const updateIsConfirmButtonActive = () => {
    const isEmptyPatientId = stateInputPatientId === "";
    const isPatienIdValid = stateIsPatientIdValid;
    const isNewPatientId = stateInputPatientId !== patientService.getPatientId();
    setStateIsConfirmButtonActive(isNewPatientId && (isEmptyPatientId || isPatienIdValid));
  }

  /**
   * Effects
   */
  useEffect(() => {
    updateSettingStatus();
  }, [patientService.patientId]);

  useEffect(() => {
    updateIsConfirmButtonActive();
  }, [stateInputPatientId, stateIsPatientIdValid]);

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Patient Details"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionInputPatientId
        style={settingsStyles.sectionSpacing}
        setParentIsValidPatientIdFunction={setStateIsPatientIdValid}
        setParentInputPatientId={setStateInputPatientId}
      />
      <View style={styles.spacing}>
        <ConfirmButton
          isActive={stateIsConfirmButtonActive}
          text={CONFIRM_BUTTON_TEXT}
          handleButtonPressedParentFunction={setPatientId}
        />
      </View>
    </AccodionItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 20,
  },
});

export default SettingsMenuItemPatient;