import React from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {BarIndicator, PulseIndicator} from 'react-native-indicators';
import * as Structures from './Structures.js';
import {
  Button,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {Stopwatch} from 'react-native-stopwatch-timer';

import {
  get_smartwatch_connected,
  set_chosen_param_2D,
  set_heat_map_data,
} from '../class/const';
import {
  get_watch_data,
  post_execute_query,
  post_start_new_session,
} from '../class/http';

import * as problemDimensionService from "../services/problem-dimension.service";

// ref = React.createRef(); // XXX : I am not sure what it is used for

const Input = ({
  dimension,
  unitType,
  flexInput,
  setFunction,
  value,
  predictedValue,
  oldAlgorithmValue,
  boxFunction,

}) => (
  <Structures.FlexContainer
    jc={'flex-start'}
    flex={flexInput}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#8a8a8a'}
    borderRadius={'15px'}
  >
    <Structures.Box
      height={'70px'}
      width={'70px'}
      bgColor={'#eee'}
      borderRadius={'5px'}
      border={'2px solid black'}>
      <Pressable onPress={boxFunction}>
      <Text variant="titleMedium" style={{color: '#374F42'}}>
        {oldAlgorithmValue}
      </Text>
      </Pressable>
    </Structures.Box>

    <TextInput
      mode="outlined"
      activeOutlineColor="black"
      outlineColor="white"
      selectionColor="#6f6f6f"
      multiline={false}
      value={value}
      onChangeText={setFunction}
      textColor="black"
      label={dimension}
      dense={true}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 0,
        marginHorizontal: 10,
        width: '60%',
        height: 60,
        textAlign: 'center',
        fontSize: 24,
      }}
    />
  </Structures.FlexContainer>
);

// const start_new_session = (dimension, n_param) => {
//   console.log('START SESSION');
//   return post_start_new_session(dimension, n_param);
// };

// flexInput to adjust each input size
const InputModule = ({
  QueryPress,
  ResetPress,
}) => {
  const [valueP1, setP1] = React.useState(0);
  const [valueP2, setP2] = React.useState(0);
  const [valueY, setY] = React.useState(0);

  const [predictedP1, setPredictedP1] = React.useState(0);
  const [predictedP2, setPredictedP2] = React.useState(0);
  const [predictedY, setPredictedY] = React.useState(0);

  const [selected, setSelected] = React.useState(0);
  const gaussianGraphSelectionParam = [
    {key: 0, value: 'A'},
    {key: 1, value: 'B'},
    {key: 2, value: 'C', disabled: true},
    {key: 3, value: 'D', disabled: true},
    {key: 4, value: 'E', disabled: true},
    {key: 5, value: 'F', disabled: true},
  ];

  const [oldAlgorithmA, setOldAlgorithmA] = React.useState(0);
  const [oldAlgorithmB, setOldAlgorithmB] = React.useState(0);

  const [currentDisplayA, setCurrentDisplayA] = React.useState(0);
  const [currentDisplayB, setCurrentDisplayB] = React.useState(0);

  const [currentRecommendationA, setCurrentRecommendationA] = React.useState(0);
  const [currentRecommendationB, setCurrentRecommendationB] = React.useState(0);

  return (
    /* InputModule */
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
        <Input
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
          oldAlgorithmValue = {oldAlgorithmA}
          boxFunction={text => {setCurrentDisplayA(oldAlgorithmA.toString());}}
        />
        <Input
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
          oldAlgorithmValue = {oldAlgorithmB}
          boxFunction={text => {setCurrentDisplayB(oldAlgorithmB.toString());}}
        />
        <Input
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
          dropdownTextStyles={{color:"black"}}
          disabledTextStyles={{color:"grey"}}
          onSelect={() => set_chosen_param_2D(selected)}
        />
      </Structures.FlexContainer>
    </Surface>
  );
};

