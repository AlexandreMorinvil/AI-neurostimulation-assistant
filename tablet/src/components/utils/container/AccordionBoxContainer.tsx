import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { boxStyles } from "@styles/boxStyles";

type Props = {
  children: React.ReactNode,
  isActive?: boolean,
  isMinimizable?: boolean,
  onlyHeader?: boolean,
  style?: ViewStyle,
  title: string,
}

export const AccordionBoxContainer = (props: Props) => {

  /**
   * States
   */
  const [isMinimizable] = useState<boolean>(props.isMinimizable ?? true)
  const [isOnlyHeader] = useState<boolean>(props.onlyHeader ?? false)
  const [isActive, setStateIsActive] = useState<boolean>(
    (!props.isMinimizable || props.isActive) ?? false
  );
  const [stateTitle] = useState(props.title);

  /**
   * Functions
   */
  const handleToggleIsActive = () => {
    setStateIsActive(!isActive);
  }

  /**
   * Render
   */
  return (
    <View style={[boxStyles.container]}>
      <View style={[boxStyles.shadow]}>
        <View style={[
          props.style,
          boxStyles.headerContainer,
          !isActive ? boxStyles.closedHeaderContainer : null
        ]}>
          {isMinimizable &&
            <TouchableOpacity
              style={boxStyles.expandIconArea}
              onPress={handleToggleIsActive}
            >
              <Text style={boxStyles.expandIcon}>
                {isActive ? '-' : '+'}
              </Text>
            </TouchableOpacity>
          }

          <Text style={[
            boxStyles.title,
            !isMinimizable && styles.titleSpacing,
          ]}>
            {`${stateTitle}`}
          </Text>
        </View>
        <View style={[
          boxStyles.contentContainer,
          !isActive && boxStyles.invisible
        ]}>
          {props.children}
        </View>
      </View>
    </View>
  );
};

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  titleSpacing: {
    paddingLeft: 30,
  },
});
