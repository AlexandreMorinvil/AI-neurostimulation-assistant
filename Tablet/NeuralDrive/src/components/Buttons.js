import styled from 'styled-components';
import React from 'react';

const TO = styled.TouchableOpacity`
    height: 60px;
    border-radius: 30px;
    width: 180px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || 'palevioletred'};
`;
// TODO add individual margin to each button
// margin: 10px 0 0 30px;

const TOA = styled(TO)`
    border-radius: 0px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;

const RoundedButton = ({onPress, title, bgColor}) =>
      <TO onPress={onPress()} activeOpacity={0.2} bgColor={bgColor}>
        <ButtonText> {title} </ButtonText>
      </TO>

const Test = ({onPress, title, bgColor}) =>
      <TOA onPress={onPress()} activeOpacity={0.2} bgColor={bgColor}>
        <ButtonText> {title} </ButtonText>
      </TOA>

export default Buttons = {
  RoundedButton: RoundedButton,
  Test: Test,
};

// export default RoundedButton;
// export {Test}
