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
    background-color: ${props => props.bgColor || 'white'};

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

const GraphModule = ({height, width, bgColor, screen1, screen2}) =>
      <FlexContainer bgColor={'#222'} borderRadius='25px' elevation={'10'} border={'2px solid #333'}>
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
      <FlexContainer jc={'flex-start'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     bgColor={'#7BB094'}
                     borderRadius={'15px'}>

        <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText>
        <Box height={'40px'} width={'40px'} bgColor={'#eee'} borderRadius={'5px'} border={'3px solid ' + ColorTheme.Custom.Second }>
          <CustomText color={'#374F42'} fontsize={'16px'}> XY </CustomText>
        </Box>
        <Inputs.Round width={'80px'}/>
        <CustomText fontsize={'16px'}> {unitType} </CustomText>
      </FlexContainer>

      // titleSpacing is used to align each row
const InputModule = ({flex, bgColor}) =>
      <Box height={'25%'} width={'100%'} bgColor={bgColor}>
        <FlexContainer flex={flex} flexDirection={'column'} alignItems={'flex-start'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
          <Input dimension={'Parameter #1'} unitType={'units'} titleSpacing={'0 5px 0 0'}/>
          <Input dimension={'Parameter #2'} unitType={'units'} titleSpacing={'0 6px 0 0'}/>
          {/* <Input dimension={'Dimension'} unitType={'units'} titleSpacing={'0 3px 0 0'}/> */}
          {/* <Input dimension={'Dimension'} unitType={'units'} titleSpacing={'0 3px 0 0'}/> */}
        </FlexContainer>
      </Box>

// Used inside SideTabModule
const WatchModule = ({height, width, bgColor}) =>
      <Box height={height} width={width} bgColor={'#222'} marg={'30px 0 0 0'} border={'2px solid #333'} elevation={'10'}>
          <CustomText color={'#fff'} fontsize={'30px'}> Watch Info </CustomText>
      </Box>

const SideTabModule = ({ResetPress, QueryPress}) =>
          <FlexContainer flex={0.3}>
            <FlexContainer flexDirection="column">
              <Box height='100%' width='100%' bgColor='#222' jc='flex-start'>
                <Buttons.RoundedButton
                  title="Reset"
                  onPress={ResetPress}
                  bgColor={'#CC958F'}/>
                <InputModule
                  flex={1}
                  alignItems={'flex-start'}
                  bgColor={'#222'}
                />
                <Buttons.RoundedButton
                  title="Query"
                  onPress={QueryPress}
                  bgColor={'#CC958F'}
                  color={'#fff'}/>
                <WatchModule height={'250px'} width={'100%'} bgColor={'#555'}/>
              </Box>
            </FlexContainer>
          </FlexContainer>

const TopTabModule = ({StartSessionPress}) =>
        <MainModules.FlexContainer flex={0.05} jc="space-evenly">
          <Buttons.RoundedButton
            title="Start Session"
            onPress={StartSessionPress}
            bgColor={'#CC958F'}></Buttons.RoundedButton>
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
