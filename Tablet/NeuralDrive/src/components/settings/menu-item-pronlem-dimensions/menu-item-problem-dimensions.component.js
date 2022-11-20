import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import SectionProblemSize from "./section-problem-dimensions.component";
import * as patientService from "../../../services/patient.service";

const CONFIRM_BUTTON_TEXT = "Confirm";

const SettingsMenuItemProblemDimensions = () => {

  /**
   * States
   */
  const [stateInputPatientId, setStateInputPatientId] = useState(patientService.getPatientId());
  const [stateIsPatientIdValid, setStateIsPatientIdValid] = useState(false);
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.SET);
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
  }

  const updateIsConfirmButtonActive = () => {
    setStateIsConfirmButtonActive(true);
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
      title="Problem Dimensions"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionProblemSize
        style={settingsStyles.sectionSpacing}
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

export default SettingsMenuItemProblemDimensions;