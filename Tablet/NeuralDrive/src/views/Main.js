// React Native Imports
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {send_command} from '../class/http';
import LinearGradient from 'react-native-linear-gradient';

// Component Imports
import MainModules from '../components/MainModules.js';
import Chart from '../components/Chart.js';
import Canva from '../components/Canvas';
import Parameters from '../components/parametersBox';
import {Action} from '../class/actions';
import {get_patient_level, get_smartwatch_connected} from '../class/const';

// Style Imports
import * as ColorTheme from '../styles/Colors';
import {InfoBox} from '../components/infoBox';

const {width, height} = Dimensions.get('window');
canvas_ref = React.createRef();
patient_level = 10;
smartwatch_connected = false;

const Main = () => {
  const [value2, setValue2] = useState(0);
  useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
      console.log(get_smartwatch_connected());
      smartwatch_connected = get_smartwatch_connected();
    }, 1000);

    return () => clearInterval(interval2);
  }, [value2]);
  return (
    // <ScrollView style={styles.viewContainer}>
    //   <MainModules.FlexContainer
    //     flexDirection={'column'}
    //     height={height - 30 + 'px'}
    //     width={width + 'px'}>
    //     <MainModules.TopTabModule StartSessionPress={() => blank()} />

    //     <MainModules.FlexContainer>
    //       <MainModules.SideTabModule
    //         flex={0.3}
    //         ResetPress={() => blank()}
    //         QueryPress={() => blank()}
    //       />
    //       <MainModules.GraphModule
    //         height="100%"
    //         width="100%"
    //         bgColor="#222"
    //         //screen1={Chart}
    //         screen2={Canva}
    //       />
    //     </MainModules.FlexContainer>
    //   </MainModules.FlexContainer>
    // </ScrollView>

    <View style={styles.mainView}>
      <View style={styles.verticalBox_Input}>
        <Parameters canvas_ref={canvas_ref} />
        <InfoBox></InfoBox>
      </View>

      {/*  ---------------------------------------------------------------------------- */}
      <View style={styles.verticalBox_Graph}>
        <Swiper>
          <View style={styles.slideView}>
            <LinearGradient
              colors={['#A1C4FD', '#C2E9FB']}
              style={styles.title2}>
              <Text style={styles.titleText}>PATIENT WATCH DATA</Text>
            </LinearGradient>
            <View style={styles.slideViewChart}>
              <Chart></Chart>
            </View>
          </View>
          <View style={styles.slideView}>
            <LinearGradient
              colors={['#A1C4FD', '#C2E9FB']}
              style={styles.title2}>
              <Text style={styles.titleText}>GAUSSIAN PROCESS</Text>
            </LinearGradient>
            <View style={styles.slideViewChart}>
              <Canva ref={canvas_ref}></Canva>
            </View>
          </View>
          <View style={styles.slideView}>
            <LinearGradient
              colors={['#A1C4FD', '#C2E9FB']}
              style={styles.title2}>
              <Text style={styles.titleText}>OTHER</Text>
            </LinearGradient>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

function blank() {
  // To be completed
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  verticalBox_Input: {
    backgroundColor: '#9DD6EB',
    borderColor: 'white',
    //borderWidth: 10,
    width: '19%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 40,
    // borderRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  verticalBox_Graph: {
    //borderWidth: 1,
    width: '79%',
    height: '100%',
    borderColor: 'white',
    borderRadius: 20,
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  slideTitle: {
    color: 'grey',
    fontSize: 35,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    height: '10%',
    backgroundColor: '#9DD6EB',
    //borderColor: '#9DD6EB',
    textAlignVertical: 'center',
    textAlign: 'center',
    // borderWidth: 10,
    // borderRadius: 20,
    width: '100%',
  },
  title2: {
    height: '10%',
    width: '100%',
  },

  titleText: {
    height: '100%',
    fontSize: 35,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: 'grey',
    width: '100%',
    textAlign: 'center',
    color: 'black',
  },
  slideView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#EEE',
    borderLeftColor: '#EEE',
    //borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
  slideViewChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '89%',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 20,
  },
  viewContainer: {
    width: '100%',
    height: '100%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  upperbox: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
  },
  patient_data_level_box: {
    width: '80%',
    height: '20%',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Main;
