import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Stopwatch } from 'react-native-stopwatch-timer';

import PanelItem from '../../panel-item.component';
import { postStartNewSession } from "../../../../services/http-request.service";

import * as problemDimensionService from "../../../../services/problem-dimension.service";
import * as Structures from "../../../Structures";

const ITEM_TITLE = "Session Management";

const PanelItemSession = () => {

  const [value, setValue] = React.useState(0);

  // stopwatch
  const [sessionStarted, setSessionStarted] = React.useState(false);
  const [stopwatchReset, setStopwatchReset] = React.useState(false);

  /**
   * Render
   */
  return (
    <PanelItem
      isActive={true}
      title={ITEM_TITLE}
    >
      <Structures.FlexContainer
        flexDirection="column"
        alignItems="center"
        height="125px"
        bgColor="#00000000">
        <Button
          icon={sessionStarted ? 'stop' : 'play'}
          mode="elevated"
          buttonColor={sessionStarted ? '#CC958F' : '#A3D9A3'}
          dark={false}
          loading={false}
          onPress={async () => {
            let status = await postStartNewSession(
              problemDimensionService.getProblemDimension(),
            );
            console.log('status = ', status);
            session_status = status;
            setValue(value => value + 1);

            // stopwatch
            setSessionStarted(!sessionStarted);

            if (sessionStarted) {
              // TODO: get start time
              // time = getTime()
            } else {
              // TODO: get end time
              // time = getTime()
              setStopwatchReset(true);
              setStopwatchReset(false);
            }
          }}
          uppercase={true}
          style={{ height: 40 }}>
          <Text
            variant="labelLarge"
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {!sessionStarted ? 'start session' : 'stop session'}
          </Text>
        </Button>
        <Stopwatch
          start={sessionStarted}
          reset={stopwatchReset}
          options={styles.stopwatchOptions}
        />
      </Structures.FlexContainer>
    </PanelItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  startSurface: {
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 15,
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  stopwatchOptions: {
    container: {
      backgroundColor: '#00000000',
      padding: 0,
      borderRadius: 15,
      width: 150,
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      color: '#000',
    },
  },
});

export default PanelItemSession;