import { DataTable } from '@components/database/boxDataTable/DataTable';
import { AccordionBoxContainer } from '@components/utils/container/AccordionBoxContainer';

export const BoxDataTable = () => {

  /**
   * Render
   */
  return (
    <AccordionBoxContainer title='Sessions Recorded'>
      <DataTable />
    </AccordionBoxContainer>
  );
};