import { useEffect, useRef, useState } from 'react';
import { DataTable } from '@components/data/boxDataTable/DataTable';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { recordedSessionsService } from 'src/services/recordedSessionsService';
import { Button, Text } from 'react-native-paper';
import { buttonStyles } from '@styles/buttonStyles';
import { StyleSheet, View } from 'react-native';
import DialogDeleteSessions from '../dialog/DialogDeleteSessions';

export const BoxDataTable = () => {

  /**
   * Referemces
   */
  const dialogDeleteSessionsRef = useRef<any>();

  /**
   * State
   */
  const [hasSelectedSession, setHasSelectedSessions] = useState<boolean>(
    recordedSessionsService.hasSelectedSession
  );
  const [selectedSessionsCount, setSelectedSessionsCount] = useState<number>(
    recordedSessionsService.selectedSessionsCount
  )

  /**
   * Function
   */
  const unselectSessions = () => {
    recordedSessionsService.unselectAll();
  }

  const deleteSessions = () => {
    dialogDeleteSessionsRef.current?.showDialog();
  }

  /**
   * Effects
   */
  useEffect(() => {
    const subscription = recordedSessionsService.subscribeToSelectedSessions(() => {
      setHasSelectedSessions(recordedSessionsService.hasSelectedSession);
      setSelectedSessionsCount(recordedSessionsService.selectedSessionsCount);
    });
    return () => { subscription.unsubscribe() };
  }, []);

  /**
   * Render
   */
  return (
    <AccordionBoxContainer title='Sessions Recorded'>
      <DataTable />
      {hasSelectedSession &&
        <View style={styles.buttons}>
          <Button
            mode="elevated"
            style={buttonStyles.normal}
            onPress={() => { unselectSessions() }}
          >
            <Text>UNSELECT</Text>
          </Button>
          <Button
            mode="elevated"
            style={buttonStyles.important}
            onPress={() => { deleteSessions() }}
          >
            <Text>DELETE ({selectedSessionsCount})</Text>
          </Button>
        </View>
      }
      <DialogDeleteSessions ref={dialogDeleteSessionsRef} />
    </AccordionBoxContainer>
  );
};

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  }
})