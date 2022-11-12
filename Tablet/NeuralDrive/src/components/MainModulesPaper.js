import React from 'react';
import {
  send_command,
  post_start_new_session,
  post_execute_query,
} from '../class/http';
import Canvas from 'react-native-canvas';
import { get_watch_data } from '../class/http';
import { Action, Status, ERROR_CODE } from '../class/actions';
import { Slider } from 'react-native-elements';
import { Alert, ScrollView, StyleSheet, View} from 'react-native';
import { BarIndicator, PulseIndicator } from 'react-native-indicators';
import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
  TextInput,
  SegmentedButtons,
} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { SelectList } from 'react-native-dropdown-select-list'
import styled from 'styled-components';
import { get_smartwatch_connected, smartwatch_is_connected } from '../class/const';
import HeapMap from '../components/HeatMap.js';
import Chart from '../components/Chart.js';
import HeatMapGraph from '../components/HeatMapGraph';
import {get_server_ip, set_heat_map_data, set_dimension_of_chart, set_chosen_param_2D} from '../class/const';

CanvasRef = React.createRef();

class HeatMapModule extends React.Component {
  render() {
    return <HeapMap ref={CanvasRef} />;
  }
}

const GraphModule = () => (
  <FlexContainer>
    <Surface color="red" style={{ display: 'flex', borderRadius: 25 }}>
      <Swiper>
        <Chart />
        <HeatMapModule />
        <HeatMapGraph />
      </Swiper>
    </Surface>
  </FlexContainer>
);

const Input = ({ dimension, unitType, flexInput, setFunction, value }) => (
  <FlexContainer
    jc={'flex-start'}
    flex={flexInput}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#8a8a8a'}
    borderRadius={'15px'}
  /* onStartShouldSetResponder={() => Alert.alert('Input Clicked...')}> */
  >
    {/* <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText> */}
    <Box
      height={'70px'}
      width={'70px'}
      bgColor={'#eee'}
      borderRadius={'5px'}
      border={'2px solid black'}>
      <Text variant="titleMedium" style={{ color: '#374F42' }}>
        {' '}
        XY{' '}
      </Text>
    </Box>

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
  </FlexContainer>
);


// TODO: Cleaning
const set_session_status = status => {
  mission_status = status;
};

const start_new_session = (dimension, n_param) => {
  console.log('START SESSION');
  return post_start_new_session(dimension, n_param);
};

// const set_dimension = dimension => {
//   this.dimension = +dimension;
//   this.CanvasRef.current.current_algorithm.dimention = this.dimension;
// };
const set_n_param = n_param => {
  this.n_param = +n_param;
  this.CanvasRef.current.current_algorithm.n_param = this.n_param;
};
const set_A = A => {
  this.A = +A;
};
const set_B = B => {
  this.B = +B;
};
const set_Y_value = y_value => {
  this.y_value = +y_value;
};

const set_old_A = old_A => {
  this.old_A = +old_A;
};
const set_old_B = old_B => {
  this.old_B = +old_B;
};
const set_old_Y_value = old_y_value => {
  this.old_y_value = +old_y_value;
};

session_status = Status.IDLE;
n_param = 2;
A = 2;
B = 0;
y_value = 0;

old_A = A;
old_B = B;
old_y_value = y_value;

// adding setValue function

// const setValue = value => {
//   this.value = value;
// };

dimension = 10;

const set_dimension = dimension => {
  this.dimension = dimension;
};

// TODO : End cleaning

