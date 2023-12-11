import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { networkService } from 'src/services/networkService';
import { COLOR_ICON } from '@styles/colorStyles';

type Props = {
  iconSize?: number;
};

export const ConnectionIndicatorNetwork = (props: Props) => {

  /**
   * Constants
   */
  const iconSize: number = props.iconSize || 50;
  const deviceName: string = "Network";
  const connectedText: string = "Connected";
  const disconnectedText: string = "Disconnected";

  /**
   * States
   */
  const [isConnected, setIsConnected] = useState<boolean>(networkService.isConnected);

  /**
   * Effects 
   */
  useEffect(() => {
    const subscription = networkService.subscribeToConnectionStatus((isConnected) => {
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
        name="wifi"
        color={isConnected ? COLOR_ICON.fine : COLOR_ICON.innactive}
        size={iconSize}
      />
      <Text style={[
        styles.text,
        { color: isConnected ? COLOR_ICON.fine : COLOR_ICON.innactive }
      ]}>
        {isConnected ? connectedText : disconnectedText}
      </Text>
      <Text style={styles.text}>
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