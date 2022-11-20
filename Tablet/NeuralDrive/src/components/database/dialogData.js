import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
//import Swiper from 'react-native-swiper';

const DialogData = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Session #id</Dialog.Title>
          <Dialog.Content>
            {/* <Swiper>

            </Swiper> */}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    width: '95%',
    height: '95%',
    //flexDirection: 'column',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //margin: '25%',
    alignSelf: 'center',
  },
});

export default DialogData;