// flexInput to adjust each input size
const InputModule = ({ QueryPress, ResetPress }) => {
  const [localDimension, local_set_dimension] = React.useState(10);
  const [value, setValue] = React.useState(0);

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
      <FlexContainer flex={0.2} flexDirection={'column'} bgColor='#00000000'>
        {/* TODO: Remove when completed */}
        {/* <Text variant="headlineSmall">DIMENSIONS</Text> */}
        {/* <Slider */}
        {/*   style={{width: '80%'}} */}
        {/*   value={dimension} */}
        {/*   maximumValue={50} */}
        {/*   minimumValue={5} */}
        {/*   thumbTintColor={'black'} */}
        {/*   thumbTouchSize={{width: 30, height: 30}} */}
        {/*   thumbStyle={{height: 20, width: 20}} */}
        {/*   step={1} */}
        {/*   onValueChange={value => { */}
        {/*     set_dimension(value); */}
        {/*     local_set_dimension(value); */}
        {/*   }} */}
        {/* /> */}
        <Text variant='titleMedium'> Dimension</Text>
        <SegmentedButtons
          value={localDimension} onValueChange={local_set_dimension}
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
      </FlexContainer>
      {/* Inputs */}
      <FlexContainer
        flex={0.8}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <Input
          flexInput={0.35}
          dimension={'Amplitude (V)'}
          value={2}
          setFunction={text => set_A(text)}
          unitType={'units'}
          titleSpacing={'0 5px 0 0'}
        />
        <Input
          flexInput={0.35}
          setFunction={text => set_B(text)}
          dimension={'Parameter #2'}
          value={2}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
        />
        <Input
          flexInput={0.35}
          setFunction={text => set_Y_value(text)}
          dimension={'tremor'}
          value={2}
          unitType={'units'}
          titleSpacing={'0 6px 0 0'}
        />
      </FlexContainer>
      {/* Reset & Query */}
      <FlexContainer flex={0.2} jc="space-around" bgColor="00000000">
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
            response = await post_execute_query(A, B, y_value);
            CanvasRef.current.current_algorithm.data = JSON.parse(
              response.predict_heat_map,
            );
            CanvasRef.current.current_algorithm.position = JSON.parse(
              response.position,
            );
            CanvasRef.current.draw_heat_map(
              CanvasRef.current.current_algorithm,
            );
            set_old_A(
              CanvasRef.current.current_algorithm.position[
              Number(response.next_query)
              ][0],
            );
            set_old_B(
              CanvasRef.current.current_algorithm.position[
              Number(response.next_query)
              ][1],
            );
            set_heat_map_data(JSON.parse(response.values));
            set_dimension_of_chart(this.dimension);
            setValue(value => value + 1);
          }}
          uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            query
          </Text>
        </Button>
      </FlexContainer>
      <Text variant="labelLarge" adjustsFontSizeToFit={true}>
            2D Gaussian parameter
      </Text>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={gaussianGraphSelectionParam} 
        save="key"
        onSelect={() => set_chosen_param_2D(selected)}
      />
    </Surface>
  );
};

patient_level = 10;
smartwatch_connected = false;
// Used inside SideTabModule
const ConnectionModule = ({ height, width, bgColor }) => {
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
      <ServerConnection />
      {/* Database */}
      {/* TODO */}
      {/* Watch */}
      {/* <Text>SMART-WATCH IS CONNECTED = {String(smartwatch_connected)}</Text> */}
      <WatchModule/>
      <Text variant="headlineLarge" style={{marginTop: 30}}> <Text variant='headlineSmall'> Average Tremor: </Text> {patient_level}</Text>
    </Surface>
  );
};


