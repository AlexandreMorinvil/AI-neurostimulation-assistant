import { useEffect, useState } from 'react';
import { Stopwatch } from '@components/utils/time/Stopwatch';
import { sessionService } from 'src/services/sessionService';

export const SessionStopWatch = () => {

  /**
   * States
   */
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [mustReset, setMustReset] = useState<boolean>(false);

  /**
   * Functions
   */
  const toggleStopWatch = (isSessionStarted: boolean) => {
    setIsSessionStarted(isSessionStarted);
    setMustReset(!isSessionStarted);
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
      start={isSessionStarted}
      reset={mustReset}
    />
  );
};