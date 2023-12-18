import { useEffect, useState } from 'react';
import { DataTable } from '@components/data/boxDataTable/DataTable';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { recordedSessionsService } from 'src/services/recordedSessionsService';
import { Button, Text } from 'react-native-paper';
import { buttonStyles } from '@styles/buttonStyles';
import { StyleSheet, View } from 'react-native';

export const BoxDataTable = () => {

  /**
   * State
   */
  const [hasSelectedSession, setHasSelectedSessions] = useState<boolean>(
    recordedSessionsService.hasSelectedSession
  );

  /**
   * Function
   */
  const unselectAll = () => {
    recordedSessionsService.unselectAll();
  }

  /**
   * Effects
   */
  useEffect(() => {
    const subscription = recordedSessionsService.subscribeToSelectedSessions(() => {
      setHasSelectedSessions(recordedSessionsService.hasSelectedSession)
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
        <View style={styles.centering}>
          <Button
            mode="elevated"
            style={buttonStyles.normal}
            onPress={() => { unselectAll() }}
          >
            <Text>UNSELECT ALL</Text>
          </Button>
        </View>
      }
    </AccordionBoxContainer>
  );
};

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  centering: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})