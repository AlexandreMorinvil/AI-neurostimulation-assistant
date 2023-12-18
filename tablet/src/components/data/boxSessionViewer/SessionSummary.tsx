import { Session } from '@class/session/Session';
import { textStyles } from '@styles/textStyles';
import { formatTimeString } from '@utils/timeFormat';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { databaseService } from 'src/services/databaseService';
import { sessionService } from 'src/services/sessionService';

type Props = {
  session: Session,
}

export const SessionSummary = (props: Props) => {

  /**
   * Constants
   */
  const locale: string|undefined = 'EN-UK'; // Will set to the locale of the host machine
  const dateFormmatingOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };


  /**
   * States
   */
  const [session, setSession] = useState(props.session);

  /**
   * Functions
   */
  const getFormattedId = (session: Session): string => {
    return session.id.toString();
  }

  const getFormattedStartDate = (session: Session): string => {
    return session.dateStart.toLocaleDateString(locale, dateFormmatingOptions);
  }

  const getFormattedCompletionDate = (session: Session): string => {
    return session.dateCompletion ?
      session.dateCompletion.toLocaleDateString(locale, dateFormmatingOptions) : 
      'Not completed';
  }

  const getFormattedDuration = (session: Session): string => {
    const duration = session.duration;
    return duration ? formatTimeString(duration) : 'Unknown';
  }

  const getFormattedIsCompleted = (session: Session): string => {
    if (sessionService.correspondsToActiveSession(session)) return 'Active';
    return session.isSessionConcluded ? 'Complete' : 'Incomplete';
  }

  const getAccelerometerPointsCount = (session: Session): number => {
    return databaseService.getAccelerometerPointsCountForSession(session.id);
  }

  const getGyroscopePointsCount = (session: Session): number => {
    return databaseService.getGyroscopePointsCountForSession(session.id);
  }


  /**
   * Effects
   */
  useEffect(() => {
    setSession(props.session);
  }, [props.session]);

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <View style={styles.labelKey}>
        <Text style={textStyles.defaultBold}>ID:</Text>
        <Text style={textStyles.defaultBold}>Start:</Text>
        <Text style={textStyles.defaultBold}>Completion:</Text>
        <Text style={textStyles.defaultBold}>Duration:</Text>
        <Text style={textStyles.defaultBold}>Status:</Text>
        <Text style={textStyles.defaultBold}>Number accelerometer points:</Text>
        <Text style={textStyles.defaultBold}>Number gyroscope points:</Text>
      </View>
      <View style={styles.labelKey}>
        <Text style={textStyles.default}>{getFormattedId(session)}</Text>
        <Text style={textStyles.default}>{getFormattedStartDate(session)}</Text>
        <Text style={textStyles.default}>{getFormattedCompletionDate(session)}</Text>
        <Text style={textStyles.default}>{getFormattedDuration(session)}</Text>
        <Text style={textStyles.default}>{getFormattedIsCompleted(session)}</Text>
        <Text style={textStyles.default}>{getAccelerometerPointsCount(session)}</Text>
        <Text style={textStyles.default}>{getGyroscopePointsCount(session)}</Text>
      </View>
    </View>
  );
};

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  labelKey: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  }
});