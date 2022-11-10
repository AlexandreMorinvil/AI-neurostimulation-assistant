import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import InputPatientId from "./input-patient-id.component";
import * as patientService from "../../../services/patient.service";

const CONFIRM_BUTTON_TEXT = "Set Patient ID";
const NO_PATIENT_HEADER_SUMMARY = "No Patient";

const SettingsMenuItemPatient = () => {

  /**
   * States
   */
  const [stateInputPatientId, setStateInputPatientId] = useState(patientService.getPatientId());
  const [stateIsPatientIdValid, setStateIsPatientIdValid] = useState(false);
  const [stateHeaderSummary, setstateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);
  const [stateIsConfirmButtonActive, setStateIsConfirmButtonActive] = useState(false);

  /**
   * Functions
   */
  const getHeaderSummary = () => {
    const storedPatientId = patientService.getPatientId();
    const headerSummary = storedPatientId === "" ? NO_PATIENT_HEADER_SUMMARY : storedPatientId;
    setstateHeaderSummary(headerSummary);
  }

  const setPatientId = () => {
    patientService.setPatientId(stateInputPatientId);
    getHeaderSummary();
    updateIsConfirmButtonActive();
  }

  const updateSettingStatus = () => {
    if (!patientService.hasPatientId())
      setStateSettingStatus(SettingsStatus.UNSET);
    
    else
      setStateSettingStatus(SettingsStatus.SET);
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
    getHeaderSummary();
    updateSettingStatus();
  }, [patientService.patientId]);

  useEffect(() => {
    updateIsConfirmButtonActive();
  }, [stateInputPatientId]);

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Patient Details"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <InputPatientId
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