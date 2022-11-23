import React from 'react';
import { Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import * as Structures from "../../../Structures";

const InputQueryParameter = ({
  dimension,
  unitType,
  flexInput,
  setFunction,
  value,
  predictedValue,
  oldAlgorithmValue,
  boxFunction,
  disabled,

}) => (
  <Structures.FlexContainer
    jc={'flex-start'}
    flex={flexInput}
    marg={'5px'}
    pad={'0px 0px 0px 8px'}
    bgColor={'#8a8a8a'}
    borderRadius={'15px'}
  >
    <Structures.Box
      height={'70px'}
      width={'70px'}
      bgColor={'#eee'}
      borderRadius={'5px'}
      border={'2px solid black'}>
      <Pressable onPress={boxFunction}>
        <Text variant="titleMedium" style={{ color: '#374F42' }}>
          {oldAlgorithmValue}
        </Text>
      </Pressable>
    </Structures.Box>

    <TextInput
      mode="outlined"
      activeOutlineColor="black"
      outlineColor="white"
      selectionColor="#6f6f6f"
      multiline={false}
      disabled={disabled}
      value={value}
      onChangeText={setFunction}
      textColor="black"
      label={dimension}
      dense={true}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 0,
        marginHorizontal: 10,
        width: '60%',
        height: 50,
        textAlign: 'center',
        fontSize: 24,
      }}
    />
  </Structures.FlexContainer>
);

export default InputQueryParameter
