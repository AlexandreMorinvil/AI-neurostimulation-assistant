import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { material } from 'react-native-typography'

export default function Main() {
  const theme = {
    dark: true,
    mode: 'exact',
  };
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
//AppRegistry.registerComponent(appName, () => TextShower);
AppRegistry.registerComponent(appName, () => Main);
