import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PanelItem from '../../panel-item.component';
import * as tremorPointService from "../../../../services/tremor-point.service";

const ITEM_TITLE = "Statistics";

const TITLE_TREMOR_METRIC = "Average Tremor";
const UNIT_TREMOR_METRIC = "m/s²";

const PanelItemStatistics = () => {

  /**
   * States
   */
  const [stateTremorMetric, setStateTremorMetric] = useState(0);

  /**
   * Function 
   */
  const updateStatistics = () => {
    setStateTremorMetric(tremorPointService.getTremorMetricToDisplay());
  }

  /**
   * Effects
   */
  useEffect(() => {
    // Initilization
    updateStatistics();

    // Reactive subcribtion
    const subscription = tremorPointService.subject.subscribe({
      next: updateStatistics
    });
    
    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, []);

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <View>
        <Text> {TITLE_TREMOR_METRIC} {stateTremorMetric} {UNIT_TREMOR_METRIC} </Text>
      </View>
    </PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({

});

export default PanelItemStatistics;