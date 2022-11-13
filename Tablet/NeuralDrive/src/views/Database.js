import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet} from 'react-native';

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

const sessions = [
  {
    id: 10,
    watch_data: [8, 8, 8, 8],
    heat_map: [9, 99, 9, 9],
    user: 'Noe',
    date: '2022/11/11',
  },
  {
    id: 11,
    watch_data: [8, 8, 8, 8],
    heat_map: [9, 99, 9, 9],
    user: 'Noe',
    date: '2022/11/11',
  },
  {
    id: 12,
    watch_data: [8, 8, 8, 8],
    heat_map: [9, 99, 9, 9],
    user: 'Noe',
    date: '2022/11/11',
  },
];

const DataBase = () => {
  const [page, setPage] = React.useState(0);
  return (
    <View style={styles.mainBox}>
      <View style={styles.toolBox}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => console.log('Pressed')}>
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

          {sessions.map(session => {
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
          })}

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
