import styled from 'styled-components';
import React from 'react';

const RoundedTouchableOpacity = styled.TouchableOpacity`
    height: ${props => props.height || '100%'};
    border-radius: ${props => props.borderRadius || '30px'};
    width: ${props => props.width || '180px'};
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

const RoundedButton = ({onPress, title, bgColor, color, height, width}) =>
      <RoundedTouchableOpacity onPress={onPress()} activeOpacity={0.2} bgColor={bgColor} height={height} width={width}>
        <ButtonText color={color}> {title} </ButtonText>
      </RoundedTouchableOpacity>

export default Buttons = {
  RoundedButton: RoundedButton,
  //Test: Test,
};

// export default RoundedButton;
// export {Test}