const InfoModule = ({height, width, bgColor}) => {
  const [value2, setValue2] = React.useState(0);
  React.useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
    }, 1000);

    return () => clearInterval(interval2);
  }, [value2]);

  return (
    <Surface style={styles.watchSurface} elevation={1}>
      <Structures.FlexContainer 
        flex={0.3}
        marg={'0px'}
        pad={'0px 0px 0px 8px'}
        bgColor={'#8a8a8a'}
        borderRadius={'15px'}>
      <Text variant="titleLarge"> Watch Info</Text>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.7}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <Text variant="headlineLarge" style={{marginTop: 30}}>
        {' '}
        <Text variant="headlineSmall"> Average Tremor: </Text> {patient_level}
        </Text>
      </Structures.FlexContainer>
    </Surface>
  );
};

patient_level = 10;
smartwatch_connected = false;
// Used inside SideTabModule
const ConnectionModule = ({height, width, bgColor}) => {
  const [value2, setValue2] = React.useState(0);
  React.useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
      smartwatch_connected = get_smartwatch_connected();
    }, 1000);

    return () => clearInterval(interval2);
  }, [value2]);

  return (
    <Surface style={styles.watchSurface} elevation={1}>
      {/* Server  */}
      {/* Database */}
      {/* TODO */}
      {/* Watch */}
      {/* <Text>SMART-WATCH IS CONNECTED = {String(smartwatch_connected)}</Text> */}
      <Structures.FlexContainer 
        flex={0.3}
        marg={'0px'}
        pad={'0px 0px 0px 8px'}
        bgColor={'#8a8a8a'}
        borderRadius={'15px'}>
      <Text variant="titleLarge"> Connection Info</Text>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.7}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
      <ConnectionIndicator
        device={'server'}
        checkConnectionFunction={get_watch_data}
      />
      <ConnectionIndicator
        device={'watch'}
        checkConnectionFunction={get_smartwatch_connected}
      />
      </Structures.FlexContainer>
    </Surface>
  );
};

