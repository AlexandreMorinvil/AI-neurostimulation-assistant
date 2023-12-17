import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";

import { settingsStyles } from "../../../styles/settings.styles";
import { textStyles } from "src/styles";

type Props = {
  initialIpAddress?: string,
  setInputIpAddress?: (ipAddress: string) => void,
  style: ViewStyle,
}

const InputIpAddress = (props: Props) => {

  /**
   * Constants
   */
  const IP_ADDREES_OCTET_PLACEHOLDER = '255';
  const DEFAULT_IP_ADDESS = '255.255.255.255';

  /**
   * States
   */
  const [stateInputIpFirstOctet, setStateInputIpFirstOctet] = useState<string>('');
  const [stateInputIpSecondOctet, setStateInputIpSecondOctet] = useState<string>('');
  const [stateInputIpThirdOctet, setStateInputIpThirdOctet] = useState<string>('');
  const [stateInputIpFourthOctet, setStateInputIpFourthOctet] = useState<string>('');

  /**
   * Functions
   */
  const getIpAddress = (): string => {
    return `${stateInputIpFirstOctet}.` +
      `${stateInputIpSecondOctet}.` +
      `${stateInputIpThirdOctet}.` +
      `${stateInputIpFourthOctet}`;
  }

  const isIpAddressValid = (): boolean => {
    const ipAddress = getIpAddress();
    return (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ipAddress))
  }

  const isIpOctetValueValid = (octetNumber: string): boolean => {
    const isWithinAcceptableBounds = Number(octetNumber) >= 0 && Number(octetNumber) <= 255;
    const isEmpty = octetNumber === "";
    return isWithinAcceptableBounds || isEmpty;
  }

  const updateFirstIpOctetValue = (octetNumber: string): void => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpFirstOctet(octetNumber);
  }

  const updateSecondIpOctetValue = (octetNumber: string): void => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpSecondOctet(octetNumber);
  }

  const updateThirdIpOctetValue = (octetNumber: string): void => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpThirdOctet(octetNumber);
  }

  const updateFourthIpOctetValue = (octetNumber: string): void => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpFourthOctet(octetNumber);
  }

  const setInputsFromIpAddress = (ipAddress: string): void => {
    const octetsList = ipAddress.split(".");
    updateFirstIpOctetValue(octetsList[0]);
    updateSecondIpOctetValue(octetsList[1]);
    updateThirdIpOctetValue(octetsList[2]);
    updateFourthIpOctetValue(octetsList[3]);
  }

  /**
   * Effects
   */
  useEffect(() => {
    if(!isIpAddressValid()) return;
    props.setInputIpAddress && props.setInputIpAddress(getIpAddress());
  }, [
    stateInputIpFirstOctet, 
    stateInputIpSecondOctet, 
    stateInputIpThirdOctet, 
    stateInputIpFourthOctet
  ]);

  useEffect(() => {
    if (props.initialIpAddress)
      setInputsFromIpAddress(props.initialIpAddress);
    else
      setInputsFromIpAddress(DEFAULT_IP_ADDESS);
  }, [props.initialIpAddress]);

  /**
   * Render
   */
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={[settingsStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpFirstOctet}
        onChangeText={updateFirstIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={styles.pointArea}>
        <Text style={textStyles.default}> {"."} </Text>
      </View>
      <TextInput
        style={[settingsStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpSecondOctet}
        onChangeText={updateSecondIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={styles.pointArea}>
        <Text style={textStyles.default}> {"."} </Text>
      </View>
      <TextInput
        style={[settingsStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpThirdOctet}
        onChangeText={updateThirdIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={styles.pointArea}>
        <Text style={textStyles.default}> {"."} </Text>
      </View>
      <TextInput
        style={[settingsStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpFourthOctet}
        onChangeText={updateFourthIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  pointArea: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  octetInput: {
    width: 100,
    borderRadius: 5,
  },
});

export default InputIpAddress;