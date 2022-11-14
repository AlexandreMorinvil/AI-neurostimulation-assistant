import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet} from 'react-native';
import {current_session} from '../global/environement';
import {post_save_session} from '../class/http';
import {getRandomInt} from '../class/const';

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

const DataBase = () => {
  var [sessions, setSession] = useState(new Array(0));
  const [page, setPage] = React.useState(0);
  return (
    <View style={styles.mainBox}>
      <View style={styles.toolBox}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={async () => {
            current_session.id = getRandomInt(0, 10000);
            const sessions_list = await post_save_session(current_session);
            for (let session of sessions_list) {
              setSession(sessions => {
                temp = sessions;
                temp.push({
                  id: session[0],
                  watch_data: session[1],
                  heat_map: session[2],
                  user: 'Noe',
                  date: '2022/11/11',
                });
                return temp;
              });
            }
            console.log(sessions);
          }}>
          SAVE SESSION
        </Button>
      </View>
      <View style={styles.tableBox}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>id</DataTable.Title>
            <DataTable.Title>user</DataTable.Title>
            <DataTable.Title>date</DataTable.Title>
          </DataTable.Header>

          {sessions != null && sessions.length > 0
            ? sessions.map(session => {
                return (
                  <DataTable.Row
                    key={session.accNumber} // you need a unique key per item
                    onPress={() => {
                      // added to illustrate how you can make the row take the onPress event and do something
                      console.log(`selected session ${session.id}`);
                    }}>
                    <DataTable.Cell>{session.id}</DataTable.Cell>
                    <DataTable.Cell>{session.user}</DataTable.Cell>
                    <DataTable.Cell numeric>{session.date}</DataTable.Cell>
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
  },
  toolBox: {
    width: '90%',
    height: '10%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  tableBox: {
    width: '90%',
    height: '90%',
    //backgroundColor: 'pink',
    flexDirection: 'row',
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default DataBase;
