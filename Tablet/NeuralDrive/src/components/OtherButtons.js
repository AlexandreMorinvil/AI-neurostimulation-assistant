import styled from 'styled-components';

const TO = styled.TouchableOpacity`
    height: 60px;
    border-radius: 30px;
    width: 180px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || 'palevioletred'};
    margin: 10px 0 0 30px;
`;

const TO2 = styled.TouchableOpacity`
    height: 60px;
    border-radius: 30px;
    width: 180px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || 'red'};
    margin: 10px 0 0 30px;
`;

const Basic = styled.TouchableOpacity`
	box-sizing: border-box;
	text-align: center;
	padding: 8px 16px;
	color: white;
	background-color: rebeccapurple;
	border: 1px solid;
	border-color: rebeccapurple;
	border-radius: 10px;
	font-family: sans-serif;
	font-size: 16px;
	text-decoration: none;
`;

export {TO, TO2, Basic};