const ConnectionIndicator = ({device, checkConnectionFunction}) => {
  const [connectionStatus, setConnectionStatus] = React.useState(
    'Not Connected to ' + device,
  );
  const [indicatorColor, setIndicadorColor] = React.useState('#CC958F');

  React.useEffect(() => {
    const interval = setInterval(async () => {
      smartwatch_connected = true;// await checkConnectionFunction();
      if (smartwatch_connected) {
        setConnectionStatus('Connected to ' + device);
        setIndicadorColor('#A3D9A3');
      } else {
        setConnectionStatus('Not Connected to ' + device);
        setIndicadorColor('#CC958F');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      <BarIndicator
        count={4}
        color={indicatorColor}
        size={20}
        style={{flex: 0.1, paddingRight: 20}}
      />

      <Text variant="titleLarge" adjustsFontSizeToFit={true}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const SideTabModule = ({flex, ResetPress, QueryPress}) => {
  const n_param = 2;
  const [value, setValue] = React.useState(0);

  // stopwatch
  const [sessionStarted, setSessionStarted] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);

  return (
    <Structures.FlexContainer flex={flex} pad="0px">
      <ScrollView>
        <Structures.FlexContainer
          height={'1500px'}
          flexDirection="column"
          jc="flex-start"
          pad="10px">
          {/* <Structures.FlexContainer flex={0.1} jc="center" pad='0'> */}
          <ConnectionModule />
          <Surface style={styles.startSurface}>
            <Structures.FlexContainer
              flexDirection="column"
              alignItems="center"
              height="125px"
              bgColor="#00000000">
              <Button
                icon={sessionStarted ? 'stop' : 'play'}
                mode="elevated"
                buttonColor={sessionStarted ? '#CC958F' : '#A3D9A3'}
                dark={false}
                loading={false}
                onPress={async () => {
                  let status = await post_start_new_session(
                    n_param,
                    problemDimensionService.getProblemDimension(),
                  );
                  console.log('status = ', status);
                  session_status = status;
                  setValue(value => value + 1);

                  // stopwatch
                  setSessionStarted(!sessionStarted);

                  if (sessionStarted) {
                    // TODO: get start time
                    // time = getTime()
                  } else {
                    // TODO: get end time
                    // time = getTime()
                    setStopwatchReset(true);
                    setStopwatchReset(false);
                  }
                }}
                uppercase={true}
                style={{height: 40}}>
                <Text
                  variant="labelLarge"
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  {!sessionStarted ? 'start session' : 'stop session'}
                  {/* start session */}
                </Text>
              </Button>
              <Stopwatch
                start={sessionStarted}
                reset={stopwatchReset}
                options={styles.stopwatchOptions}
              />
            </Structures.FlexContainer>
          </Surface>
          {/* </Structures.FlexContainer> */}

          {/* <Structures.FlexContainer */}
          {/*   flex={0.5} */}
          {/*   flexDirection="column" */}
          {/*   jc="center" */}
          {/*   alignItems="flex-start" */}
          {/*   pad="10px 0 10px 0"> */}
          <InputModule
            alignItems={'flex-start'}
            ResetPress={ResetPress}
            QueryPress={QueryPress}
          />
          {/* </Structures.FlexContainer> */}

          <InfoModule />
        </Structures.FlexContainer>
      </ScrollView>
    </Structures.FlexContainer>
  );
};

const SideTabModuleVertical = ({flex, ResetPress, QueryPress}) => (
  <ScrollView>
    <Structures.FlexContainer flex={flex} pad="0px">
      <Structures.FlexContainer
        flexDirection="column"
        flex={0.4}
        jc="flex-start"
        pad="10px">
        <Structures.FlexContainer flex={0.2}>
          <PulseIndicator color="#CC958F" size={20} />
          <Button
            icon="play"
            mode="elevated"
            buttonColor={'#CC958F'}
            dark={false}
            loading={false}
            onPress={() => StartSessionPress}
            uppercase={true}>
            <Text variant="labelLarge" adjustsFontSizeToFit={true}>
              start session
            </Text>
          </Button>
        </Structures.FlexContainer>
        <Structures.FlexContainer flex={0.1}>
          <BarIndicator count={4} color={'#CC958F'} size={20} />
        </Structures.FlexContainer>
        <Structures.FlexContainer flex={0.3} jc="center">
          <Button
            icon="sync"
            mode="elevated"
            buttonColor={'#CC958F'}
            dark={false}
            loading={false}
            onPress={() => ResetPress}>
            {' '}
            RESET{' '}
          </Button>
        </Structures.FlexContainer>
        <Structures.FlexContainer flex={1} jc="center" pad="10px 0 10px 0">
          <InputModule flex={1} alignItems={'flex-start'} />
        </Structures.FlexContainer>
        <Structures.FlexContainer flex={0.3} jc="center">
          <Button
            icon="tab-search"
            mode="elevated"
            buttonColor={'#CC958F'}
            dark={false}
            loading={false}
            onPress={() => QueryPress}
            accessibilityHint={'Next Query'}>
            {' '}
            QUERY{' '}
          </Button>
        </Structures.FlexContainer>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.54} jc="center" pad="10px 0 0 0">
        <ConnectionModule height={'100%'} width={'100%'} bgColor={'#555'} />
      </Structures.FlexContainer>
    </Structures.FlexContainer>
  </ScrollView>
);

// Styling
const styles = StyleSheet.create({
  surface: {
    margin: 10,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  startSurface: {
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 15,
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  graphSurface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  watchSurface: {
    margin: 10,
    padding: 8,
    height: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  inputSurface: {
    margin: 10,
    padding: 8,
    height: 800,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  stopwatchOptions: {
    container: {
      backgroundColor: '#00000000',
      padding: 0,
      borderRadius: 15,
      width: 150,
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      color: '#000',
    },
  },
});

// EXPORTS
export default MainModulesPaper = {
  InputModule: InputModule,
  ConnectionModule: ConnectionModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
