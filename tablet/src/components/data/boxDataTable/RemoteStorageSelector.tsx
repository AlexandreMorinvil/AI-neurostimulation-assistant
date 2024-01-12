import { StyleSheet } from 'react-native';
import { SliderToggle } from '@components/utils/input/SliderToggle'

export const RemoteStorageSelector = () => {

  /**
   * States
   */
  

  /**
   * Render
   */
  return (
    <SliderToggle 
      leftText='Data Stored Locally'
      rightText='Data Stored Remotely'
    />
  );
};

/**
 * Stylesheet
 */
const styles = StyleSheet.create({

})