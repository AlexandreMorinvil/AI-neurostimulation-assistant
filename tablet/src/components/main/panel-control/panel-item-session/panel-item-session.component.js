import React from 'react';
import { StyleSheet } from 'react-native';

import PanelItem from '../../panel-item.component';
import SectionConnectionStatus from './section-connection-status.component';
import SectionSessionManager from './SectionSessionManager';

const ITEM_TITLE = "Session Management";

const PanelItemSession = () => {

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <SectionConnectionStatus style={styles.spacing} />
      <SectionSessionManager />
    </PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10
  }
});

export default PanelItemSession;