const ServerConnection = () => {
  const [connectionStatus, setConnectionStatus] =
    React.useState('Not Connected to Server');
  const [indicatorColor, setIndicadorColor] = React.useState('#CC958F');

  // setIp every second
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const watch_data = await get_watch_data();
      if (watch_data) {
        setConnectionStatus('Connected to Server');
        setIndicadorColor('#A3D9A3');
      } else {
        setConnectionStatus('Not Connected to Server ');
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
        style={{ flex: 0.1, paddingRight: 20 }}
      />

      <Text variant="titleLarge" adjustsFontSizeToFit={true}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const WatchModule = () => {

  const [connectionStatus, setConnectionStatus] = React.useState('Not Connected to Watch');
  const [indicatorColor, setIndicadorColor] = React.useState('#CC958F');
  // setIp every second
  //
  React.useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus(connectionStatus => connectionStatus + 1);
      console.log(get_smartwatch_connected());
      smartwatch_connected = get_smartwatch_connected();
      // smartwatch_connected = false;
      if (smartwatch_connected) {
        setConnectionStatus('Connected to Watch');
        setIndicadorColor('#A3D9A3');
      } else {
        setConnectionStatus('Not Connected to Watch');
        setIndicadorColor('#CC958F');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [connectionStatus]);

  return (
    <View style={{flexDirection: 'row'}}>
      <BarIndicator
        count={4}
        color={indicatorColor}
        size={20}
        style={{ flex: 0.1, paddingRight: 20 }}
      />

      <Text variant="titleLarge" adjustsFontSizeToFit={true}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const SideTabModule = ({ flex, ResetPress, QueryPress }) => {
  const [value, setValue] = React.useState(0);
  return (
    <FlexContainer flex={flex} pad="0px">
      <ScrollView>
        <FlexContainer
          height={'1500px'}
          flexDirection="column"
          jc="flex-start"
          pad="10px">

          <FlexContainer flex={0.15} jc="center" pad='0'>
            <Surface
              style={{ flexDirection: 'row', borderRadius: 15, padding: 35, width: '100%', justifyContent:'flex-start', alignItems: 'center'}}>
              <PulseIndicator
                color="red"
                size={30}
                style={{ flex: 0.1, paddingRight: 25 }}
              />
              <Button
                icon="play"
                mode="elevated"
                buttonColor={'#CC958F'}
                dark={false}
                loading={false}
                onPress={async () => {
                  CanvasRef.current.current_algorithm.n_param = n_param;
                  CanvasRef.current.current_algorithm.dimention = dimension;

                  let status = await start_new_session(n_param, dimension);
                  console.log('status = ', status);
                  session_status = status;
                  setValue(value => value + 1);
                }}
                uppercase={true}
                style={{ height: 40 }}>
                <Text
                  variant="labelLarge"
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  start session
                </Text>
              </Button>
            </Surface>
          </FlexContainer>

          <FlexContainer
            flex={0.5}
            flexDirection="column"
            jc="center"
            alignItems="flex-start"
            pad="10px 0 10px 0">
            <InputModule
              alignItems={'flex-start'}
              ResetPress={ResetPress}
              QueryPress={QueryPress}
            />
          </FlexContainer>

          {/* <FlexContainer flex={0.15} jc="center" pad="10px 0 0 0"> */}
            <ConnectionModule />
          {/* </FlexContainer> */}
        </FlexContainer>
      </ScrollView>
    </FlexContainer>
  );
};

const SideTabModuleVertical = ({ flex, ResetPress, QueryPress }) => (
  <ScrollView>
    <FlexContainer flex={flex} pad="0px">
      <FlexContainer
        flexDirection="column"
        flex={0.4}
        jc="flex-start"
        pad="10px">
        <FlexContainer flex={0.2}>
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
        </FlexContainer>
        <FlexContainer flex={0.1}>
          <BarIndicator count={4} color={'#CC958F'} size={20} />
        </FlexContainer>
        <FlexContainer flex={0.3} jc="center">
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
        </FlexContainer>
        <FlexContainer flex={1} jc="center" pad="10px 0 10px 0">
          <InputModule flex={1} alignItems={'flex-start'} />
        </FlexContainer>
        <FlexContainer flex={0.3} jc="center">
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
        </FlexContainer>
      </FlexContainer>
      <FlexContainer flex={0.54} jc="center" pad="10px 0 0 0">
        <ConnectionModule height={'100%'} width={'100%'} bgColor={'#555'} />
      </FlexContainer>
    </FlexContainer>
  </ScrollView>
);

// Styling
const styles = StyleSheet.create({
  surface: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
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
    padding: 8,
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  inputSurface: {
    margin: 0,
    padding: 8,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
});

// Utility components
// prettier-ignore
// styled-components
const FlexContainer = styled.View`
  flex: ${props => props.flex || '1'};
  flexDirection: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.jc || 'space-evenly'};
  align-items: ${props => props.alignItems || 'center'};
  background-color: ${props => props.bgColor || '#fff'};
  border-radius: ${props => props.borderRadius || '0px'};
  margin: ${props => props.marg || '0px'};
  padding: ${props => props.pad || '10px'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};

  shadowColor: ${props => props.shadowColor || '#000'};
  elevation: ${props => props.elevation || '0'};
  border: ${props => props.border || '0px solid black'};
`;

// justify-content: vertical content position
// align-items: horizontal content position
// margin: space around boxes
const Box = styled.View`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
  background-color: ${props => props.bgColor || '#fff'};

  border-radius: ${props => props.borderRadius || '25px'};
  justify-content: ${props => props.jc || 'center'};
  align-items: center;
  margin: ${props => props.marg || '0'};
  padding: ${props => props.pad || '0'};

  shadowcolor: ${props => props.shadowColor || '#000'};
  elevation: ${props => props.elevation || '0'};
  border: ${props => props.border || '0px solid black'};
`;

// EXPORTS
export default MainModulesPaper = {
  Box: Box, // You can put Text components directly inside
  GraphModule: GraphModule, // You need to put them here
  FlexContainer: FlexContainer,
  InputModule: InputModule,
  ConnectionModule: ConnectionModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
