import React from 'react';
import { StyleSheet } from 'react-native';

import ItemContentVizualizationParamters from "./section-vizualization-parameters.component";
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import SectionQuriesHistory from './section-queries-history.component';

const ITEM_TITLE = "Query Results";

const PanelItemResults = () => {

  /**
   * Render
   */
  return (
    <AccordionBoxContainer
      isActive={true}
      title={ITEM_TITLE}
    >
      <ItemContentVizualizationParamters style={styles.spacing} />
      <SectionQuriesHistory />
    </AccordionBoxContainer>
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