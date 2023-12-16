import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/textStyles";

import ButtonProblemDimension from "./button-problem-dimension.component";
import InformationButton from "../information-button.component";
import MessageBubble from "../../message-bubble.component";

import * as problemDimensionTypeService from "../../../services/problem-dimension-type.service";

const SECTION_TITLE = "Dimensions :"
const HELP_INFORMATION =
  `This section enables the user to select the dimension of the problem. These dimensions are used for the parameters that the user will input in the main page.\n\
  Said parameters will not be able to go over the given dimensions, and the graphs in the main page will have the size of the set dimension.`;

const POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST = problemDimensionTypeService.getPossibleProblemDimensionTypesList();

const BUTTON_RADIUS = 15;
const SectionInputPatientId = ({ setParentStateSelectedDimensionTypeFunction }) => {

  /**
   * States
   */
  const [stateSelectedProblemDimensionType, setStateSelectedDimensionType] = useState(problemDimensionTypeService.getProblemDimensionType());
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);

  /**
   * Functions
   */
  setParentStateSelectedDimensionTypeFunction = setParentStateSelectedDimensionTypeFunction || (() => { });

  const isFirstButton = (index) => {
    return index === 0;
  }

  const isLastButton = (index) => {
    return index === POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST.length - 1;
  }

  const isSelectedOption = (problemDimensionType) => {
    return stateSelectedProblemDimensionType.isSame(problemDimensionType);
  }

  // const setSelectedDimension = (dimension) => {
  const setSelectedProblemDimensionType = (problemDimensionType) => {
    setStateSelectedDimensionType(problemDimensionType);
    setParentStateSelectedDimensionTypeFunction(problemDimensionType);
  }

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
      <View style={styles.buttonArea}>
        {
          POSSIBLE_PROBLEM_DIMENSION_TYPES_LIST.map((problemDimensionType, index) => {
            return <ButtonProblemDimension
              key={index}
              style={
                [
                  styles.button,
                  isFirstButton(index) && styles.leftMostButton,
                  isLastButton(index) && styles.rightMostButton
                ]
              }
              problemDimensionType={problemDimensionType}
              isActive={isSelectedOption(problemDimensionType)}
              setParentStateSelectedProblemDimensionTypeFunction={setSelectedProblemDimensionType}
            />
          })
        }
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
    maxWidth: 150,
    margin: 2.5,
  },
  leftMostButton: {
    borderTopLeftRadius: BUTTON_RADIUS,
    borderBottomLeftRadius: BUTTON_RADIUS,
  },
  rightMostButton: {
    borderTopRightRadius: BUTTON_RADIUS,
    borderBottomRightRadius: BUTTON_RADIUS,
  }
});

export default SectionInputPatientId;