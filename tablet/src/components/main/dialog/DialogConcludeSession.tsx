import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DialogTemplate from '../../utils/container/DialogTemplate';
import { forwardRef, Ref, useRef, useImperativeHandle } from 'react';
import { COLOR_ICON } from '@styles/colorStyles';
import { sessionService } from 'src/services/sessionService';

export const DialogSaveSession = (_props: any, ref: Ref<unknown> | undefined) => {

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
  const concludeSession = () => {
    sessionService.concludeSession();
  }

  const showDialog = () => {
    dialogRef.current?.showDialog();
  }

  /**
   * Child props
   */
  const childProps = {
    icon: () => (
      <FontAwesome
        name="check-circle"
        color={COLOR_ICON.normal}
        size={80}
      />
    ),
    title: "Conclude this session?",
    description: 'Press "Yes" to conclude this recording session or press "No" to resume.',
    firstButtonText: 'No',
    onPressFirstButton: () => { },
    isFirstButtonHiglighted: false,
    secondButtonText: 'Yes',
    onPressSecondButton: concludeSession,
    isSecondButtonHighlighted: true,
  }

  /**
   * Render
   */
  return (
    <DialogTemplate ref={dialogRef} {...childProps} />
  );
};

export default forwardRef(DialogSaveSession);
