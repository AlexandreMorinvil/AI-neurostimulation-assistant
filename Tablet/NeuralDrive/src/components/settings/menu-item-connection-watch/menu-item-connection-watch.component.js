import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import SectionConnectionWatch from "./section-connection-watch.component";
import ConfirmButton from "../confirm-button.component";

const SettingsMenuItemConnectionWatch = () => {

  /**
   * States
   */
  const [stateHeaderSummary, setstateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);

  /**
   * Functions
   */

  /**
   * Render
   */
  return (
    <AccodionItem
      title="Smart Watch Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionConnectionWatch />
    </AccodionItem>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({});

export default SettingsMenuItemConnectionWatch;