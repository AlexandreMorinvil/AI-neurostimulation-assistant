import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SettingsStatus} from '../../const/settings';
import {COLOR_BACKGROUND} from '../../styles/colors.style.js';

const HEIGHT = 80;
const FONT_SIZE = 20;

const BACKGROUND_COLOR_BLUE = '#00BCD4';
const BACKGROUND_COLOR_GREEN = '#32C832';
const BACKGROUND_COLOR_GREY = '#AAAAAA';
const BACKGROUND_COLOR_ORANGE = '#fac832';
const BACKGROUND_COLOR_RED = '#FA4632';

const STATE_STATUS_ICON_CHECKED = '✓';
const STATE_STATUS_ICON_NOTHING = ' ';
const STATE_STATUS_ICON_CROSS_MARK = '✕';
const STATE_STATUS_ICON_EXCLAMATION = '!';
const STATE_STATUS_ICON_QUESTION = '?';

const AccordionItem = props => {
  /**
   * Props
   */
  const {isActive, summaryText, title, settingStatus, children} = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive || false);
  const [stateSummaryText, setStateSummaryText] = useState(summaryText || '');
  const [stateTitle] = useState(title || '');
  const [stateBackgroundColor, setStateBackgroundColor] = useState(
    BACKGROUND_COLOR_GREY,
  );
  const [stateStatusIcon, setStateStatusIcon] = useState(
    STATE_STATUS_ICON_NOTHING,
  );

  /**
   * Functions
   */
  const handleToggleIsActive = () => {
    setStateIsActive(!stateIsActive);
  };

  const updateHeaderForStatus = settingStatus => {
    switch (settingStatus) {
      case SettingsStatus.NEEDED:
        setStateBackgroundColor(BACKGROUND_COLOR_ORANGE);
        setStateStatusIcon(STATE_STATUS_ICON_EXCLAMATION);
        break;
      case SettingsStatus.SET:
        setStateBackgroundColor(BACKGROUND_COLOR_GREEN);
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
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View
          style={[
            styles.headerContainer,
            {backgroundColor: stateBackgroundColor},
          ]}>
          <TouchableOpacity
            style={styles.expandIconArea}
            onPress={handleToggleIsActive}>
            <Text style={styles.expandIcon}>{stateIsActive ? '-' : '+'}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{`${stateTitle} : `}</Text>

          <View style={styles.spacer}></View>

          <Text style={styles.summary}>{stateSummaryText}</Text>

          <View style={styles.statusArea}>
            <Text style={styles.statusIcon}>{stateStatusIcon}</Text>
          </View>
        </View>
        {stateIsActive && (
          <View style={styles.contentContainer}>{children}</View>
        )}
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  shadow: {
    backgroundColor: 'white',
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContainer: {
    backgroundColor: BACKGROUND_COLOR_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: COLOR_BACKGROUND.AccordionItemContent,
    padding: 25,
    fontSize: 20,
  },
  expandIconArea: {
    height: HEIGHT,
    width: HEIGHT,
  },
  expandIcon: {
    fontSize: 50,
    alignItems: 'center',
    textAlign: 'center',
    height: HEIGHT,
    width: HEIGHT,
  },
  title: {
    color: 'white',
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
  },
  summary: {
    color: 'white',
    fontSize: FONT_SIZE,
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

export default AccordionItem;
