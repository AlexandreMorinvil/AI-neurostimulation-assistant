import styled from 'styled-components';

const RegInput = styled.TextInput`
  font-size: 18px;
  background-color: #eee;
  color: black;
  width: 80%;
  height: 60px;
  margin: 16px;
  border-radius: 0px;
  padding: 16px;
`;

const Round = styled(RegInput)`
  border-radius: 30px;
`;

const RoundGrey = styled(Round)`
  background-color: #aaa;
  color: #fff;
`;

export {Round, RegInput, RoundGrey};
