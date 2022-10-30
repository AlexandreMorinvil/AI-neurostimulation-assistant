import styled from 'styled-components';
import {
  Text
} from 'react-native';
import * as Inputs from './Inputs.js';

 // VIEWS AND CONTAINERS
 const FlexContainer = styled.View`
   flex: ${props => props.flex || '1'};
   flexdirection: ${props => props.flexDirection || 'row'};
   justify-content: ${props => props.jc || 'space-evenly'};
   align-items: ${props => props.alignItems || 'center'};
   background-color: ${props => props.bgColor || '#222'};
   border-radius: ${props => props.borderRadius || '0px'};
   margin: ${props => props.marg || '0px'};
   padding: ${props => props.pad || '10px'};
   width: ${props => props.width || '100%'};
   height: ${props => props.height || '100%'};

   shadowcolor: ${props => props.shadowColor || '#000'};
   elevation: ${props => props.elevation || '0'};
   border: ${props => props.border || '0px solid black'};
 `;

 // justify-content: vertical content position
// align-items: horizontal content position
 // margin: space around boxes
 const Box = styled.View`
   width: ${props => props.width || '100px'};
   height: ${props => props.height || '100px'};
   background-color: ${props => props.bgColor || 'white'};
   border-radius: ${props => props.borderRadius || '25px'};
   justify-content: ${props => props.jc || 'center'};
   align-items: center;
   margin: ${props => props.marg || '0'};
   padding: ${props => props.pad || '0'};
   shadowcolor: ${props => props.shadowColor || '#000'};
   elevation: ${props => props.elevation || '0'};
   border: ${props => props.border || '0px solid black'};
 `;
 const CustomText = styled.Text`
  color: ${props => props.color || 'white'};
  font-size: ${props => props.fontsize || '12px'};
  margin: ${props => props.marg || '0px'};
 `;

const ServerURLInput = ({dimension, titleSpacing, textChange}) =>
      <FlexContainer jc={'center'}
                     marg={'5px'}
                     pad={'0px 0px 0px 8px'}
                     borderRadius={'15px'}>

        <CustomText fontsize={'16px'} marg={titleSpacing} onChangeText={textChange}> {dimension} </CustomText>
        <Inputs.Round width={'400px'}/>
      </FlexContainer>

const ServerURLInputModule = ({flex, bgColor, dimension, functionToUse, textChange}) =>
  <Box height={'100%'} width={'100%'} bgColor={bgColor} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
      <Text style={{ color: "#fff" }}> Enter server's URL in the text box below </Text>
      <ServerURLInput dimension={'IP'} titleSpacing={'0 5px 0 0'} onChangeText={textChange} />
      <Buttons.RoundedButton
                title="Set server IP Address"
                onPress={() => functionToUse}
                bgColor={bgColor}
                container={bottom = 10} />
    </FlexContainer>
  </Box>

const WatchIPInputModule = ({flex, bgColor, ipAddress}) =>
  <Box height={'100%'} width={'100%'} bgColor={bgColor} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <FlexContainer flex={flex} flexDirection={'column'} alignItems={'center'} borderRadius={'20px'} elevation={'10'} border={'1px solid #333'} pad={'10px 15px 10px 5px'}>
      <Text style={{ color: "#fff" }}> Enter the following IP address in the Smart Watch </Text>
      <FlexContainer jc={'center'}
        marg={'5px'}
        pad={'0px 0px 0px 8px'}
        borderRadius={'15px'}>
        <Text style={{ color: "#fff" }}>{ipAddress} </Text>
      </FlexContainer>
    </FlexContainer>
  </Box>

export default SettingsModules = {
  Box: Box,
  FlexContainer: FlexContainer,
  ServerURLInput: ServerURLInput,
  ServerURLInputModule: ServerURLInputModule,
  WatchIPInputModule: WatchIPInputModule,
};
