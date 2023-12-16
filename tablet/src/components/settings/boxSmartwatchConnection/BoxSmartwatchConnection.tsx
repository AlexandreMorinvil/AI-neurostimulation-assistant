import { useEffect, useState } from "react";

import { SettingsStatus } from "../../../const/settings";
import { AccordionItem } from "@components/utils/container/SettingsAccordionContainer";
import SectionConnectionWatch from "./section-connection-watch.component";

import { smartwatchService } from "src/services/smartwatchService";
import { Subscription } from "rxjs";

export const BoxSmartwatchConnection = () => {

  /**
   * Constants
   */
  const CONNECTED_HEADER_SUMMARY = "Connected";
  const NO_CONNECTION_HEADER_SUMMARY = "No Connection";

  /**
   * States
   */
  const [stateHeaderSummary, setStateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);

  /**
   * Functions
   */
  const updateSettingStatus = () => {
    if (smartwatchService.isConnected) {
      setStateSettingStatus(SettingsStatus.SET);
      setStateHeaderSummary(CONNECTED_HEADER_SUMMARY);
    }
    else {
      setStateSettingStatus(SettingsStatus.PROBLEMATIC);
      setStateHeaderSummary(NO_CONNECTION_HEADER_SUMMARY);
    }
  }

  /**
   * Effects
  */
  useEffect(() => {
    updateSettingStatus();
    const subscription: Subscription = smartwatchService.subscribeToConnectionStatus(() => {
      updateSettingStatus();
    });
    return () => { subscription.unsubscribe() };
  }, []);

  /**
   * Render
   */
  return (
    <AccordionItem
      title="Smart Watch Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <></>
      <SectionConnectionWatch />
    </AccordionItem>
  );
};