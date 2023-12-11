import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Stopwatch } from '@components/utils/time/Stopwatch';
import DialogSaveSession from './dialog-save-session/dialog-save-session';

const SectionSessionStarter = () => {

  // Stopwatch
  const [sessionStarted, setSessionStarted] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);

  // Reference to dialog when session ends
  const dialogRef = useRef();

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <Stopwatch
        start={sessionStarted}
        reset={stopwatchReset}
        options={styles.stopwatchOptions}
      />
      <Button
        mode="elevated"
        buttonColor={sessionStarted ? '#CC958F' : '#A3D9A3'}
        dark={false}
        loading={false}
        onPress={async () => {
          // stopwatch
          if (sessionStarted) {
            setSessionStarted(false);
            setStopwatchReset(true);
          } else {
            setStopwatchReset(false);
            setSessionStarted(true);
          }
        }}>
        <Text variant="labelLarge">
          {sessionStarted ? 'STOP SESSION' : 'START SESSION'}
        </Text>
      </Button>
      <DialogSaveSession ref={dialogRef}></DialogSaveSession>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 10,
  },
});

export default SectionSessionStarter;
