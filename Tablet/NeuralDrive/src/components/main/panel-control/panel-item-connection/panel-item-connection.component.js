import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import IndicatorConnection from "./indicator-connection.component";
import { get_smartwatch_connected } from "../../../../class/const";
import { get_watch_data } from "../../../../class/http";

import * as Structures from "../../../Structures";

smartwatch_connected = false;

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
    <Surface style={styles.watchSurface} elevation={1}>
      <Structures.FlexContainer
        flex={0.3}
        marg={'0px'}
        pad={'0px 0px 0px 8px'}
        bgColor={'#8a8a8a'}
        borderRadius={'15px'}>
        <Text variant="titleLarge"> Connection Info</Text>
      </Structures.FlexContainer>
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
    </Surface>
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

export default PanelItemConnection;