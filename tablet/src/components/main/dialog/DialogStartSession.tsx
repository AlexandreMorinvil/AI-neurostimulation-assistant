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
  const showDialog = () => {
    dialogRef.current?.showDialog();
  }

  const startSession = () => {
    sessionService.startSession();
  }

  /**
   * Child props
   */
  const childProps = {
    icon: () => (
      <FontAwesome
        name="play-circle"
        color={COLOR_ICON.normal}
        size={80}
      />
    ),
    title: "Start a recording session?",
    description: 'Press "Yes" to start a recording session or press "No" to cancel.',
    firstButtonText: 'No',
    onPressFirstButton: () => {},
    isFirstButtonHiglighted: false,
    secondButtonText: 'Yes',
    onPressSecondButton: startSession,
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
