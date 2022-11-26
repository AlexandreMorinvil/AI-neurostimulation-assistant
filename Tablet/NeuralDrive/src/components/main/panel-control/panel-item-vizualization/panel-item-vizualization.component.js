import React from 'react';

import ItemContentVizualizationParamters from "./item-content-vizualization-parameters.component";
import PanelItem from '../../panel-item.component';

const ITEM_TITLE = "Vizualization Status";

const PanelItemVizualizationStatus = () => {

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

export default PanelItemVizualizationStatus;