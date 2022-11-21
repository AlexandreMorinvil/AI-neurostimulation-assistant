import React from 'react';
import { StyleSheet } from 'react-native';

import IndicatorConnection from "./indicator-connection.component";
import PanelItem from '../../panel-item.component';
import { get_smartwatch_connected } from "../../../../class/const";
import { get_watch_data } from "../../../../class/http";

import * as Structures from "../../../Structures";

smartwatch_connected = false;

const ITEM_TITLE = "Connection Status";

const PanelItemConnection = () => {
  const [value2, setValue2] = React.useState(0);
  React.useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
      smartwatch_connected = get_smartwatch_connected();
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
      <Structures.FlexContainer flex={0.7}
        flexDirection={'column'}
        jc={'flex-start'}
        alignItems="center"
        pad="0"
        bgColor={'#00000000'}>
        <IndicatorConnection
          device={'server'}
          checkConnectionFunction={get_watch_data}
        />
        <IndicatorConnection
          device={'watch'}
          checkConnectionFunction={get_smartwatch_connected}
        />
      </Structures.FlexContainer>
    </PanelItem>
  );
};

export default PanelItemConnection;