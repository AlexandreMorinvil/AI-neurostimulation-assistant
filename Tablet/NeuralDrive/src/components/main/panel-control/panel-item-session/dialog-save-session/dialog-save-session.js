import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {useState, useImperativeHandle, useEffect, forwardRef} from 'react';
import {save_session} from '../../../../../services/database.service';

const DialogSaveSession = (props, ref) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    showDialog,
  }));

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            save_session();
            hideDialog();
          }}
          style={styles.dialog}>
          <Dialog.Title>Do you want to save your session ? </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Your session will be saved in your current server.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor="white"
              textColor="black"
              onPress={hideDialog}>
              NO
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              buttonColor="white"
              textColor="black"
              onPress={() => {
                save_session();
                hideDialog();
              }}>
              YES
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    width: '30%',
    height: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default forwardRef(DialogSaveSession);
