import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import SectionProblemSize from "./section-problem-dimensions.component";

import * as problemDimensionService from "../../../services/problem-dimension.service";

const CONFIRM_BUTTON_TEXT = "Confirm";
const HEADER_SUMMARY_TEXT = (dimension) => `Dimension ${dimension}`;

const SettingsMenuItemProblemDimensions = () => {

  /**
   * States
   */
  const [stateSelectedDimension, setStateSelectedDimension] = useState(problemDimensionService.getProblemDimension());
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus] = useState(SettingsStatus.SET);
  const [stateIsConfirmButtonActive, setStateIsConfirmButtonActive] = useState(false);

  /**
   * Functions
   */
  
  const updateSettingStatus = () => {
    setStateHeaderSummary(HEADER_SUMMARY_TEXT(stateSelectedDimension));
  }
  
  const updateIsConfirmButtonActive = () => {
    setStateIsConfirmButtonActive(true);
  }
  
  const setDimension = () => {
    problemDimensionService.setProblemDimension(stateSelectedDimension);
    updateSettingStatus();
    updateIsConfirmButtonActive();
  }

  /**
   * Effects
   */
  useEffect(() => {
    updateIsConfirmButtonActive();
  }, []);

  useEffect(() => {
    updateSettingStatus();
    updateIsConfirmButtonActive();
  }, []);

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
        setParentStateSelectedDimensionFunction={setStateSelectedDimension}
      />
      <View style={styles.spacing}>
        <ConfirmButton
          isActive={stateIsConfirmButtonActive}
          text={CONFIRM_BUTTON_TEXT}
          handleButtonPressedParentFunction={setDimension}
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