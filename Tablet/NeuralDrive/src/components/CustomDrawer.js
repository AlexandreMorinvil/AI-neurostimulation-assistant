import React from 'react';
import {View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import Icon from 'react-native-ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';

// library.add(faSquareCheck, faMugSaucer, faCircle)

const CustomDrawer = props => {
  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#fff'}}>
        <DrawerItemList {...props}/>
        {/* <FontAwesomeIcon icon='square-check' color='red' size={32} transform={{rotate: 42}} mask='circle'/> */}
        {/* <FontAwesomeIcon icon="mug-saucer" mask="circle" transform="shrink-6" /> */}
        {/* <FontAwesome5 name='fa-circle' size={40} color='#000'/> */}
        {/* <FontAwesomeIcon name='fa-solid fa-circle' size={40} color='#000'/> */}
      <FontAwesomeIcon icon={faCircle} />

      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
