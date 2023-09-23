import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ComputerGearIcon from '../../../assets/compuer-gear-icon';
import TabletGearIcon from '../../../assets/tablet-gear-icon';

const LOCAL_MODE_LABELL = 'Local Backend';
const EXTERNAL_MODE_LABALE = 'External Backend';

const ButtonBackendType = props => {
  /**
   * Props
   */
  const {isActive, isLocalBackendButton, onPress} = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive);

  /**
   * Effects
   */
  useEffect(() => {
    setStateIsActive(props.isActive);
  }, [props.isActive]);

  /**
   * Render
   */
  return (
    <TouchableOpacity
      style={[styles.container, stateIsActive && styles.active, props.style]}
      activeOpacity={stateIsActive ? 1 : 0.85}
      onPress={onPress}>
      <View style={[styles.iconArea, stateIsActive && styles.active]}>
        {isLocalBackendButton ? (
          <TabletGearIcon
            style={[styles.icon, stateIsActive && styles.active]}
          />
        ) : (
          <ComputerGearIcon
            style={[styles.icon, stateIsActive && styles.active]}
          />
        )}
      </View>
      <View style={styles.textArea}>
        <Text style={[styles.text, stateIsActive && styles.activeText]}>
          {isLocalBackendButton ? LOCAL_MODE_LABELL : EXTERNAL_MODE_LABALE}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 2,
    height: 250,
    maxWidth: 250,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#CCCCCC',
    borderColor: '#C0C0C0',
  },
  iconArea: {
    height: 150,
  },
  icon: {
    fill: '#999999',
  },
  textArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#999999',
    fontSize: 20,
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: '#32C832',
    borderColor: '#24C024',
    fill: '#128725',
  },
  activeText: {
    color: '#128725',
  },
});

export default ButtonBackendType;
