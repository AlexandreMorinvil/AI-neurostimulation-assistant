import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import PanelItem from '../../panel-item.component';

import { mainStyles } from '../../../../styles/main.styles';
import * as problemDimensionTypeService from "../../../../services/problem-dimension-type.service";
import * as queryService from "../../../../services/query.service";
import * as tremorPointService from "../../../../services/tremor-point.service";

const ITEM_TITLE = "Input Parameters";

const BUTTON_TEXT_QUERY = "PERFORM QUERY";
const BUTTON_TEXT_RESET = "RESET TO RECOMMENDED";

const PanelItemParameters = () => {

  /**
   * States
   */
  const [stateIsQuerying, setStateIsQuerying] = useState(false);
  const [stateParameters, setStateParameters] = useState(problemDimensionTypeService.getProblemDimensionType());
  const [stateSelectedParametersValueList, setStateSelectedParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [stateSuggestedParametersValueList, setStateSuggestedParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [statePreviousParametersValueList, setStatePreviousParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());

  console.log(stateSelectedParametersValueList);

  /**
   * Functions
   */
  const performQuery = async () => {
    setStateIsQuerying(true);
    await queryService.postExecuteQuery(
      stateSelectedParametersValueList,
      tremorPointService.getAveragedTremorMetric()
    );
    setStateSuggestedParametersValueList(queryService.getCurrentSuggestedParametersList());
    setStatePreviousParametersValueList(queryService.getLastQueryParametersList());
    setStateIsQuerying(false);
  }

  const setParameterValue = (index, value) => {
    const currentParameterValuesList = stateSelectedParametersValueList.slice();
    currentParameterValuesList[index] = value;
    // setStateSelectedParametersValueList(currentParameterValuesList);
  }

  const setAllParameterValuesToSuggestedValues = () => {
    // setStateSelectedParametersValueList(stateSuggestedParametersValueList.slice());
  }

  const changeParametersUsed = () => {
    setStateParameters(problemDimensionTypeService.getProblemDimensionType());
    setStateSelectedParametersValueList(problemDimensionTypeService.getDefaultValuesList());
  }

  /**
   * Effects
   */
  useEffect(() => {
    // Initialization
    changeParametersUsed();

    // Reactive subcribtion
    const subscription = problemDimensionTypeService.subject.subscribe({
      next: changeParametersUsed
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <View style={mainStyles.sectionContent}>
        {
          stateSelectedParametersValueList.map((parameter, index) => {
            return (
              <InputQueryParameter
                key={index}
                style={styles.parameterSectionSpacing}
                parameterName={'Parameter #' + (index + 1)}
                // value={stateSelectedParametersValueList[index]}
                previousValue={statePreviousParametersValueList[index]}
                setParentValueFunction={(value) => setParameterValue(index, value)}
                suggestedValue={stateSuggestedParametersValueList[index]}
              />
            );
          })
        }
        <Button
          icon="sync"
          mode="elevated"
          dark={false}
          loading={false}
          onPress={setAllParameterValuesToSuggestedValues}
          uppercase={true}
        >
          <Text
            variant="labelLarge"
            adjustsFontSizeToFit={true}
          >
            {BUTTON_TEXT_RESET}
          </Text>
        </Button>
      </View>

      <View style={mainStyles.sectionContent}>
        <Button
          icon="tab-search"
          mode="elevated"
          dark={false}
          loading={stateIsQuerying}
          onPress={performQuery}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            {BUTTON_TEXT_QUERY}
          </Text>
        </Button>
      </View>

    </ PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  parameterSectionSpacing: {
    marginBottom: 10,
  },
  buttonArea: {
    backgroundColor: "green",
  }
});

export default PanelItemParameters;