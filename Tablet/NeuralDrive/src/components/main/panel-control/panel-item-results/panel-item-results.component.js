import React from 'react';

import ItemContentVizualizationParamters from "./section-vizualization-parameters.component";
import PanelItem from '../../panel-item.component';

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
      <ItemContentVizualizationParamters />
    </PanelItem>
  );
};

export default PanelItemResults;