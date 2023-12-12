import DialogConcludeSession from '@components/main/dialog/DialogConcludeSession';
import DialogStartSession from '@components/main/dialog/DialogStartSession';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Stopwatch } from '@components/utils/time/Stopwatch';
import { stylesButton } from '@styles/buttonStyles';
import { sessionService } from 'src/services/sessionService';

export const SectionSessionStarter = () => {

  /**
   * Referemces
   */
  const dialogStartSessionRef = useRef<any>();
  const dialogConcludeSessionRef = useRef<any>();

  /**
   * States
   */
  const [sessionStarted, setSessionStarted] = useState(false);
  const [stopwatchReset, setStopwatchReset] = useState(false);

  /**
   * Functions
   */
  const showDialogStartSessionRef = () => {
    dialogStartSessionRef.current?.showDialog();
  }

  const showDialogConcludeSessionRef = () => {
    dialogConcludeSessionRef.current?.showDialog();
  }

  const showDialog = () => {
    if (sessionService.isSessionInProgress)
      showDialogConcludeSessionRef();
    else
      showDialogStartSessionRef();
  }

  /**
   * Effects
   */
  useEffect(() => {
    const subscription = sessionService.subscribeToSessionStatus((isSessionInProgress) => {
      setSessionStarted(isSessionInProgress);
    })
    return () => { subscription.unsubscribe() };
  }, []);


  /**
   * Render
   */
  return (
    // TODO: Separate the Stopwatch code from the Start button code
    <View style={styles.container}>
      <Stopwatch
        start={sessionStarted}
        reset={stopwatchReset}
      />
      <Button
        mode="elevated"
        style={sessionStarted ? stylesButton.important : stylesButton.highlighted}
        onPress={showDialog}
      >
        <Text variant="labelLarge">
          {sessionStarted ? 'STOP SESSION' : 'START SESSION'}
        </Text>
      </Button>
      <DialogStartSession ref={dialogStartSessionRef} />
      <DialogConcludeSession ref={dialogConcludeSessionRef} />
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
    alignItems: 'center',
  },
});
