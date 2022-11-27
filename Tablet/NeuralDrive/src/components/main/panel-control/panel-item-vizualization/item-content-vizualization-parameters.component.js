import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import * as Structures from "../../../Structures";
import * as queryVizualizationService from "../../../../services/query-vizualization.service";

const ItemContentVizualizationParameters = () => {

  /**
   * States
   */
  // TODO : Intégrate the values of the "problem-diension.service" once it is properly implemented
  const [stateFirstSelectedParameter, setStateFirstSelectedParameter] = useState(0);
  const gaussianGraphSelectionParam = [
    { key: 0, value: 'A' },
    { key: 1, value: 'B' },
  ];

  /**
   * Function 
   */
  const commitFirstSelectedParameter = (key) => {
    queryVizualizationService.setFirstSelectedParameter(key)
  }

  /**
   * Render
   */
  return (
    <View>
      <Structures.FlexContainer flex={0.2} jc="space-around" bgColor="00000000">
        <Text variant="titleMedium"> 2D Gaussian parameter</Text>
      </Structures.FlexContainer>
      <SelectList
        setSelected={setStateFirstSelectedParameter}
        data={gaussianGraphSelectionParam}
        save="key"
        dropdownTextStyles={{ color: "black" }}
        onSelect={() => commitFirstSelectedParameter(stateFirstSelectedParameter)}
      />
    </View>
  );
};

export default ItemContentVizualizationParameters;