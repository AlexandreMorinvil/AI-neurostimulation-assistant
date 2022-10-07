import styled from 'styled-components';
import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import Buttons from '../components/Buttons.js';
import Swiper from 'react-native-swiper';

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
const GraphModuleasdasd = ({height, width, bgColor, screen1, screen2}) =>
      <Box height={height} width={width} bgColor={'#555'} marg={'0 0 0 0'}>
        <Swiper>
          <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
            <CustomText fontsize={'56px'} > {screen1} </CustomText>
          </Box>
          <Box height={height} width={width} bgColor={bgColor} marg={'0'}>
            <CustomText fontsize={'56px'} > {screen2} </CustomText>
          </Box>
        </Swiper>
      </Box>

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

      export default MainModules = {
        Box: Box, // You can put Text components directly inside
        GraphModule: GraphModule, // You need to put them here
        FlexContainer: FlexContainer,
        InputModule: InputModule,
        WatchModule: WatchModule,
      };
