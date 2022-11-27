import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {current_session} from '../global/environement';
import {post_save_session, post_get_session_by_ID} from '../class/http';
import DialogData from '../components/database/dialogData';

import {Button, DataTable, Checkbox} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const DataBase = () => {
  const [value, setValue] = useState(0);
  const [sessions, setSessions] = useState(Array(0));
  const dialogRef = React.useRef();

  return (
    <View style={styles.mainBox}>
      <DialogData ref={dialogRef}></DialogData>
      <View style={styles.toolBox}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={async () => {
            r = await post_save_session();
            setSessions(r);
            console.log(sessions);
          }}>
          SAVE SESSION
        </Button>
        <Button style={styles.button} mode="contained" onPress={async () => {}}>
          DELETE SESSIONS
        </Button>
      </View>
      <ScrollView contentContainerStyle={styles.tableBox}>
        {sessions != null && sessions.length > 0
          ? sessions.map(session_id => {
              return (
                <TouchableOpacity
                  key={session_id}
                  style={styles.sessionBox}
                  onPress={async () => {
                    if (dialogRef) {
                      console.log('open dialog session', session_id);
                      session = await post_get_session_by_ID(session_id);
                      dialogRef.current.showDialog(session);
                    }
                  }}>
                  <Text style={styles.textSession}>{session_id}</Text>
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'pink',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSession: {
    color: 'black',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 48,
  },
  sessionBox: {
    width: 150,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    //flexBasis: '20%',
    margin: 25,
  },
  toolBox: {
    width: '90%',
    height: '10%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableBox: {
    width: '90%',
    height: '300%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    //backgroundColor: 'white',
  },
  tableRow: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
  },
});

export default DataBase;
