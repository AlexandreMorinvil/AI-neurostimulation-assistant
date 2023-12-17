import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { settingsStyles } from "../../../styles/settings.styles";
import { SettingsMessageType } from '../../../const/settings';
import { textStyles } from "../../../styles/textStyles";

import MessageBubble from "@components/utils/container/MessageBubble";
import InputIpAddress from "@components/utils/input/InputIpAddress";
import { networkService } from "src/services/networkService";
import { Subscription } from "rxjs";
import { Button } from "react-native-paper";
import { stylesButton } from "@styles/buttonStyles";


export const SectionSmartwatchConnection = () => {

  /**
   * Constants
   */
  const SECTION_TITLE = "Smartwatch address"
  const MESSAGE_INSERT_WATCH_IP_ADDRESS = "Insert the IP address of the smartwatch.";
  const MESSAGE_NO_WIFI =
    "Currently the tablet it not connected to any Wi-Fi network. The connection to the " +
    "smartwatch cannot be established without a connection to the same Wi-Fi network as the " +
    "smartwatch.";

  /**
   * States
   */
  const [hasInputChanged, setHasInputChanged] = useState<boolean>(false);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isConnectedToNetwork, setIsConnectedToNetwork] = useState<boolean>(
    networkService.isConnected
  );

  /**
   * Functions
   */
  const getIpAddress = (ipAddress: string): void => {
    setIpAddress(ipAddress);
  }

  const confirmIpAddress = (): void => {
    // TODO: To implement.
    console.log('Confirm Ip address');
  }

  const undoChange = (): void => {
    // TODO: To implement.
    console.log('Undo changes');
  }

  const updateHasInputChanged = (): void => {
    // TODO: To implement.
    console.log('Has input changed');
  }

  /**
   * Effects
   */
  useEffect(() => {
    const subscription: Subscription = networkService.subscribeToConnectionStatus((isOnNetwork) => {
      setIsConnectedToNetwork(isOnNetwork);
    });
    return () => { subscription.unsubscribe() };
  }, []);

  useEffect(() => {
    // TODO: To implement.
    updateHasInputChanged();
  }, [ipAddress]);

  /**
   * Render
   */
  return (
    <View style={settingsStyles.sectionContent}>
      <View style={settingsStyles.sectionTitleArea}>
        <Text style={[textStyles.default, settingsStyles.sectionTitle]}> {SECTION_TITLE} </Text>
      </View>
      <Text style={textStyles.default}> {MESSAGE_INSERT_WATCH_IP_ADDRESS} </Text>
      <InputIpAddress
        style={styles.topSpacing}
        setInputIpAddress={getIpAddress}
      />
      {
        !isConnectedToNetwork &&
        <MessageBubble
          style={styles.topSpacing}
          type={SettingsMessageType.WARNING}
          message={MESSAGE_NO_WIFI}
        />
      }
      {
        hasInputChanged &&
        <View style={styles.buttonsArea}>
          <Button
            mode="elevated"
            style={[styles.topSpacing, stylesButton.normal]}
            onPress={undoChange}
          >
            <Text style={textStyles.buttonText}>UNDO</Text>
          </Button>

          <Button
            mode="elevated"
            style={[styles.topSpacing, stylesButton.normal]}
            onPress={confirmIpAddress}
          >
            <Text style={textStyles.buttonText}>CONFIRM</Text>
          </Button>
        </View>
      }

    </View >
  );
};

const styles = StyleSheet.create({
  topSpacing: {
    marginTop: 20,
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  }
});