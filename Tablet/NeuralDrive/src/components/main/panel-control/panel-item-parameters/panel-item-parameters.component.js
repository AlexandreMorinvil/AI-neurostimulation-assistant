import React from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Surface, Text } from 'react-native-paper';

import InputQueryParameter from "./input-query-parameter.component"
import { set_chosen_param_2D, set_heat_map_data } from '../../../../class/const';
import { post_execute_query } from '../../../../class/http';

import * as Structures from "../../../Structures";

const PanelItemParameters = () => {
  const [valueP1, setP1] = React.useState(0);
  const [valueP2, setP2] = React.useState(0);
  const [valueY, setY] = React.useState(0);

  const [predictedP1, setPredictedP1] = React.useState(0);
  const [predictedP2, setPredictedP2] = React.useState(0);
  const [predictedY, setPredictedY] = React.useState(0);

  const [selected, setSelected] = React.useState(0);
  const gaussianGraphSelectionParam = [
    { key: 0, value: 'A' },
    { key: 1, value: 'B' },
    { key: 2, value: 'C', disabled: true },
    { key: 3, value: 'D', disabled: true },
    { key: 4, value: 'E', disabled: true },
    { key: 5, value: 'F', disabled: true },
  ];

  const [oldAlgorithmA, setOldAlgorithmA] = React.useState(0);
  const [oldAlgorithmB, setOldAlgorithmB] = React.useState(0);

  const [currentDisplayA, setCurrentDisplayA] = React.useState(0);
  const [currentDisplayB, setCurrentDisplayB] = React.useState(0);

  const [currentRecommendationA, setCurrentRecommendationA] = React.useState(0);
  const [currentRecommendationB, setCurrentRecommendationB] = React.useState(0);

  /**
   * Render
   */
  return (
    <Surface style={styles.inputSurface} elevation={1}>
      {/* Inputs */}
      <Structures.FlexContainer
        flex={0.3}
        marg={'0px'}
        pad={'0px 0px 0px 8px'}
        bgColor={'#8a8a8a'}
        borderRadius={'15px'}>
        <Text variant="titleLarge"> Parameter Setup</Text>
      </Structures.FlexContainer>
      <Structures.FlexContainer
        flex={0.8}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <InputQueryParameter
          flexInput={0.35}
          dimension={'Amplitude (V)'}
          value={currentDisplayA}
          predictedValue={predictedP1}
          setFunction={text => {
            setP1(text)
            setCurrentDisplayA(text);
          }}
          unitType={'units'}
          titleSpacing={'0 5px 0 0'}
          oldAlgorithmValue={oldAlgorithmA}
          boxFunction={text => { setCurrentDisplayA(oldAlgorithmA.toString()); }}
        />
        <InputQueryParameter
          flexInput={0.35}
          setFunction={text => {
            setP2(text);
            setCurrentDisplayB(text);
          }}
          dimension={'Parameter #2'}
          value={currentDisplayB}
          predictedValue={predictedP2}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
          oldAlgorithmValue={oldAlgorithmB}
          boxFunction={text => { setCurrentDisplayB(oldAlgorithmB.toString()); }}
        />
        <InputQueryParameter
          flexInput={0.35}
          setFunction={text => {
            setY(text);
          }}
          dimension={'tremor'}
          value={valueY}
          predictedValue={predictedY}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
        />
      </Structures.FlexContainer>
      {/* Reset & Query */}
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
          onPress={async () => {
            response = await post_execute_query(valueP1, valueP2, valueY);
            ref.current.state.data = JSON.parse(response.predict_heat_map);
            newPosition = JSON.parse(response.position);
            ref.current.draw_heat_map();
            setPredictedP1(newPosition[Number(response.next_query)][0]);
            setPredictedP2(newPosition[Number(response.next_query)][1]);

            setOldAlgorithmA(currentDisplayA.toString());
            setOldAlgorithmB(currentDisplayB.toString());
            setCurrentDisplayA(newPosition[Number(response.next_query)][0].toString());
            setCurrentDisplayB(newPosition[Number(response.next_query)][1].toString());
            setCurrentRecommendationA(newPosition[Number(response.next_query)][0].toString());
            setCurrentRecommendationB(newPosition[Number(response.next_query)][1].toString());

            set_heat_map_data(JSON.parse(response.values));
          }}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            query
          </Text>
        </Button>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.2} jc="space-around" bgColor="00000000">
        <Text variant="titleMedium"> 2D Gaussian parameter</Text>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.2} jc="space-around" bgColor="00000000">
        <SelectList
          setSelected={val => setSelected(val)}
          data={gaussianGraphSelectionParam}
          save="key"
          dropdownTextStyles={{ color: "black" }}
          disabledTextStyles={{ color: "grey" }}
          onSelect={() => set_chosen_param_2D(selected)}
        />
      </Structures.FlexContainer>
    </Surface>
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