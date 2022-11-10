import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import AccordionHeader from './accordion-header.component';
import AccordionContent from './accordion-content.component';

const AccordionItem = (props) => {

  /**
   * Props
   * */
  const { title, summaryText, children, settingStatus } = props;

  /**
   * States
   * */
  const [stateIsActive, setStateIsActive] = useState(false);
  const [stateSummaryText, setStateSummaryText] = useState(summaryText || "");
  const [stateSettingStatus, setStateSettingStatus] = useState(settingStatus);


  /**
   * Effects
   */
  useEffect(() => {
    setStateSummaryText(props.summaryText);
  }, [props.summaryText]);

  useEffect(() => {
    setStateSettingStatus(props.settingStatus);
    console.log("This function was called! 1 : ", stateSettingStatus);
  }, [props.settingStatus]);

  /**
   * Render
   * */
  return (
    <View style={styles.container}>
      <AccordionHeader
        isActive={stateIsActive}
        titleText={title}
        summaryText={stateSummaryText}
        settingStatus={stateSettingStatus}
        setParentIsActiveFunction={setStateIsActive}
      />
      {
        stateIsActive &&
        <AccordionContent>{children}</AccordionContent>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default AccordionItem;