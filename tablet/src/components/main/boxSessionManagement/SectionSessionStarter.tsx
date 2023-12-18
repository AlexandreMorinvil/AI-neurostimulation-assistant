import { StyleSheet, View } from 'react-native';
import { ButtonSessionStarter } from './ButtonSessionStarter';
import { SessionStopWatch } from './SessionStopWatch';

export const SectionSessionStarter = () => {

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <SessionStopWatch />
      <ButtonSessionStarter />
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
