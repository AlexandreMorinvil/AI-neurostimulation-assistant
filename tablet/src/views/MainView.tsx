import { useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { COLOR_BACKGROUND } from '@styles/colorStyles.js';
import { BoxSessionManagement 
} from '@components/main/boxSessionManagement/BoxSessionManagement';
import { BoxSensorsSummary 
} from '@components/main/boxSensorsSummary/BoxSensorSummary';

export const MainView = () => {
  /**
   * States
   */
  const [stateIsOrientationHorizontal, setstateIsOrientationHorizontal] =
    useState(true);


  /**
   * Functions
   */
  const updateLayout = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    setstateIsOrientationHorizontal(screenWidth > screenHeight);
  };

  /**
   * Render
   */
  return (
    <View
      style={[
        styles.viewContainer,
        stateIsOrientationHorizontal
          ? styles.horizontalOrientation
          : styles.verticalOrientation,
      ]}
      onLayout={updateLayout}>
      <ScrollView
        style={styles.controlsArea}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BoxSessionManagement />
      </ScrollView>
      <ScrollView
        style={styles.vizualizationsArea}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BoxSensorsSummary />
      </ScrollView>
    </View>
  );
};

  /**
   * Stylesheet
   */
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND.Application,
    height: 200,
    padding: 0,
  },
  horizontalOrientation: {
    flexDirection: 'row',
  },
  verticalOrientation: {
    flexDirection: 'column',
  },
  controlsArea: {
    flex: 1,
    minWidth: 300,
    minHeight: 300,
  },
  vizualizationsArea: {
    flex: 2,
    minWidth: 500,
    minHeight: 500,
  },
});