
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SmartWatchConnectionIndicator } from './ConnectionIndicatorSmartwatch';
import { COLOR_BACKGROUND } from '@styles/colorStyles';
import { ConnectionIndicatorNetwork } from './ConnectionIndicatorNetwork';

type Props = {
  style?: StyleProp<ViewStyle>
}

export const SectionConnectionStatus = (props: Props) => {

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
        <ConnectionIndicatorNetwork />
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