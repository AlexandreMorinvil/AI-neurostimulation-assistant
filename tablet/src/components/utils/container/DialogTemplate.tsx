import { StyleSheet, Text, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { useState, useImperativeHandle, forwardRef, Ref } from 'react';
import { buttonStyles } from '@styles/buttonStyles';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { textStyles } from '@styles/textStyles';

type Props = {
  icon: IconSource,
  title: string,
  description: string,
  firstButtonText: string,
  onPressFirstButton: Function,
  isFirstButtonHiglighted: boolean,
  isFirstButtonCritical: boolean,
  secondButtonText: string
  onPressSecondButton: Function
  isSecondButtonHighlighted: boolean,
  isSecondButtonCritical: boolean,
}

export const DialogTemplate = (props: Props | any, ref: Ref<unknown> | undefined) => {

  /**
   * Reference 
   */
  useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  /**
   * States
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Functions
   */
  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);

  /**
   * Render
   */
  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={() => { hideDialog() }}
        style={styles.container}
      >
        <View>
          <Dialog.Icon icon={props.icon} />
          <Dialog.Title style={[styles.dialogTitle, textStyles.default]}>
            {props.title}
          </Dialog.Title>
          <Paragraph style={[styles.dialogText, textStyles.default]}>
            {props.description}
          </Paragraph>
        </View>

        <View style={styles.dialogActions}>
          <Button
            style={[
              props.isFirstButtonHiglighted ? buttonStyles.highlighted : buttonStyles.normal,
              props.isFirstButtonCritical && buttonStyles.important,
              styles.button
            ]}
            mode="elevated"
            buttonColor="white"
            textColor="black"
            onPress={() => {
              props?.onPressFirstButton();
              hideDialog();
            }}>
            <Text style={textStyles.buttonText}>{props.firstButtonText}</Text>
          </Button>

          <Button
            style={[
              props.isSecondButtonHighlighted ? buttonStyles.highlighted : buttonStyles.normal,
              props.isSecondButtonCritical && buttonStyles.important,
              styles.button
            ]}
            mode="elevated"
            buttonColor="white"
            textColor="black"
            onPress={() => {
              props?.onPressSecondButton();
              hideDialog();
            }}>
            <Text style={textStyles.buttonText}>{props.secondButtonText}</Text>
          </Button>
        </View>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '60%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    backgroundColor: 'white',
    maxWidth: 600,
    maxHeight: 500,
  },
  dialogTitle: {
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dialogText: {
    textAlign: 'center',
  },
  dialogActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    maxWidth: '40%',
  },
});

export default forwardRef(DialogTemplate);
