import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/text.styles";

import ButtonProblemDimension from "./button-problem-dimension.component";
import InformationButton from "../information-button.component";
import MessageBubble from "../message-bubble.component";

import * as problemDimensionService from "../../../services/problem-dimension.service";

const SECTION_TITLE = "Dimensions :"
const HELP_INFORMATION =
  `Details... TODO.`;

const POSSIBLE_DIMENSIONS_LIST = problemDimensionService.POSSIBLE_DIMENSIONS_LIST;

const BUTTON_RADIUS = 15;

const SectionInputPatientId = ({ setParentStateSelectedDimensionFunction }) => {

  /**
   * States
   */
  const [stateSelectedDimension, setStateSelectedDimension] = useState(problemDimensionService.getProblemDimension());
  const [stateIsHelpInformationDisplayed, setStateIsHelpInformationDisplayed] = useState(true);

  /**
   * Functions
   */
  setParentStateSelectedDimensionFunction = setParentStateSelectedDimensionFunction ? setParentStateSelectedDimensionFunction : () => { };

  const isFirstButton = (index) => {
    return index === 0;
  }

  const isLastButton = (index) => {
    return index === POSSIBLE_DIMENSIONS_LIST.length - 1;
  }

  const isSelectedOption = (index) => {
    return POSSIBLE_DIMENSIONS_LIST[index] === stateSelectedDimension;
  }

  const setSelectedDimension = (dimension) => {
    setStateSelectedDimension(dimension);
    setParentStateSelectedDimensionFunction(dimension);
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
          POSSIBLE_DIMENSIONS_LIST.map((dimension, index) => {
            return <ButtonProblemDimension
              key={index}
              style={
                [
                  styles.button,
                  isFirstButton(index) && styles.leftMostButton,
                  isLastButton(index) && styles.rightMostButton
                ]
              }
              dimension={dimension}
              isActive={isSelectedOption(index)}
              setParentStateSelectedDimensionFunction={setSelectedDimension}
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