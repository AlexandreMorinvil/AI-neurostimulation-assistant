import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { SettingsAccordionBoxContainer 
} from "@components/utils/container/SettingsAccordionBoxContainer";
import { smartwatchService } from "src/services/smartwatchService";
import { SectionSmartwatchConnection } from "./SectionSmartwatchConnection";
import { SettingsStatus } from "../../../const/settings";

export const BoxSmartwatchConnection = () => {

  /**
   * Constants
   */
  const CONNECTED_HEADER_SUMMARY = "Connected";
  const NO_CONNECTION_HEADER_SUMMARY = "No Connection";

  /**
   * States
   */
  const [stateHeaderSummary, setStateHeaderSummary] = useState<string>('');
  const [stateSettingStatus, setStateSettingStatus] = useState<SettingsStatus>(
    SettingsStatus.UNSET
  );

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
    <SettingsAccordionBoxContainer
      title="Smart Watch Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionSmartwatchConnection />
    </SettingsAccordionBoxContainer>
  );
};