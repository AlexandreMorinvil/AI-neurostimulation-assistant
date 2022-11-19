// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createStore } from 'state-pool';

// export default store = createStore();

// const _clearData = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     // Error clearing data
//     console.error(error);
//   }
// }

// const _storeData = async (key, value, isInitialSet) => {
//   try {
//     const stringValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, stringValue);
//   } catch (error) {
//     // Error saving data
//     console.error(error);ùw
//   }
// };

// const _removeData = async (key) => {
//   try {
//     await AsyncStorage.removeItem(key);
//   } catch (error) {
//     // Error removing data
//     console.error(error);
//   }
// }

// const _retrieveData = async (key, noState) => {
//   try {
//     const stringValue = await AsyncStorage.getItem(key);
//     if (stringValue !== null)
//       return noState;
//     return JSON.parse(stringValue)
//   } catch (error) {
//     // Error retrieving data
//     console.error(error);
//   }
// };

// store.persist({
//   saveState: _storeData,
//   loadState: _retrieveData,
//   removeState: _removeData,
//   clear: _clearData,
// })
