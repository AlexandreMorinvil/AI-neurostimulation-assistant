import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';
import { SectionSessionStarter } from './SectionSessionStarter';
import { SectionConnectionStatus } from './SectionConnectionStatus';

export const BoxSessionManagement = () => {

  /**
   * Constant
   */
  const TITLE = "Session Management";

  /**
   * Render
   */
  return (
    <AccordionBoxContainer
      isActive={true}
      isMinimizable={false}
      title={TITLE}
    >
      <SectionConnectionStatus />
      <SectionSessionStarter />
    </AccordionBoxContainer>
  );
};