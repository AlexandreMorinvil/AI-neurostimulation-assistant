import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLOR_BACKGROUND } from '../../styles/colors.style';

const PanelFrame = (props) => {

  /**
   * Props
   */
  const { children, style } = props;

  /**
   * Render
   */
  return (
    <View style={[
      styles.container,
      props.style
    ]}>
      {children}
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: COLOR_BACKGROUND.Panel,
    height: "100%",
    margin: 10,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#171717',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  }
});

export default PanelFrame;