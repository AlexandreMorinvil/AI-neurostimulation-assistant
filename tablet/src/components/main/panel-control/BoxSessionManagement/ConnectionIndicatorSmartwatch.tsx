import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { smartwatchService } from "src/services/smartwatchService";
import { COLOR_ICON } from '@styles/colorStyles';
import { textStyles } from '@styles/textStyles';

type Props = {
  iconSize?: number;
};

export const SmartWatchConnectionIndicator = (props: Props) => {

  /**
   * Constants
   */
  const iconSize: number = props.iconSize || 50;
  const deviceName: string = "Smartwatch";
  const connectedText: string = "Connected";
  const disconnectedText: string = "Disconnected";

  /**
   * States
   */
  const [isConnected, setIsConnected] = useState<boolean>(smartwatchService.isConnected);

  /**
   * Effects 
   */
  useEffect(() => {
    const subscription = smartwatchService.subscribeToConnectionStatus((isConnected) => {
      setIsConnected(isConnected);
    });
    return () => { subscription.unsubscribe() };
  }, []);

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <Ionicons
        name="watch"
        color={isConnected ? COLOR_ICON.fine : COLOR_ICON.innactive}
        size={iconSize}
      />
      <Text style={[
        styles.text,
        { color: isConnected ? COLOR_ICON.fine : COLOR_ICON.innactive }
      ]}>
        {isConnected ? connectedText : disconnectedText}
      </Text>
      <Text style={[styles.text, textStyles.default]}>
        {deviceName}
      </Text>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: 'bold',
  },
});