import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DialogTemplate from '../../utils/container/DialogTemplate';
import { forwardRef, Ref, useRef, useImperativeHandle } from 'react';
import { COLOR_ICON } from '@styles/colorStyles';
import { recordedSessionsService } from 'src/services/recordedSessionsService';

const DialogDeleteSessions = (_props: any, ref: Ref<unknown> | undefined) => {

  /**
   * Reference
   */
  const dialogRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    showDialog,
  }));

  /**
   * Functions
   */
  const showDialog = () => {
    dialogRef.current?.showDialog();
  }

  const deleteSessions = () => {
    recordedSessionsService.deleteSelectedSessions();
  }

  /**
   * Child props
   */
  const childProps = {
    icon: () => (
      <FontAwesome
        name="trash"
        color={COLOR_ICON.problematic}
        size={80}
      />
    ),
    title: "Delete session?",
    description: 'Press "Yes" to permanently delete the selected sessions or press "No" to cancel.',
    firstButtonText: 'No',
    onPressFirstButton: () => {},
    isFirstButtonHiglighted: false,
    secondButtonText: 'Yes',
    onPressSecondButton: () => { deleteSessions() },
    isSecondButtonCritical: true,
  }

  /**
   * Render
   */
  return (
    <DialogTemplate ref={dialogRef} {...childProps} />
  );
};

export default forwardRef(DialogDeleteSessions);
