import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import PanelItem from '../../panel-item.component';

import { mainStyles } from '../../../../styles/main.styles';
import * as problemDimensionService from "../../../../services/problem-dimension.service";
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
  const [stateSelectedParametersValueList, setStateSelectedParametersValueList] = useState(problemDimensionService.getDefaultValues());
  const [stateSuggestedParametersValueList, setStateSuggestedParametersValueList] = useState(problemDimensionService.getDefaultValues());
  const [statePreviousParametersValueList, setStatePreviousParametersValueList] = useState(problemDimensionService.getDefaultValues());

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
    setStateSelectedParametersValueList(currentParameterValuesList);
  }

  const setAllParameterValuesToSuggestedValues = (index, value) => {
    setStateSelectedParametersValueList(stateSuggestedParametersValueList.slice());
  }

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
          stateSelectedParametersValueList.map((_, index) => {
            return (
              <InputQueryParameter
                style={styles.parameterSectionSpacing}
                parameterName={'Parameter #' + (index + 1)}
                value={stateSelectedParametersValueList[index]}
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