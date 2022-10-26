import {
  Text
} from 'react-native';

import * as Inputs from './Inputs.js';
import MainModules from './MainModules.js';

const ServerURLInput = ({dimension, titleSpacing}) =>
      <MainModules.FlexContainer jc={'center'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     borderRadius={'15px'}>

        <MainModules.CustomText fontsize={'16px'} marg={titleSpacing}> {dimension} </MainModules.CustomText>
        <Inputs.Round width={'400px'}/>
      </MainModules.FlexContainer>

const ServerURLInputModule = ({flex, bgColor, dimension, titleSpacing}) =>
  <MainModules.Box height={'100%'} width={'100%'} bgColor={bgColor} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <MainModules.FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
      <Text style={{ color: "#fff" }}> Enter server's URL in the text box below </Text>
      <ServerURLInput dimension={'IP'} titleSpacing={'0 5px 0 0'} />
    </MainModules.FlexContainer>
  </MainModules.Box>

const WatchIPInputModule = ({flex, bgColor, ipAddress}) =>
  <MainModules.Box height={'100%'} width={'100%'} bgColor={bgColor} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <MainModules.FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
      <Text style={{ color: "#fff" }}> Enter the following IP address in the Smart Watch </Text>
      <MainModules.FlexContainer jc={'center'}
        marg={'5px'}
        pad={'0px 0px 0px 8px'}
        borderRadius={'15px'}>
        <Text style={{ color: "#fff" }}>{ipAddress} </Text>
      </MainModules.FlexContainer>
    </MainModules.FlexContainer>
  </MainModules.Box>

export default SettingsModules = {
  ServerURLInput: ServerURLInput,
  ServerURLInputModule: ServerURLInputModule,
  WatchIPInputModule: WatchIPInputModule,
};
