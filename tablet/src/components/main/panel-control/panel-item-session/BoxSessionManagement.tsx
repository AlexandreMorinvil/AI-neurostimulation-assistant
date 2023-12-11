import AccordionContainer from '@components/utils/container/AccordionContainer';
import SectionSessionManager from './SectionSessionManager';
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
    <AccordionContainer
      isActive={true}
      title={TITLE}
    >
      <SectionConnectionStatus />
      <SectionSessionManager />
    </AccordionContainer>
  );
};