import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Calm Coastal
let Color4 = '#EAE9E7'

const CustomDrawer = props => {
  return (
    <View style={{ flex: 1, backgroundColor: Color4 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: Color4 }}>
        <View style={{ flex: 1, backgroundColor: Color4, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;