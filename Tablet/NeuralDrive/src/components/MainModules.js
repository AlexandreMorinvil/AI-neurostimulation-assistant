import styled from 'styled-components';
import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import Buttons from '../components/Buttons.js';
import Swiper from 'react-native-swiper';
import * as ColorTheme from '../styles/Colors';

// VIEWS AND CONTAINERS
const FlexContainer = styled.View`
    flex: ${props => props.flex || '1'};
    flexDirection: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.jc || 'space-evenly'};
    align-items: ${props => props.alignItems || 'center'};
    background-color: ${props => props.bgColor || '#222'};
    border-radius: ${props => props.borderRadius || '0px'};
    margin: ${props => props.marg || '0px'};
    padding: ${props => props.pad || '10px'};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
`;

// justify-content: vertical content position
// align-items: horizontal content position
// margin: space around boxes
const Box = styled.View`
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '100px'};
    background-color: ${props => props.bgColor || 'white'};

    border-radius: ${props => props.borderRadius || '25px'};
    justify-content: ${props => props.jc || 'center'};
    align-items: center;
    margin: ${props => props.marg || '0 1% 0 1%'};
`;

const CustomText = styled.Text`
    color: ${props => props.color || 'white'};
    font-size: ${props => props.fontsize || '12px'};
    margin: ${props => props.marg || '0 0 0 0'};
`;

// TODO: Clean
// MODULES

const GraphModule = ({height, width, bgColor, screen1, screen2}) =>
      <FlexContainer bgColor={'#555'} borderRadius='25px'>
        <Swiper>
          <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
            <CustomText fontsize={'56px'} > {screen1} </CustomText>
          </Box>
          <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
            <CustomText fontsize={'56px'} > {screen2} </CustomText>
          </Box>
        </Swiper>
      </FlexContainer>

const Input = ({dimension, unitType, titleSpacing}) =>
      <FlexContainer jc={'flex-start'} pad={'0px 0px 0px 10px'}>
        <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText>
        <Box height={'40px'} width={'40px'} bgColor={'#444'} borderRadius={'5px'} >
          <CustomText color={'yellow'} fontsize={'16px'}> XY </CustomText>
        </Box>
        <Inputs.Round width={'80px'}/>
        <CustomText fontsize={'16px'}> {unitType} </CustomText>
      </FlexContainer>

      // titleSpacing is used to align each row
const InputModule = ({flex, bgColor}) =>
      <Box height={'400px'} width={'100%'} bgColor={bgColor}>
        <FlexContainer flex={flex} flexDirection={'column'} alignItems={'flex-start'} borderRadius={'20px'}>
          <Input dimension={'Frequency'} unitType={'Hz'} titleSpacing={'0 5px 0 0'}/>
          <Input dimension={'Voltage'} unitType={'Volts'} titleSpacing={'0 25px 0 0'}/>
          <Input dimension={'Dimension'} unitType={'units'} titleSpacing={'0 3px 0 0'}/>
          <Input dimension={'Dimension'} unitType={'units'} titleSpacing={'0 3px 0 0'}/>
        </FlexContainer>
      </Box>

const WatchModule = ({height, width, bgColor}) =>
      <Box height={height} width={width} bgColor={bgColor} marg={'30px 0 0 0'}>
        <CustomText color={'#fff'} fontsize={'30px'}> Watch Info </CustomText>
      </Box>

const SideTabModule = ({ResetPress, QueryPress}) =>
          <FlexContainer flex={0.3}>
            <FlexContainer flexDirection="column">
              <Box height='100%' width='100%' bgColor='#222' jc='flex-start'>
                <Buttons.RoundedButton
                  title="Reset"
                  onPress={ResetPress}
                  bgColor={ColorTheme.Fruity.First}/>
                <InputModule
                  flex={1}
                  alignItems={'flex-start'}
                  bgColor={'#222'}
                />
                <Buttons.RoundedButton
                  title="Query"
                  onPress={QueryPress}
                  bgColor={ColorTheme.Fruity.First}/>
                <WatchModule height={'250px'} width={'100%'} bgColor={'#555'}/>
              </Box>
            </FlexContainer>
          </FlexContainer>

const TopTabModule = ({StartSessionPress}) =>
        <MainModules.FlexContainer flex={0.05} jc="space-evenly">
          <Buttons.RoundedButton
            title="Start Session"
            onPress={StartSessionPress}
            bgColor={ColorTheme.Fruity.First}></Buttons.RoundedButton>
          <MainModules.Box height="100%" width="10%" bgColor="#555">
            <Text> Server Connection Status </Text>
          </MainModules.Box>
          <MainModules.Box height="100%" width="10%" bgColor="#555">
            <Text> Try Connect to server</Text>
          </MainModules.Box>
        </MainModules.FlexContainer>

export default MainModules = {
        Box: Box, // You can put Text components directly inside
        GraphModule: GraphModule, // You need to put them here
        FlexContainer: FlexContainer,
        InputModule: InputModule,
        WatchModule: WatchModule,
        SideTabModule: SideTabModule,
        TopTabModule: TopTabModule,
      };
