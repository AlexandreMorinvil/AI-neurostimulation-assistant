import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { boxContentStyles } from "../../../styles/boxContentStyles";
import { inputStyles, textStyles } from "src/styles";

const IP_ADDREES_OCTET_PLACEHOLDER = "255";

const InputIpAddress = ({ setParentInputIpAddressFunction, setParentIsInputIpAddressValidFunction, ...props }) => {

  /**
   * Props
   */
  const { initialIpAddress, style } = props;

  /**
   * States
   */
  const [stateInputIpFirstOctet, setStateInputIpFirstOctet] = useState("");
  const [stateInputIpSecondOctet, setStateInputIpSecondOctet] = useState("");
  const [stateInputIpThirdOctet, setStateInputIpThirdOctet] = useState("");
  const [stateInputIpFourthOctet, setStateInputIpFourthOctet] = useState("");

  /**
   * Functions
   */
  setParentInputIpAddressFunction = setParentInputIpAddressFunction ? setParentInputIpAddressFunction : () => { };
  setParentIsInputIpAddressValidFunction = setParentIsInputIpAddressValidFunction ? setParentIsInputIpAddressValidFunction : () => { };

  const getIpAddress = () => {
    return `${stateInputIpFirstOctet}.${stateInputIpSecondOctet}.${stateInputIpThirdOctet}.${stateInputIpFourthOctet}`
  }

  const isIpAddressValid = () => {
    const ipAddress = getIpAddress();
    return (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ipAddress))
  }

  const isIpOctetValueValid = (octetNumber) => {
    const isWithinAcceptableBounds = Number(octetNumber) >= 0 && Number(octetNumber) <= 255;
    const isEmpty = octetNumber === "";
    return isWithinAcceptableBounds || isEmpty;
  }

  const updateFirstIpOctetValue = (octetNumber) => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpFirstOctet(octetNumber);
  }

  const updateSecondIpOctetValue = (octetNumber) => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpSecondOctet(octetNumber);
  }

  const updateThirdIpOctetValue = (octetNumber) => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpThirdOctet(octetNumber);
  }

  const updateFourthIpOctetValue = (octetNumber) => {
    if (isIpOctetValueValid(octetNumber))
      setStateInputIpFourthOctet(octetNumber);
  }

  const setInputsFromIpAddress = (ipAddress) => {
    octetsList = ipAddress.split(".");
    updateFirstIpOctetValue(octetsList[0]);
    updateSecondIpOctetValue(octetsList[1]);
    updateThirdIpOctetValue(octetsList[2]);
    updateFourthIpOctetValue(octetsList[3]);
  }


  /**
   * Effects
   */
  useEffect(() => {
    setParentInputIpAddressFunction(getIpAddress());
    setParentIsInputIpAddressValidFunction(isIpAddressValid());
  }, [stateInputIpFirstOctet, stateInputIpSecondOctet, stateInputIpThirdOctet, stateInputIpFourthOctet]);

  useEffect(() => {
    setInputsFromIpAddress(props.initialIpAddress);
  }, []);

  /**
   * Render
   */
  return (
    <View style={[boxContentStyles.sectionContent, styles.container, props.style]}>
      <TextInput
        style={[inputStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpFirstOctet}
        onChangeText={updateFirstIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={[textStyles.default, styles.pointArea]}>
        <Text> {"."} </Text>
      </View>
      <TextInput
        style={[inputStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpSecondOctet}
        onChangeText={updateSecondIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={[textStyles.default, styles.pointArea]}>
        <Text> {"."} </Text>
      </View>
      <TextInput
        style={[inputStyles.textInput, textStyles.default, styles.octetInput]}
        value={stateInputIpThirdOctet}
        onChangeText={updateThirdIpOctetValue}
        placeholder={IP_ADDREES_OCTET_PLACEHOLDER}
        keyboardType="numeric"
      />
      <View style={[textStyles.default, styles.pointArea]}>
        <Text> {"."} </Text>
      </View>
      <TextInput
        style={[inputStyles.textInput, textStyles.default, styles.octetInput]}
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
  }
});

export default InputIpAddress;