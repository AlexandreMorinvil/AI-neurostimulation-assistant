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

const SettingsMenuItemConnectionBackend = () => {

  /**
   * States
   */
  const [stateHeaderSummary, setstateHeaderSummary] = useState("");
  const [stateSettingStatus, setStateSettingStatus] = useState(SettingsStatus.UNSET);
  const [stateIsLocalBackendTypeSelected, setStateIsLocalBackendTypeSelected] = useState(false);

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
      <View>
        <SectionChoiceBackend
          style={settingsStyles.sectionSpacing}
          setParentIsLocalBackendTypeSelected={setStateIsLocalBackendTypeSelected}
        />
        <View style={styles.spacing}>
          {stateIsLocalBackendTypeSelected ?
            <SectionLocalBackend /> :
            <SectionExternalBackend />
          }
        </View>
      </View>
      <View style={[styles.spacing, styles.alignRight]}>
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
    marginTop: 20,
  },
  alignRight : {
    flexDirection: "column",
    alignItems: "flex-end",
  }
});

export default SettingsMenuItemConnectionBackend;