import { Text, View } from 'react-native';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { recordedSessionsService } from 'src/services/recordedSessionsService';
import { SessionSummary } from './SessionSummary';
import { useEffect, useState } from 'react';
import { textStyles } from '@styles/textStyles';
import { Session } from '@class/session/Session';

export const BoxSessionViewer = () => {

  /**
   * States
   */
  const [hasSelectedSessions, setHasSelectedSessions] = useState<boolean>(
    recordedSessionsService.hasSelectedSession
  );
  const [displayedSession, setDisplayedSession] = useState<Session>(
    recordedSessionsService.selectedSessions[0]
  );

  /**
   * Effects
   */
  useEffect(() => {
    const subscription = recordedSessionsService.subscribeToSelectedSessions(() => {
      setHasSelectedSessions(recordedSessionsService.hasSelectedSession);
      setDisplayedSession(recordedSessionsService.selectedSessions[
        recordedSessionsService.selectedSessions.length - 1
      ]);
    });
    return () => { subscription.unsubscribe() };
  }, []);

  /**
   * Render
   */
  return (
    <AccordionBoxContainer title='Session Viewer'>
      {hasSelectedSessions ?
        <SessionSummary session={displayedSession}/> :
        <View>
          <Text style={textStyles.default}>
            {'No session is selected'}
          </Text>
        </View>
      }
    </AccordionBoxContainer>
  );
};