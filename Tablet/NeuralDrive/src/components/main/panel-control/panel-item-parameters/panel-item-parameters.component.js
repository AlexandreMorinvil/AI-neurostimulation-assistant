import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import PanelItem from '../../panel-item.component';

import * as problemDimensionService from "../../../../services/problem-dimension.service";
import * as queryService from "../../../../services/query.service";
import * as tremorPointService from "../../../../services/tremor-point.service";

const ITEM_TITLE = "Input Parameters";

const BUTTON_TEXT_QUERY = "PERFORM QUERY";
const BUTTON_TEXT_RESET = "SET TO RECOMMENDED";

const PanelItemParameters = () => {

  /**
   * States
   */
  const [stateSelectedParametersValueList, setStateSelectedParametersValueList] = useState(problemDimensionService.getDefaultValues());
  const [stateSuggestedParametersValueList, setStateSuggestedParametersValueList] = useState(problemDimensionService.getDefaultValues());
  const [statePreviousParametersValueList, setStatePreviousParametersValueList] = useState(problemDimensionService.getDefaultValues());

  /**
   * Functions
   */
  const performQuery = async () => {
    await queryService.postExecuteQuery(
      stateSelectedParametersValueList,
      tremorPointService.getAveragedTremorMetric()
    );
    setStateSuggestedParametersValueList(queryService.getCurrentSuggestedParametersList());
    setStatePreviousParametersValueList(queryService.getLastQueryParametersList());
  }

  const setParameterValue = (index, value) => {
    const currentParameterValuesList = stateSelectedParametersValueList.splice();
    currentParameterValuesList[index] = value;
    setStateSelectedParametersValueList(currentParameterValuesList);
  }

  const setAllParameterValuesToSuggestedValues = (index, value) => {
    setStateSelectedParametersValueList(stateSuggestedParametersValueList.splice());
  }

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      {stateSelectedParametersValueList.map((_, index) => {
        return (
          <InputQueryParameter
            label ={'Parameter #' + (index + 1)}
            initialValue={stateSelectedParametersValueList[index]}
            previousValue={statePreviousParametersValueList[index]}
            setParentValueFunction={(index) => setParameterValue(index, value)}
          />
        );
      })

      }

      <View style={styles.buttonArea}>
        <Button
          icon="sync"
          mode="elevated"
          dark={false}
          loading={false}
          onPress={setAllParameterValuesToSuggestedValues}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            {BUTTON_TEXT_RESET}
          </Text>
        </Button>
        <Button
          icon="tab-search"
          mode="elevated"

          dark={false}
          loading={true}
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
  buttonArea: {
    backgroundColor: "green",
  }
});

export default PanelItemParameters;