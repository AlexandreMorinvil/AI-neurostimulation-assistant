import styled from 'styled-components';

// Utility components
// prettier-ignore
// styled-components
const FlexContainer = styled.View`
  flex: ${props => props.flex || '1'};
  flexDirection: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.jc || 'space-evenly'};
  align-items: ${props => props.alignItems || 'center'};
  background-color: ${props => props.bgColor || 'white'};
  border-radius: ${props => props.borderRadius || '0px'};
  margin: ${props => props.marg || '0px'};
  padding: ${props => props.pad || '10px'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};

  shadowColor: ${props => props.shadowColor || '#000'};
  elevation: ${props => props.elevation || '0'};
  border: ${props => props.border || '0px solid black'};
`;

// justify-content: vertical content position
// align-items: horizontal content position
// margin: space around boxes
const Box = styled.View`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
  background-color: ${props => props.bgColor || '#fff'};

  border-radius: ${props => props.borderRadius || '25px'};
  justify-content: ${props => props.jc || 'center'};
  align-items: center;
  margin: ${props => props.marg || '0'};
  padding: ${props => props.pad || '0'};

  shadowcolor: ${props => props.shadowColor || '#000'};
  elevation: ${props => props.elevation || '0'};
  border: ${props => props.border || '0px solid black'};
`;

export {
  Box, // You can put Text components directly inside
  FlexContainer,
};
