import React from 'react';
import { StyleSheet } from 'react-native';

import ItemContentVizualizationParamters from "./section-vizualization-parameters.component";
import PanelItem from '../../panel-item.component';
import SectionQuriesHistory from './section-queries-history.component';

const ITEM_TITLE = "Query Results";

const PanelItemResults = () => {

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <ItemContentVizualizationParamters style={styles.spacing} />
      <SectionQuriesHistory />
    </PanelItem>
  );
};


/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10
  },
});

export default PanelItemResults;