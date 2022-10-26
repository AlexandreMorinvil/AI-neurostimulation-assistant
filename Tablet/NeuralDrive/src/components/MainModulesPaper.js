
import styled from 'styled-components';
import React from 'react';
import { Surface, Text, Button } from 'react-native-paper';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import Buttons from '../components/Buttons.js';
import Swiper from 'react-native-swiper';
import * as ColorTheme from '../styles/Colors';
import Canva from '../components/Canvas.js';
import Chart from '../components/Chart.js';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


// VIEWS AND CONTAINERS
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

    shadowColor: ${props => props.shadowColor || '#000'};
    elevation: ${props => props.elevation || '0'};
    border: ${props => props.border || '0px solid black'};
`;

const CustomText = styled.Text`
    color: ${props => props.color || 'white'};
    font-size: ${props => props.fontsize || '12px'};
    margin: ${props => props.marg || '0px'};
`;

// TODO: Clean
// MODULES

const MyComponent = () => (
  <View>
    <Surface style={styles.surface} elevation={4}>
      <Text>Surface</Text>
    </Surface>
    <Surface style={styles.surface} elevation={4}>
      <Text>Surface</Text>
    </Surface>
    <Surface style={styles.surface} elevation={1}>
      <Text>Surface</Text>
    </Surface>
    <Button icon='camera' mode='contained'>
      Press Me
    </Button>
  </View>
);

const GraphModule = ({height, width, bgColor, screen1, screen2}) =>

  <FlexContainer>
    <Surface style={{ display: 'flex', borderRadius: 25 }}>
      <Swiper>
        <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
          <Canva />
        </Box>
        <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
          <Chart />
        </Box>
      </Swiper>
    </Surface>
  </FlexContainer>

const Input = ({dimension, unitType, titleSpacing}) =>
      <FlexContainer jc={'flex-start'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     bgColor={'#7BB094'}
                     borderRadius={'15px'}>

        <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText>
        <Box height={'40px'} width={'40px'} bgColor={'#eee'} borderRadius={'5px'} border={'3px solid ' + ColorTheme.Custom.Second }>
          <CustomText color={'#374F42'} fontsize={'16px'}> XY </CustomText>
        </Box>
        <Inputs.Round width={'20%'}/>
        <CustomText fontsize={'16px'}> {unitType} </CustomText>
      </FlexContainer>

      // titleSpacing is used to align each row
const InputModule = ({flex}) =>
    <Surface style={styles.inputSurface} elevation={1}>
      <FlexContainer flex={flex} flexDirection={'column'} alignItems={'flex-start'} pad={'10px 15px 10px 5px'} bgColor={'#00000000'}>
        <Input dimension={'Parameter #1'} unitType={'units'} titleSpacing={'0 5px 0 0'} />
        <Input dimension={'Parameter #2'} unitType={'units'} titleSpacing={'0 6px 0 0'} />
      </FlexContainer>
    </Surface>

// Used inside SideTabModule
const WatchModule = ({height, width, bgColor}) =>
    <Surface style={styles.watchSurface} elevation={1}>
      <Text variant='headlineLarge'>Watch Module</Text>
    </Surface>

const SideTabModule = ({flex, ResetPress, QueryPress}) =>
          <FlexContainer flex={flex} pad='0px'>
            <FlexContainer flexDirection="column" jc='flex-start' pad='10px'>
              <FlexContainer flex={0.08} jc='center'>
                <Button icon='sync' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={()=>ResetPress}> RESET </Button>
              </FlexContainer>
              <FlexContainer flex={0.3} jc='center' pad='10px 0 10px 0'>
                <InputModule
                  flex={1}
                  alignItems={'flex-start'}
                />
              </FlexContainer>
              <FlexContainer flex={0.08} jc='center'>
                <Button icon='tab-search' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={()=>QueryPress}accessibilityHint={'Next Query'}> QUERY </Button>
              </FlexContainer>
              <FlexContainer flex={0.54} jc='center' pad='10px 0 0 0'>
                <WatchModule height={'100%'} width={'100%'} bgColor={'#555'}/>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>

const SideTabModuleVertical = ({flex, ResetPress, QueryPress}) =>
  <FlexContainer flex={flex} pad='0px'>
    <FlexContainer flexDirection="column" flex={0.8} jc='flex-start' pad='10px'>
      <FlexContainer flex={0.3} jc='center'>
        <Button icon='sync' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => ResetPress}> RESET </Button>
      </FlexContainer>
      <FlexContainer flex={1} jc='center' pad='10px 0 10px 0'>
        <InputModule
          flex={1}
          alignItems={'flex-start'}
        />
      </FlexContainer>
      <FlexContainer flex={0.3} jc='center'>
        <Button icon='tab-search' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => QueryPress} accessibilityHint={'Next Query'}> QUERY </Button>
      </FlexContainer>
    </FlexContainer>
    <FlexContainer flex={0.54} jc='center' pad='10px 0 0 0'>
      <WatchModule height={'100%'} width={'100%'} bgColor={'#555'} />
    </FlexContainer>
  </FlexContainer>


const TopTabModule = ({StartSessionPress}) =>
        <MainModules.FlexContainer bgColor='white' flex={0.08} jc="space-evenly">
          <Button icon='play' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={()=>StartSessionPress} uppercase={true}>
            <Text variant="labelSmall" adjustsFontSizeToFit={true}>start session</Text>
          </Button>
          <MainModules.Box height="100%" width="10%" bgColor="#555">
            <PulseIndicator color='#CC958F' size={20}/>
            <Text> Server Connection Status </Text>
          </MainModules.Box>
          <MainModules.Box height="100%" width="10%" bgColor="#555">
            <BarIndicator count={4} color={'#CC958F'} size={20}/>
            <Text> Try Connect to server</Text>
          </MainModules.Box>
        </MainModules.FlexContainer>

export default MainModulesPaper = {
        Box: Box, // You can put Text components directly inside
        GraphModule: GraphModule, // You need to put them here
        FlexContainer: FlexContainer,
        InputModule: InputModule,
        WatchModule: WatchModule,
        SideTabModule: SideTabModule,
        SideTabModuleVertical: SideTabModuleVertical,
        TopTabModule: TopTabModule,
        ServerURLInputModule: ServerURLInputModule,
        WatchIPInputModule: WatchIPInputModule,
        MyComponent: MyComponent,
      };

const styles = StyleSheet.create({
  surface: {
    margin: 8,
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
    watchSurface: {
    margin: 8,
    padding: 8,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
  inputSurface: {
    margin: 8,
    padding: 8,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor: '',
  },
});

const ServerURLInput = ({dimension, titleSpacing}) =>
      <FlexContainer jc={'center'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     borderRadius={'15px'}>

        <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText>
        <Inputs.Round width={'400px'}/>
      </FlexContainer>

const ServerURLInputModule = ({flex, bgColor}) =>
      <Box height={'100%'} width={'100%'} bgColor={bgColor} style={{flex:1, justifyContent: "center", alignItems:"center"}}>
        <FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
          <Text style={{ color: "#fff" }}> Enter server's URL in the text box below </Text>
          <ServerURLInput dimension={'IP'} titleSpacing={'0 5px 0 0'}/>
        </FlexContainer>
      </Box>

const WatchIPInputModule = ({flex, bgColor, ipAddress}) =>
      <Box height={'100%'} width={'100%'} bgColor={bgColor} style={{flex:1, justifyContent: "center", alignItems:"center"}}>
        <FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
          <Text style={{ color: "#fff" }}> Enter the following IP address in the Smart Watch </Text>
          <FlexContainer jc={'center'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     borderRadius={'15px'}>
            <Text style={{ color: "#fff" }}>{ipAddress} </Text>
          </FlexContainer>
        </FlexContainer>
      </Box>
