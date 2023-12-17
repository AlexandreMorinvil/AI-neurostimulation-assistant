import { ViewStyle } from 'react-native';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { SmartwatchSensorsSummary } from './SmartwatchSensorsSummary';

type Props = {
  style?: ViewStyle,
}

export const BoxSensorsSummary = (props: Props) => {

  /**
   * Constants
   */
  const TITLE: string = 'Sensors Summary';

  /**
   * Render
   */
  return (
    <AccordionBoxContainer 
      style={props.style}
      title={TITLE}
      isMinimizable={false}
    >
      <SmartwatchSensorsSummary />
    </AccordionBoxContainer>
  );
}
