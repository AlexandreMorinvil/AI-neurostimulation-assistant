import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import PanelItem from '../../panel-item.component';

import * as Structures from "../../../Structures";

patient_level = 10;

const ITEM_TITLE = "Statistics";

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
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <Structures.FlexContainer flex={0.7} height={100}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <Text variant="headlineLarge" style={{ marginTop: 30 }}>
          <Text variant="headlineSmall"> Average Tremor: </Text> {patient_level}
        </Text>
      </Structures.FlexContainer>
    </PanelItem>
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