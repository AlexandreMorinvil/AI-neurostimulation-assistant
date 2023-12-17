import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SettingsStatus } from 'src/const/settings';
import { boxStyles } from '@styles/boxStyles';

const HEIGHT = 80;

type Props = {
  isActive?: boolean, 
  summaryText: string, 
  title: string, 
  settingStatus: SettingsStatus, 
  children: React.ReactNode,
}

export const SettingsAccordionBoxContainer = (props: Props) => {
  
  /**
   * Constants
  */
  const BACKGROUND_COLOR_BLUE = '#00BCD4';
  const BACKGROUND_COLOR_GREY = '#AAAAAA';
  const BACKGROUND_COLOR_ORANGE = '#fac832';
  const BACKGROUND_COLOR_RED = '#FA4632';

  const STATE_STATUS_ICON_CHECKED = '✓';
  const STATE_STATUS_ICON_NOTHING = ' ';
  const STATE_STATUS_ICON_CROSS_MARK = '✕';
  const STATE_STATUS_ICON_EXCLAMATION = '!';
  const STATE_STATUS_ICON_QUESTION = '?';

  /**
   * Props
   */
  const { isActive, summaryText, title, children } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive || false);
  const [stateSummaryText, setStateSummaryText] = useState(summaryText || '');
  const [stateTitle] = useState(title || '');
  const [stateBackgroundColor, setStateBackgroundColor] = useState(BACKGROUND_COLOR_GREY);
  const [stateStatusIcon, setStateStatusIcon] = useState(STATE_STATUS_ICON_NOTHING,);

  /**
   * Functions
   */
  const handleToggleIsActive = () => {
    setStateIsActive(!stateIsActive);
  };

  const updateHeaderForStatus = (settingStatus: SettingsStatus) => {
    switch (settingStatus) {
      case SettingsStatus.NEEDED:
        setStateBackgroundColor(BACKGROUND_COLOR_ORANGE);
        setStateStatusIcon(STATE_STATUS_ICON_EXCLAMATION);
        break;
      case SettingsStatus.SET:
        setStateBackgroundColor(BACKGROUND_COLOR_BLUE);
        setStateStatusIcon(STATE_STATUS_ICON_CHECKED);
        break;
      case SettingsStatus.UNSET:
        setStateBackgroundColor(BACKGROUND_COLOR_BLUE);
        setStateStatusIcon(STATE_STATUS_ICON_NOTHING);
        break;
      case SettingsStatus.PROBLEMATIC:
        setStateBackgroundColor(BACKGROUND_COLOR_RED);
        setStateStatusIcon(STATE_STATUS_ICON_CROSS_MARK);
        break;
      default:
        setStateBackgroundColor(BACKGROUND_COLOR_GREY);
        setStateStatusIcon(STATE_STATUS_ICON_QUESTION);
        break;
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    updateHeaderForStatus(props.settingStatus);
  }, [props.settingStatus]);

  useEffect(() => {
    setStateSummaryText(summaryText);
  }, [props.summaryText]);

  /**
   * Render
   */
  return (
    <View style={boxStyles.container}>
      <View style={boxStyles.shadow}>
        <View
          style={[
            boxStyles.headerContainer,
            { backgroundColor: stateBackgroundColor },
            !stateIsActive ? boxStyles.closedHeaderContainer : null,
          ]}>
          <TouchableOpacity
            style={boxStyles.expandIconArea}
            onPress={handleToggleIsActive}>
            <Text style={boxStyles.expandIcon}>{stateIsActive ? '-' : '+'}</Text>
          </TouchableOpacity>

          <Text style={boxStyles.title}>{stateTitle}</Text>

          <View style={styles.spacer}></View>

          <Text style={[styles.summary, boxStyles.headerSummaryText]}>{stateSummaryText}</Text>

          <View style={styles.statusArea}>
            <Text style={styles.statusIcon}>{stateStatusIcon}</Text>
          </View>
        </View>
        {stateIsActive && (<View style={boxStyles.contentContainer}>{children}</View>)}
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
  summary: {
    paddingRight: 10,
  },
  statusArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    width: HEIGHT,
  },
  statusIcon: {
    textAlign: 'center',
    fontSize: 40,
    opacity: 0.5,
  },
});
