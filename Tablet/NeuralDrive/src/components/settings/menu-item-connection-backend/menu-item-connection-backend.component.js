import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { settingsStyles } from "../../../styles/settings-styles";
import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import ConfirmButton from "../confirm-button.component";
import SectionChoiceBackend from "./section-choice-backend.component";
import SectionExternalBackend from "./section-external-backend.component";
import SectionLocalBackend from "./section-local-backend.component";

import * as connectionBackendService from "../../../services/connection-backend.service";

const CONFIRM_BUTTON_TEXT = "Connect";
const NO_CONNECTION_HEADER_SUMMARY = "No Connection";
const CONNECTED_LOCAL_BACKEND_HEADER_SUMMARY = "Connected Locally";
const CONNECTED_EXTERNAL_BACKEND_HEADER_SUMMARY = (ipAddress) => `Connected to ${ipAddress}`


const SettingsMenuItemConnectionBackend = () => {

  /**
   * States
   */
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);
  const [stateIsLocalBackendTypeSelected, setStateIsLocalBackendTypeSelected] = useState(false);

  const [stateInputIpAddress, setStateInputIpAddress] = useState("");
  const [statIsInputIpAddressValid, setStatIsInputIpAddressValid] = useState(true);

  const [stateIsConnectButtonActive, setStateIsConnectButtonActive] = useState(false);

  /**
   * Functions
   */
  const setConnectButtonActivation = () => {
    // Local backend mode
    if (stateIsLocalBackendTypeSelected) {
      const isAlreadyConnectedLocally = false;
      setStateIsConnectButtonActive(!isAlreadyConnectedLocally);
    }

    // External backend mode
    else {
      const isInputIpValid = statIsInputIpAddressValid;
      const isAlreadyToExternalBackend = false;
      const isIpAddressDifferentFromRegisteredIpAddress = true;
      setStateIsConnectButtonActive(
        isInputIpValid &&
        !isAlreadyToExternalBackend &&
        isIpAddressDifferentFromRegisteredIpAddress
      );
    }
  }

  const updateSettingStatus = () => {
    if (connectionBackendService.getIsConnectedStatus()) {
      setStateSettingStatus(SettingsStatus.SET);
      const ipAddressConnected = connectionBackendService.getBackendIpAddress();
      connectionBackendService.getIsInLocalhostMode() ?
        setStateHeaderSummary(CONNECTED_LOCAL_BACKEND_HEADER_SUMMARY) :
        setStateHeaderSummary(CONNECTED_EXTERNAL_BACKEND_HEADER_SUMMARY(ipAddressConnected));
    }

    else {
      setStateSettingStatus(SettingsStatus.NEEDED);
      setStateHeaderSummary(NO_CONNECTION_HEADER_SUMMARY);
    }
  }

  /**
   * Effects
   */
  useEffect(() => {
    setConnectButtonActivation();
  }, [stateInputIpAddress, statIsInputIpAddressValid, stateIsLocalBackendTypeSelected]);

  useEffect(() => {
    updateSettingStatus();
  }, [connectionBackendService.isConnected]);

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Backend Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <View>
        <SectionChoiceBackend
          style={settingsStyles.sectionSpacing}
          setParentIsLocalBackendTypeSelected={setStateIsLocalBackendTypeSelected}
        />
        <View style={styles.spacing}>
          {stateIsLocalBackendTypeSelected ?
            <SectionLocalBackend /> :
            <SectionExternalBackend
              setParentInputIpAddressFunction={setStateInputIpAddress}
              setParentIsInputIpAddressValidFunction={setStatIsInputIpAddressValid}
            />
          }
        </View>
      </View>
      <View style={[styles.spacing, styles.alignRight]}>
        <ConfirmButton
          isActive={stateIsConnectButtonActive}
          text={CONFIRM_BUTTON_TEXT}
          handleButtonPressedParentFunction={() => { }}
        />
      </View>
    </AccodionItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacing: {
    marginTop: 20,
  },
  alignRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  }
});

export default SettingsMenuItemConnectionBackend;