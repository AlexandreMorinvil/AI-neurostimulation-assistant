import styled from 'styled-components';

const RegInput = styled.TextInput`
  font-size: 16px;
  background-color: ${props => props.bgColor || '#eee'};
  color: black;
  width: ${props => props.width || '60%'};
  height: ${props => props.height || '40px'};
  margin: 16px;
  border-radius: 0px;
  padding: 12px;
`;

const Round = styled(RegInput)`
  border-radius: 30px;
`;

const RoundGrey = styled(Round)`
  background-color: #aaa;
  color: #fff;
`;

export {Round, RegInput, RoundGrey};
