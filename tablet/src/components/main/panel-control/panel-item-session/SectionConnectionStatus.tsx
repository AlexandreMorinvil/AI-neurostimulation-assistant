
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SmartWatchConnectionIndicator } from './SmartwatchConnectionIndicator';
import { COLOR_BACKGROUND } from '@styles/colorStyles';

export const SectionConnectionStatus = (props: Props) => {

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <SmartWatchConnectionIndicator />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND.ItemSection,
    borderRadius: 10,
    padding: 10,
  },
});

type Props = {
  style?: StyleProp<ViewStyle>
}