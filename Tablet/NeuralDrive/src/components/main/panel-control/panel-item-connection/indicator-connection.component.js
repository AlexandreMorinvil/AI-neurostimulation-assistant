import React from 'react';
import { View } from "react-native";
import { BarIndicator } from 'react-native-indicators';
import { Text } from 'react-native-paper';

const IndicatorConnection = ({ device, checkConnectionFunction }) => {
  const [connectionStatus, setConnectionStatus] = React.useState(
    'Not Connected to ' + device,
  );
  const [indicatorColor, setIndicadorColor] = React.useState('#CC958F');

  React.useEffect(() => {
    const interval = setInterval(async () => {
      smartwatch_connected = checkConnectionFunction();// await checkConnectionFunction();
      if (smartwatch_connected) {
        setConnectionStatus('Connected to ' + device);
        setIndicadorColor('#A3D9A3');
      } else {
        setConnectionStatus('Not Connected to ' + device);
        setIndicadorColor('#CC958F');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Render
   */
  return (
    <View style={{ flexDirection: 'row' }}>
      <BarIndicator
        count={4}
        color={indicatorColor}
        size={20}
        style={{ flex: 0.1, paddingRight: 20 }}
      />

      <Text variant="titleLarge" adjustsFontSizeToFit={true}>
        {connectionStatus}
      </Text>
    </View>
  );
};

export default IndicatorConnection;