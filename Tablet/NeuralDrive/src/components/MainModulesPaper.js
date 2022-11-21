import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import {BarIndicator, PulseIndicator} from 'react-native-indicators';
import * as Structures from './Structures.js';
import { Button, Surface, Text } from 'react-native-paper';
import {Stopwatch} from 'react-native-stopwatch-timer';

import PanelItemParameters from "./main/panel-control/panel-item-parameters/panel-item-parameters.component";
import PanelItemStatistics from "./main/panel-control/panel-item-statistics/panel-item-statistics.component";

import { get_smartwatch_connected } from '../class/const';
import { get_watch_data, post_start_new_session } from '../class/http';

import * as problemDimensionService from "../services/problem-dimension.service";

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
          <PanelItemParameters
            alignItems={'flex-start'}
            ResetPress={ResetPress}
            QueryPress={QueryPress}
          />
          {/* </Structures.FlexContainer> */}

          <PanelItemStatistics />
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
          <PanelItemParameters flex={1} alignItems={'flex-start'} />
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
  ConnectionModule: ConnectionModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
