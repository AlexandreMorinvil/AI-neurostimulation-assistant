import styled from 'styled-components';
import React from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import * as Inputs from '../components/Inputs.js';

// VIEWS AND CONTAINERS
const FlexContainer = styled.View`
    flex: ${props => props.flex || '1'};
    flexDirection: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.jc || 'space-evenly'};
    margin: 10px 10px 10px 10px;
    background-color: ${props => props.bgColor || '#222'};
`;

// justify-content: vertical content position
// align-items: horizontal content position
// margin: space around boxes
const Box = styled.View`
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '100px'};
    background-color: ${props => props.bgColor || 'white'};
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    margin: 0 1% 0 1%;
`;

const ViewText = styled.Text`
    color: white;
    font-size: 56px;
`;


// MODULES
const GraphModule = ({height, width, bgColor, title}) =>
      <Box height={height} width={width} bgColor={bgColor}>
        <ViewText> {title} </ViewText>
      </Box>

const InputModule = ({height, width, bgColor}) =>
      <Box height={height} width={width} bgColor={bgColor}>
        <Text> Inputs </Text>
        <Inputs.Round/>
        <Inputs.Round/>
        <Inputs.Round/>
        <Inputs.Round/>
      </Box>

const SuggestionModule = ({height, width, bgColor}) =>
      <Box height={height} width={width} bgColor={bgColor}>
      </Box>


export default MainModules = {
  Box: Box, // You can put Text components directly inside
  GraphModule: GraphModule, // You need to put them here
  FlexContainer: FlexContainer,
  InputModule: InputModule,
};
