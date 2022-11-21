import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {BarIndicator, PulseIndicator} from 'react-native-indicators';
import * as Structures from './Structures.js';
import { Button, Text } from 'react-native-paper';

import PanelItemConnection from "./main/panel-control/panel-item-connection/panel-item-connection.component";
import PanelItemParameters from "./main/panel-control/panel-item-parameters/panel-item-parameters.component";
import PanelItemSession from "./main/panel-control/panel-item-session/panel-item-session.component";
import PanelItemStatistics from "./main/panel-control/panel-item-statistics/panel-item-statistics.component";

const SideTabModule = ({flex, ResetPress, QueryPress}) => {
  return (
    <Structures.FlexContainer flex={flex} pad="0px">
      <ScrollView>
        <Structures.FlexContainer
          height={'1500px'}
          flexDirection="column"
          jc="flex-start"
          pad="10px">

          <PanelItemConnection />
          <PanelItemSession />
          <PanelItemParameters
            alignItems={'flex-start'}
            ResetPress={ResetPress}
            QueryPress={QueryPress}
          />

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
        <PanelItemConnection height={'100%'} width={'100%'} bgColor={'#555'} />
      </Structures.FlexContainer>
    </Structures.FlexContainer>
  </ScrollView>
);

// Styling
const styles = StyleSheet.create({
  startSurface: {
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 15,
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
