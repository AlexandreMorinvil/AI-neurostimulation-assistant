import { Text, View } from 'react-native';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { recordedSessionsService } from 'src/services/recordedSessionsService';
import { SessionSummary } from './SessionSummary';
import { useState } from 'react';
import { textStyles } from '@styles/textStyles';

export const BoxSessionViewer = () => {


  /**
   * States
   */
  const [hasSelectedSessions, setHasSelectedSessions] = useState<boolean>(
    recordedSessionsService.hasSelectedSession
  );

  /**
   * Render
   */
  return (
    <AccordionBoxContainer title='Session Viewer'>
      {hasSelectedSessions ?
        <SessionSummary /> :
        <View>
          <Text style={textStyles.default}>
            {'No session is selected'}
          </Text>
        </View>
      }
    </AccordionBoxContainer>
  );
};