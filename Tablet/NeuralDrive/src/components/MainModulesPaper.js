import React from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {BarIndicator, PulseIndicator} from 'react-native-indicators';
import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import {get_smartwatch_connected} from '../class/const';
import Canva from '../components/Canvas.js';
import Chart from '../components/Chart.js';

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
    height: '100%',
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

// VIEWS AND CONTAINERS
// prettier-ignore
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

const GraphModule = () => (
  <FlexContainer>
    <Surface color="red" style={{display: 'flex', borderRadius: 25}}>
      <Swiper>
        <Canva />
        <Chart />
      </Swiper>
    </Surface>
  </FlexContainer>
);

const InputModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

const Input = ({dimension, unitType, flexInput}) => (
  <FlexContainer
    jc={'flex-start'}
    flex={flexInput}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#4a4a4a'}
    borderRadius={'15px'}
    onStartShouldSetResponder={() => Alert.alert('Input Clicked...')}>
    {/* <CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </CustomText> */}
    <Box
      height={'35px'}
      width={'40px'}
      bgColor={'#eee'}
      borderRadius={'5px'}
      border={'2px solid black'}>
      <Text variant="labelLarge" style={{color: '#374F42'}}>
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
      textColor="black"
      label={dimension}
      dense={true}
      style={{
        paddingVertical: 8,
        marginHorizontal: 10,
        width: '60%',
        textAlign: 'center',
      }}
    />
    {/* <Inputs.Round width={'20%'}/> */}
    <Text variant="labelLarge" style={{color: 'white'}}>
      {' '}
      {unitType}{' '}
    </Text>
  </FlexContainer>
);

// flexInput to adjust each input size
const InputModule = ({QueryPress, ResetPress}) => (
  <Surface style={styles.inputSurface} elevation={1}>
    <FlexContainer
      flex={0.8}
      flexDirection={'column'}
      jc={'flex-start'}
      alignItems="center"
      pad="0"
      bgColor={'#00000000'}>
      <Input
        flexInput={0.35}
        dimension={'Parameter #1'}
        unitType={'units'}
        titleSpacing={'0 5px 0 0'}
      />
      <Input
        flexInput={0.35}
        dimension={'Parameter #2'}
        unitType={'units'}
        titleSpacing={'0 6px 0 0'}
      />
    </FlexContainer>
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
        onPress={() => QueryPress}
        uppercase={true}>
        <Text variant="labelLarge" adjustsFontSizeToFit={true}>
          query
        </Text>
      </Button>
    </FlexContainer>
  </Surface>
);

patient_level = 10;
smartwatch_connected = false;
// Used inside SideTabModule
const WatchModule = ({height, width, bgColor}) => {
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
      <Text variant="headlineLarge">{patient_level}</Text>
      <Text>SMART-WATCH IS CONNECTED = {String(smartwatch_connected)}</Text>
    </Surface>
  );
};

// const SideTabModule = ({ flex, StartSessionPress, ResetPress, QueryPress}) =>
//   <FlexContainer flex={flex} pad='0px'>
//     {/* <ScrollView> */}
//     {/* <FlexContainer height={'1500px'} flexDirection="column" jc='flex-start' pad='10px'> */}
//     <FlexContainer flexDirection="column" jc='flex-start' pad='10px'>
//         <FlexContainer flex={0.05} jc={'flex-start'}>
//           <BarIndicator count={4} color={'#CC958F'} size={20} style={{ flex: 0.1, paddingRight: 20 }} />
//           <Text> Try Connect to server</Text>
//         </FlexContainer>

//         <FlexContainer flex={0.15} jc='center'>
//           <Surface style={{ flexDirection: 'row', borderRadius: 15, padding: 15 }}>
//             <PulseIndicator color='red' size={30} style={{ flex: 0.1, paddingRight: 25 }} />
//             <Button
//               icon='play'
//               mode='elevated'
//               buttonColor={'#CC958F'}
//               dark={false} loading={false}
//               onPress={() => StartSessionPress}
//               uppercase={true}
//               style={{ height: 40 }}>
//               <Text
//                 variant="labelLarge"
//                 adjustsFontSizeToFit={true}
//                 numberOfLines={1}>

//                 start session</Text>
//             </Button>
//           </Surface>
//         </FlexContainer>

//         {/* adjust  */}
//         <FlexContainer flex={0.5} flexDirection='column' jc='center' alignItems='flex-start' pad='10px 0 10px 0'>
//           <InputModule
//             alignItems={'flex-start'}
//             ResetPress={ResetPress}
//             QueryPress={QueryPress}
//           />
//         </FlexContainer>

//         <FlexContainer flex={0.5} jc='center' pad='10px 0 0 0'>
//           <WatchModule />
//         </FlexContainer>
//     </FlexContainer>
//     {/* </ScrollView> */}
// </FlexContainer>

const SideTabModule = ({flex, StartSessionPress, ResetPress, QueryPress}) => (
  <FlexContainer flex={flex} pad="0px">
    <ScrollView>
      <FlexContainer
        height={'1500px'}
        flexDirection="column"
        jc="flex-start"
        pad="10px">
        <FlexContainer flex={0.05} jc={'flex-start'}>
          <BarIndicator
            count={4}
            color={'#CC958F'}
            size={20}
            style={{flex: 0.1, paddingRight: 20}}
          />
          <Text> Try Connect to server</Text>
        </FlexContainer>

        <FlexContainer flex={0.15} jc="center">
          <Surface
            style={{flexDirection: 'row', borderRadius: 15, padding: 15}}>
            <PulseIndicator
              color="red"
              size={30}
              style={{flex: 0.1, paddingRight: 25}}
            />
            <Button
              icon="play"
              mode="elevated"
              buttonColor={'#CC958F'}
              dark={false}
              loading={false}
              onPress={() => StartSessionPress}
              uppercase={true}
              style={{height: 40}}>
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

        <FlexContainer flex={0.5} jc="center" pad="10px 0 0 0">
          <WatchModule />
        </FlexContainer>
      </FlexContainer>
    </ScrollView>
  </FlexContainer>
);

const SideTabModuleVertical = ({flex, ResetPress, QueryPress}) => (
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
          <Text> Try Connect to server</Text>
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
        <WatchModule height={'100%'} width={'100%'} bgColor={'#555'} />
      </FlexContainer>
    </FlexContainer>
  </ScrollView>
);

export default MainModulesPaper = {
  Box: Box, // You can put Text components directly inside
  GraphModule: GraphModule, // You need to put them here
  FlexContainer: FlexContainer,
  InputModule: InputModule,
  WatchModule: WatchModule,
  SideTabModule: SideTabModule,
  SideTabModuleVertical: SideTabModuleVertical,
};
