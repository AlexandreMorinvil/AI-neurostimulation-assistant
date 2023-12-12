import { useEffect, useState } from 'react';
import { Stopwatch } from '@components/utils/time/Stopwatch';
import { sessionService } from 'src/services/sessionService';

export const SessionStopWatch = () => {

  /**
   * States
   */
  const [sessionStarted, setSessionStarted] = useState(false);

  /**
   * Functions
   */
  const toggleStopWatch = (isSessionStarted: boolean) => {
    setSessionStarted(isSessionStarted);
  };

  /**
   * Effects
   */
  useEffect(() => {
    const subscription = sessionService.subscribeToSessionStatus((isSessionInProgress) => {
      toggleStopWatch(isSessionInProgress);
    });
    return () => { subscription.unsubscribe() };
  }, []);

  /**
   * Render
   */
  return (
    <Stopwatch
      start={sessionStarted}
    />
  );
};