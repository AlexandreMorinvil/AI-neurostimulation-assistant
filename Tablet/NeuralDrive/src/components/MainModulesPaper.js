
import styled from 'styled-components';
import React from 'react';
import { Badge, Surface, Text, TextInput, Button, Modal, Portal, Provider } from 'react-native-paper';
import { StyleSheet, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import * as ColorTheme from '../styles/Colors';
import Canva from '../components/Canvas.js';
import Chart from '../components/Chart.js';

import {
  BarIndicator,
  PulseIndicator,
} from 'react-native-indicators';


const styles = StyleSheet.create({
  graphSurface: {
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

const GraphModule = ({ height, width, bgColor, screen1, screen2 }) =>
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

const InputModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

const Input = ({ dimension, unitType, titleSpacing }) =>
  <FlexContainer jc={'flex-start'}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#4a4a4a'}
    borderRadius={'15px'}
    onStartShouldSetResponder={() => Alert.alert('Input Clicked...')}>

    {/* <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText> */}
    <Box height={'35px'} width={'40px'} bgColor={'#eee'} borderRadius={'5px'} border={'2px solid black'}>
      <Text variant='labelLarge' style={{ color: '#374F42' }}> XY </Text>
    </Box>

    <TextInput mode='outlined'
      activeOutlineColor='black'
      outlineColor='white'
      selectionColor='#6f6f6f'
      multiline={false}
      textColor='black'
      label={dimension}
      dense={true}
      style={{ paddingVertical: 8, marginHorizontal: 10, width: '60%', textAlign: 'center' }} />
    {/* <Inputs.Round width={'20%'}/> */}
    <Text variant='labelLarge' style={{ color: 'white' }}> {unitType} </Text>
  </FlexContainer>

// titleSpacing is used to align each row
const InputModule = ({ flex }) =>
  <Surface style={styles.inputSurface} elevation={1}>
    <FlexContainer flex={flex} flexDirection={'column'} alignItems={'flex-start'} pad={'10px 15px 10px 5px'} bgColor={'#00000000'}>
      <Input dimension={'Parameter #1'} unitType={'units'} titleSpacing={'0 5px 0 0'} />
      <Input dimension={'Parameter #2'} unitType={'units'} titleSpacing={'0 6px 0 0'} />
    </FlexContainer>
  </Surface>

// Used inside SideTabModule
const WatchModule = ({ height, width, bgColor }) =>
  <Surface style={styles.watchSurface} elevation={1}>
    <Text variant='headlineLarge'>Watch Module</Text>
  </Surface>

const SideTabModule = ({ flex, StartSessionPress, ResetPress, QueryPress }) =>
  <FlexContainer flex={flex} pad='0px'>
    <FlexContainer flexDirection="column" jc='flex-start' pad='10px'>
      <FlexContainer flex={0.1} jc='space-around'>
        <FlexContainer flex={0.01} marg='0' pad='0'>
          <PulseIndicator color='#CC958F' size={20} style={{height: 30, width: 30, margin: 0, padding: 0, backgroundColor: 'red'}} />
        </FlexContainer>
        <FlexContainer flex={1} marg='0' pad='0'>
          <Button icon='play' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => StartSessionPress} uppercase={true}>
            <Text variant="labelLarge" adjustsFontSizeToFit={true}>start session</Text>
          </Button>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer flex={0.1}>
        <BarIndicator count={4} color={'#CC958F'} size={20} />
        <Text> Try Connect to server</Text>
      </FlexContainer>

      <FlexContainer flex={0.08} jc='center'>
        <Button icon='sync' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => ResetPress} uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>reset</Text>
        </Button>
      </FlexContainer>
      <FlexContainer flex={0.3} jc='center' pad='10px 0 10px 0'>
        <InputModule
          flex={1}
          alignItems={'flex-start'}
        />
      </FlexContainer>
      <FlexContainer flex={0.08} jc='center'>
        <Button icon='tab-search' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => QueryPress} uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>query</Text>
        </Button>
      </FlexContainer>
      <FlexContainer flex={0.54} jc='center' pad='10px 0 0 0'>
        <WatchModule height={'100%'} width={'100%'} bgColor={'#555'} />
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>

const SideTabModuleVertical = ({ flex, ResetPress, QueryPress }) =>
  <FlexContainer flex={flex} pad='0px'>
    <FlexContainer flexDirection="column" flex={0.4} jc='flex-start' pad='10px'>
       <FlexContainer flex={0.2}>
        <PulseIndicator color='#CC958F' size={20} />
        <Button icon='play' mode='elevated' buttonColor={'#CC958F'} dark={false} loading={false} onPress={() => StartSessionPress} uppercase={true}>
          <Text variant="labelLarge" adjustsFontSizeToFit={true}>start session</Text>
        </Button>
      </FlexContainer>
      <FlexContainer flex={0.1}>
        <BarIndicator count={4} color={'#CC958F'} size={20} />
        <Text> Try Connect to server</Text>
      </FlexContainer>
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

export default MainModulesPaper = {
  Box: Box, // You can put Text components directly inside
  GraphModule: GraphModule, // You need to put them here
  FlexContainer: FlexContainer,
  InputModule: InputModule,
  WatchModule: WatchModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
