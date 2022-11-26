import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import PanelItem from '../../panel-item.component';

import * as Structures from "../../../Structures";
import * as httpRequestService from "../../../../services/http-request.service";

const ITEM_TITLE = "Input Parameters";

const PanelItemParameters = () => {

  const [valueP1, setP1] = React.useState(0);
  const [valueP2, setP2] = React.useState(0);
  const [valueY, setY] = React.useState(0);

  const [oldAlgorithmA, setOldAlgorithmA] = React.useState(0);
  const [currentDisplayA, setCurrentDisplayA] = React.useState(0);
  const [currentRecommendationA, setCurrentRecommendationA] = React.useState(0);

  /**
   * Functions
   */
  const performQuery = async () => {
    const response = await httpRequestService.postExecuteQuery(valueP1, valueP2, valueY);

    ref.current.state.data = response.heatMapBase64JpegImage;
    ref.current.draw_heat_map();

    newPosition = response.position;
    // setPredictedP1(newPosition[Number(response.nextQuery)][0]);
    // setOldAlgorithmA(currentDisplayA.toString());
    // setCurrentDisplayA(newPosition[Number(response.nextQuery)][0].toString());
    // setCurrentRecommendationA(newPosition[Number(response.nextQuery)][0].toString());
  }

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      {

      }
      <InputQueryParameter
        flexInput={0.35}
        dimension={'Amplitude (V)'}
        value={currentDisplayA}
        setFunction={text => {
          setP1(text)
          setCurrentDisplayA(text);
        }}
        oldAlgorithmValue={oldAlgorithmA}
        boxFunction={text => { setCurrentDisplayA(oldAlgorithmA.toString()); }}
      />

      <Structures.FlexContainer flex={0.2} jc="space-around" bgColor="00000000">
        <Button
          icon="sync"
          mode="elevated"
          buttonColor={'#CC958F'}
          dark={false}
          loading={false}
          onPress={() => {
            setCurrentDisplayA(currentRecommendationA.toString());
            setCurrentDisplayB(currentRecommendationB.toString());
          }}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            reset
          </Text>
        </Button>
        <Button
          icon="tab-search"
          mode="elevated"
          buttonColor={'#CC958F'}
          dark={false}
          loading={false}
          onPress={performQuery}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            query
          </Text>
        </Button>
      </Structures.FlexContainer>
    </ PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  inputSurface: {
    margin: 10,
    padding: 8,
    height: 800,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
});

export default PanelItemParameters;