import styled from 'styled-components';
import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import Buttons from '../components/Buttons.js';

// VIEWS AND CONTAINERS
const FlexContainer = styled.View`
    flex: ${props => props.flex || '1'};
    flexDirection: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.jc || 'space-evenly'};
    align-items: ${props => props.alignItems || 'center'};
    background-color: ${props => props.bgColor || '#222'};
    border-radius: ${props => props.borderRadius || '0px'};
    margin: ${props => props.marg || '10px'};
    padding: ${props => props.pad || '0px'};
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
`;


// MODULES
const GraphModule = ({height, width, bgColor, title}) =>
      <Box height={height} width={width} bgColor={bgColor}>
        <CustomText fontsize={'56px'} > {title} </CustomText>
      </Box>

const Input = ({dimension, unitType}) =>
      <FlexContainer jc={'flex-start'} pad={'0px 0px 0px 10px'}>
        <CustomText fontsize={'16px'}> {dimension} </CustomText>
        <Box height={'40px'} width={'40px'} bgColor={'#444'} borderRadius={'5px'} >
          <CustomText color={'yellow'} fontsize={'16px'}> XY </CustomText>
        </Box>
        <Inputs.Round width={'80px'}/>
        <CustomText fontsize={'16px'}> {unitType} </CustomText>
      </FlexContainer>

      // Flex around boxes, not box around flexes
const InputModule = ({flex, bgColor}) =>
      <Box height={'400px'} width={'100%'} bgColor={bgColor}>
        <FlexContainer flex={flex} flexDirection={'column'} jc={'flex-start'} alignItems={'flex-start'} borderRadius={'20px'}>
          <Input dimension={'Frequency'} unitType={'Hz'}/>
          <Input dimension={'Voltage'} unitType={'Volts'}/>
          <Input dimension={'Dimension'} unitType={'units'}/>
          <Input dimension={'Dimension'} unitType={'units'}/>
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
