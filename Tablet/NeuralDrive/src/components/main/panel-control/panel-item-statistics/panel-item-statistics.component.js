import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import PanelItem from '../../panel-item.component';

patient_level = 10;

const ITEM_TITLE = "Statistics";

const TITLE_TREMOR_METRIC = "Average Tremor";
const UNIT_TREMOR_METRIC = "m/s²";

const PanelItemStatistics = () => {
  const [stateTremorMetric, setStateTremorMetric] = useState();

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <Text variant="headlineSmall"> {TITLE_TREMOR_METRIC} {stateTremorMetric} {UNIT_TREMOR_METRIC} </Text>
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