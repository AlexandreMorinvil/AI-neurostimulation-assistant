import React from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Text } from 'react-native-paper';
import { Timer } from 'react-native-stopwatch-timer';

import InputQueryParameter from "./input-query-parameter.component"
import PanelItem from '../../panel-item.component';
import { set_chosen_param_2D, set_heat_map_data, get_patient_level, set_patient_level } from '../../../../class/const';
import { post_execute_query } from '../../../../class/http';

import * as Structures from "../../../Structures";

const ITEM_TITLE = "Input Parameters";

// /** Timer */

//   // const [handleFinish, handleFinishSet] = React.useState(false);


// const [timerStart, timerStartSet] = React.useState(false);
// const [timerReset, timerResetSet] = React.useState(false);
// const [totalDuration, totalDurationSet] = React.useState(5000);
// // const [handleFinish, handleFinishSet] = React.useState(false);

const PanelItemParameters = () => {
  const[stateIsQuerying, setStateIsQuerying] = React.useState(false);
  const[stateCount, setStateCount] = React.useState(0);
  const[stateAvgTremor, setStateAvgTremor] = React.useState(0);

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

  /** Increments a value so the view is re-rendered every second (1000ms)  */
  const [value, incrementer] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      incrementer(value => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [value]);

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
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
          disabled={true}
          flexInput={0.35}
          setFunction={text => {
            setY(get_patient_level());
          }}
          dimension={'tremor'}
          value={get_patient_level()}
          predictedValue={predictedY}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
          /* disabled={true} */
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
          onPress={
            // disable inputs & button to avoid another query
            // calculate average
            () => {
            //   console.log('asjdgqiwygeq')
            //   /* setStateIsQuerying(true); */

              // reset AvgTremor
              setStateAvgTremor(get_patient_level());
              setStateCount(1);

              /* const intervalUniqueId = setInterval(() => { */
              /*   setStateAvgTremor(stateAvgTremor + 1); */
              /*   setStateCount(stateCount + 1); */
              /* }, 500); */

              setTimeout(
                async () => {
                // Stop Interval
                // clearInterval(intervalUniqueId);
                // Division to count avg tremor
                // setStateAvgTremor(stateAvgTremor/stateCount)
                response = await post_execute_query(valueP1, valueP2, get_patient_level());
                /* response = await post_execute_query(valueP1, valueP2, stateAvgTremor); */
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

                /* setStateIsQuering(false); */
                  }, 5000)
                }
            }

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
