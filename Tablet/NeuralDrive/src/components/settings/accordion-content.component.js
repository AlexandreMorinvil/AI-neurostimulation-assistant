import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const AccordionContent = (props) => {

  const { children } = props;

  return (
    <View style={styles.content}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 25,
    fontSize: 20,
  },
});

export default AccordionContent;