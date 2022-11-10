import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import SectionBackendConnection from "./section-connection-backend.component";
import ConfirmButton from "../confirm-button.component";

const CONFIRM_BUTTON_TEXT = "Confirm Choice";

const SettingsMenuItemConnectionBackend = () => {

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
      title="Backend Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionBackendConnection />
      <View style={styles.spacing}>
        <ConfirmButton
          isActive={false}
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
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 20,
  },
});

export default SettingsMenuItemConnectionBackend;