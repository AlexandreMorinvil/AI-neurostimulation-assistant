import React from 'react';
import {View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

// Calm Coastal
let Color1 = '#8FA5B2'
let Color2 = '#C4D0C6'
let Color3 = '#E3E939'
let Color4 = '#EAE9E7'

// Fruity

// let Color1 = '#E984a2'
// let Color2 = '#b9cc95'
// let Color3 = '#f8d49b'
// let Color4 = '#f8e6cb'

const CustomDrawer = props => {
  return (
    <View style={{flex:1, backgroundColor: Color4}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Color4}}>
        <View style={{flex:1, backgroundColor: Color4, paddingTop:10}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;


// Custom Drawer from scratch
// const App: () => Node = () => {
//   return(
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text> Hello </Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#5359D1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
