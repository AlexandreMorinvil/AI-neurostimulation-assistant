import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {BarIndicator, PulseIndicator} from 'react-native-indicators';
import * as Structures from './Structures.js';
import {
  Button,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {Stopwatch} from 'react-native-stopwatch-timer';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import {Status} from '../class/actions';
import {
  get_smartwatch_connected,
  set_chosen_param_2D,
  set_dimension_of_chart,
  set_heat_map_data,
} from '../class/const';
import {
  get_watch_data,
  post_execute_query,
  post_start_new_session,
} from '../class/http';
import Chart from '../components/Chart.js';
import HeatMap from '../components/HeatMap.js';
import HeatMapGraph from '../components/HeatMapGraph';

ref = React.createRef();

const GraphModule = () => (
  <Structures.FlexContainer>
    <Surface color="red" style={{display: 'flex', borderRadius: 25}}>
      <Swiper>
        <Chart />
        <HeatMap ref={ref} />
        <HeatMapGraph />
      </Swiper>
    </Surface>
  </Structures.FlexContainer>
);

const Input = ({
  dimension,
  unitType,
  flexInput,
  setFunction,
  value,
  predictedValue,
}) => (
  <Structures.FlexContainer
    jc={'flex-start'}
    flex={flexInput}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#8a8a8a'}
    borderRadius={'15px'}
    /* onStartShouldSetResponder={() => Alert.alert('Input Clicked...')}> */
  >
    {/* <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText> */}
    <Structures.Box
      height={'70px'}
      width={'70px'}
      bgColor={'#eee'}
      borderRadius={'5px'}
      border={'2px solid black'}>
      <Text variant="titleMedium" style={{color: '#374F42'}}>
        {predictedValue}
      </Text>
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
  localDimension,
  setLocalDimension,
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

  return (
    /* InputModule */
    <Surface style={styles.inputSurface} elevation={1}>
      {/* dimension */}
      <Structures.FlexContainer
        flex={0.2}
        flexDirection={'column'}
        bgColor="#00000000">
        <Text variant="titleMedium"> Dimension</Text>
        <SegmentedButtons
          value={localDimension}
          onValueChange={setLocalDimension}
          buttons={[
            {
              value: 10,
              label: '10x10',
              icon: 'grid',
            },
            {
              value: 20,
              icon: 'grid',
              label: '20x20',
            },
            {
              value: 50,
              icon: 'grid',
              label: '50x50',
            },
          ]}
        />
        <Text variant="headlineSmall">{'dimension:' + localDimension}</Text>
      </Structures.FlexContainer>
      {/* Inputs */}
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
          value={valueP1}
          predictedValue={predictedP1}
          setFunction={text => {
            setP1(text);
          }}
          unitType={'units'}
          titleSpacing={'0 5px 0 0'}
        />
        <Input
          flexInput={0.35}
          setFunction={text => {
            setP2(text);
          }}
          dimension={'Parameter #2'}
          value={valueP2}
          predictedValue={predictedP2}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
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
          onPress={() => ResetPress}
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
            set_heat_map_data(JSON.parse(response.values));
            /* set_dimension_of_chart(this.dimension); */
            set_dimension_of_chart(localDimension);
          }}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            query
          </Text>
        </Button>
      </Structures.FlexContainer>
      <Text variant="labelLarge" adjustsFontSizeToFit={true}>
        2D Gaussian parameter
      </Text>
      <SelectList
        setSelected={val => setSelected(val)}
        data={gaussianGraphSelectionParam}
        save="key"
        onSelect={() => set_chosen_param_2D(selected)}
      />
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
      <Text variant="headlineLarge" style={{marginTop: 30}}>
        {' '}
        <Text variant="headlineSmall"> Average Tremor: </Text> {patient_level}
      </Text>
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
      console.log(get_smartwatch_connected());
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
      <ConnectionIndicator
        device={'server'}
        checkConnectionFunction={get_watch_data}
      />
      <ConnectionIndicator
        device={'watch'}
        checkConnectionFunction={get_smartwatch_connected}
      />
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
      smartwatch_connected = await checkConnectionFunction();
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
  const [localDimension, setLocalDimension] = React.useState(10);
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
                    localDimension,
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
            localDimension={localDimension}
            setLocalDimension={setLocalDimension}
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
    height: 100,
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
  GraphModule: GraphModule, // You need to put them here
  InputModule: InputModule,
  ConnectionModule: ConnectionModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
