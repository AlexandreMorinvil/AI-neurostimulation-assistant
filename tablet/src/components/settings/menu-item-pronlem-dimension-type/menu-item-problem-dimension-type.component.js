import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { boxContentStyles } from "../../../styles/boxContentStyles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../../utils/container/SettingsAccordionBoxContainer";
import ConfirmButton from "../confirm-button.component";
import SectionProblemDimensionType from "./section-problem-dimension-type.component";

import * as problemDimensionTypeService from "../../../services/problem-dimension-type.service";

const CONFIRM_BUTTON_TEXT = "Confirm";
const HEADER_SUMMARY_TEXT = (dimension) => `Dimensions ${dimension}`;

const SettingsMenuItemProblemDimensionType = () => {

  /**
   * States
   */
  const [stateSelectedProblemDimensionType, setStateSelectedProblemDimensionType] = useState(problemDimensionTypeService.getProblemDimensionType());
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus] = useState(SettingsStatus.SET);
  const [stateIsConfirmButtonActive, setStateIsConfirmButtonActive] = useState(false);

  /**
   * Functions
   */
  const updateSettingStatus = () => {
    const problemDimensionsList = problemDimensionTypeService.getProblemDimensionsList();
    setStateHeaderSummary(HEADER_SUMMARY_TEXT(problemDimensionsList));
  }
  
  const updateIsConfirmButtonActive = () => {
    setStateIsConfirmButtonActive(true);
  }
  
  const setProblemDimensionType = () => {
    problemDimensionTypeService.setProblemDimensionType(stateSelectedProblemDimensionType);
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
      <SectionProblemDimensionType
        style={boxContentStyles.sectionSpacing}
        setParentStateSelectedDimensionTypeFunction={setStateSelectedProblemDimensionType}
      />
      <View style={styles.spacing}>
        <ConfirmButton
          isActive={stateIsConfirmButtonActive}
          text={CONFIRM_BUTTON_TEXT}
          handleButtonPressedParentFunction={setProblemDimensionType}
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

export default SettingsMenuItemProblemDimensionType;