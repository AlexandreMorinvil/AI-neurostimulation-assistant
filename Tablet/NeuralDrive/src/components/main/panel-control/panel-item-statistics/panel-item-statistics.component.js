import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import * as Structures from "../../../Structures";

patient_level = 10;

const PanelItemStatistics = () => {
  const [value2, setValue2] = React.useState(0);
  React.useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
    }, 1000);

    return () => clearInterval(interval2);
  }, [value2]);

  /**
   * Render
   */
  return (
    <Surface style={styles.watchSurface} elevation={1}>
      <Structures.FlexContainer
        flex={0.3}
        marg={'0px'}
        pad={'0px 0px 0px 8px'}
        bgColor={'#8a8a8a'}
        borderRadius={'15px'}>
        <Text variant="titleLarge"> Watch Info</Text>
      </Structures.FlexContainer>
      <Structures.FlexContainer flex={0.7}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <Text variant="headlineLarge" style={{ marginTop: 30 }}>
          {' '}
          <Text variant="headlineSmall"> Average Tremor: </Text> {patient_level}
        </Text>
      </Structures.FlexContainer>
    </Surface>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  watchSurface: {
    margin: 10,
    padding: 8,
    height: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
});

export default PanelItemStatistics;