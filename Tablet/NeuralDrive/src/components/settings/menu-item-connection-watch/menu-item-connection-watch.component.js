import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { SettingsStatus } from "../../../const/settings";

import AccodionItem from "../accordion-item.component";
import SectionConnectionWatch from "./section-connection-watch.component";
import ConfirmButton from "../confirm-button.component";

const CONFIRM_BUTTON_TEXT = "Confirm Choice";

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
      title="Watch Connection"
      summaryText={stateHeaderSummary}
      settingStatus={stateSettingStatus}
    >
      <SectionConnectionWatch />
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

export default SettingsMenuItemConnectionWatch;