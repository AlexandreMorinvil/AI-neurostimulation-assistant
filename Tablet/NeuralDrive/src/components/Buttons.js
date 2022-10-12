import styled from 'styled-components';
import React from 'react';

const RoundedTouchableOpacity = styled.TouchableOpacity`
    height: 60px;
    border-radius: 30px;
    width: 180px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || 'palevioletred'};
    color: ${props => props.color || 'white'};
    elevation: 10;
    margin: 10px;
`;
// TODO add individual margin to each button
// margin: 10px 0 0 30px;

const TOA = styled(RoundedTouchableOpacity)`
    border-radius: 0px;
`;

const ButtonText = styled.Text`
    color: ${props => props.color || 'white'};
    font-size: 16px;
`;

const RoundedButton = ({onPress, title, bgColor, color}) =>
      <RoundedTouchableOpacity onPress={onPress()} activeOpacity={0.2} bgColor={bgColor}>
        <ButtonText color={color}> {title} </ButtonText>
      </RoundedTouchableOpacity>

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
