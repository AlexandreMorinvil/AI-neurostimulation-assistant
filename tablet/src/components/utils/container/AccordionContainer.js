import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { boxStyles } from "@styles/boxStyles";

const PanelItem = (props) => {
  
  /**
   * Props
   */
  const { isActive, title, children } = props;

  /**
   * States
   */
  const [stateIsActive, setStateIsActive] = useState(isActive);
  const [stateTitle] = useState(title || "");

  /**
   * Functions
   */
  const handleToggleIsActive = () => {
    setStateIsActive(!stateIsActive);
  }

  /**
   * Render
   */
  return (
    <View style={boxStyles.container}>
      <View style={boxStyles.shadow}>
        <View style={[
          boxStyles.headerContainer, 
          !stateIsActive ? boxStyles.closedHeaderContainer: null
        ]}>
          <TouchableOpacity
            style={boxStyles.expandIconArea}
            onPress={handleToggleIsActive}
          >
            <Text style={boxStyles.expandIcon}>
              {stateIsActive ? '-' : '+'}
            </Text>
          </TouchableOpacity>

          <Text style={boxStyles.title}>
            {`${stateTitle}`}
          </Text>
        </View>
        <View style={[
          boxStyles.contentContainer,
          !stateIsActive && boxStyles.invisible
        ]}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default PanelItem;