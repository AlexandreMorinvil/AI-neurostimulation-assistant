import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import OutputDisplayTremorMetric from "./output-display-tremor-metric.component";
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
  const [statIsFirstQurey, setStatIsFirstQuery] = useState(!queryService.hasDoneQueryPreviously())
  const [stateParametersList, setStateParametersList] = useState(problemDimensionTypeService.getParametersList());
  const [stateSelectedParametersValueList, setStateSelectedParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [stateSuggestedParametersValueList, setStateSuggestedParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());
  const [statePreviousParametersValueList, setStatePreviousParametersValueList] = useState(problemDimensionTypeService.getDefaultValuesList());

  /**
   * Functions
   */
  const changeParametersUsed = () => {
    setStateParametersList(problemDimensionTypeService.getParametersList());
    setStateSelectedParametersValueList(problemDimensionTypeService.getDefaultValuesList());
    setStateSuggestedParametersValueList(problemDimensionTypeService.getDefaultValuesList());
    setStatePreviousParametersValueList(problemDimensionTypeService.getDefaultValuesList());
  }

  const performQuery = async () => {
    console.log("Got here");
    setStateIsQuerying(true);
    await queryService.performQuery(
      stateSelectedParametersValueList,
      tremorPointService.getAveragedTremorMetric()
    );
    setStateSuggestedParametersValueList(queryService.getCurrentSuggestedParametersList());
    setStatePreviousParametersValueList(queryService.getLastQueryParametersList());
    updateStatus();
    setStateIsQuerying(false);
  }

  const setParameterValue = (index, value) => {
    const currentParameterValuesList = stateSelectedParametersValueList.slice();
    currentParameterValuesList[index] = value;
    setStateSelectedParametersValueList(currentParameterValuesList);
  }

  const setAllParameterValuesToSuggestedValues = () => {
    setStateSelectedParametersValueList(stateSuggestedParametersValueList.slice());
  }

  const updateStatus = () => {
    setStatIsFirstQuery(!queryService.hasDoneQueryPreviously());
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
      <View style={[
        mainStyles.sectionContent,
        styles.interSectionSpacing
      ]}>
        {
          stateParametersList.map((parameter, index) => {
            return (
              <InputQueryParameter
                key={index}
                style={styles.interSubSectionSpacing}
                isFirstInput={statIsFirstQurey}
                isDisabled={stateIsQuerying}
                parameter={parameter}
                previousValue={statePreviousParametersValueList[index]}
                suggestedValue={stateSuggestedParametersValueList[index]}
                setParentValueFunction={(value) => setParameterValue(index, value)}
                value={stateSelectedParametersValueList[index]}
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
          disabled={stateIsQuerying}
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
        <OutputDisplayTremorMetric
          style={styles.interSubSectionSpacing}
          isFrozen={stateIsQuerying}
        />
        <Button
          icon="tab-search"
          mode="elevated"
          dark={false}
          loading={stateIsQuerying}
          onPress={performQuery}
          uppercase={true}
          disabled={stateIsQuerying}
        >
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
  interSectionSpacing: {
    marginBottom: 10,
  },
  interSubSectionSpacing: {
    marginBottom: 10,
  },
  buttonArea: {
    backgroundColor: "green",
  }
});

export default PanelItemParameters;