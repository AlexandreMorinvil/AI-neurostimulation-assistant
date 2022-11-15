import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet} from 'react-native';
import {current_session} from '../global/environement';
import {
  post_save_session,
  post_delete_session,
  post_get_all_session,
} from '../class/http';
import {getRandomInt} from '../class/const';
import DialogData from '../components/database/dialogData';

import {
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  Text,
  TextInput,
  DataTable,
  Checkbox,
} from 'react-native-paper';

const delete_selected_sessions = async list_sessions => {
  for (let session of list_sessions) {
    session.isCheck ? await post_delete_session(session.id) : null;
  }
  return post_get_all_session();
};

var sessions = new Array(0);
// let sessions_list = await delete_selected_sessions(sessions);
// console.log(sessions_list);
// sessions = new Array(0);
// for (let session of sessions_list) {
//   sessions.push({
//     id: session[0],
//     watch_data: session[1],
//     heat_map: session[2],
//     user: 'Noe',
//     date: '2022/11/11',
//     isCheck: false,
//   });
// }

const DataBase = () => {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.mainBox}>
      <View style={styles.toolBox}>
        <DialogData></DialogData>
        <Button
          style={styles.button}
          mode="contained"
          onPress={async () => {
            current_session.id = getRandomInt(0, 10000);
            let sessions_list = await post_save_session(current_session);
            console.log(sessions_list);
            sessions = new Array(0);
            for (let session of sessions_list) {
              sessions.push({
                id: session[0],
                watch_data: session[1],
                heat_map: session[2],
                user: 'Noe',
                date: '2022/11/11',
                isCheck: false,
              });
            }
            console.log(sessions);
            setValue(value => value + 1);
          }}>
          SAVE SESSION
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={async () => {
            let sessions_list = await delete_selected_sessions(sessions);
            console.log(sessions_list);
            sessions = new Array(0);
            for (let session of sessions_list) {
              sessions.push({
                id: session[0],
                watch_data: session[1],
                heat_map: session[2],
                user: 'Noe',
                date: '2022/11/11',
                isCheck: false,
              });
            }
            console.log(sessions);
            setValue(value => value + 1);
          }}>
          DELETE SESSIONS
        </Button>
      </View>
      <View style={styles.tableBox}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.tableRow}>select</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>id</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>user</DataTable.Title>
            <DataTable.Title style={styles.tableRow}>date</DataTable.Title>
          </DataTable.Header>

          {sessions != null && sessions.length > 0
            ? sessions.map(session => {
                //const [checked, setChecked] = useState(false);
                return (
                  <DataTable.Row
                    key={session.accNumber} // you need a unique key per item
                    onPress={() => {
                      // added to illustrate how you can make the row take the onPress event and do something
                      console.log(`selected --------session ${session.id}`);
                    }}>
                    <DataTable.Cell style={styles.tableRow}>
                      <Checkbox
                        //color="red"
                        status={session.isCheck ? 'checked' : 'unchecked'}
                        onPress={() => {
                          session.isCheck = !session.isCheck;
                          console.log(`selected session ${session.id}`);
                          setValue(value => value + 1);
                        }}
                      />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow}>
                      {session.user}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableRow} numeric>
                      {session.date}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })
            : null}

          {/* <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={page => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
          /> */}
        </DataTable>
      </View>
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
    height: '90%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'center',
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
