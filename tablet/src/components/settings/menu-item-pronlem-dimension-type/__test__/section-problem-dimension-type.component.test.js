import React from 'react';
import {create} from 'react-test-renderer';
import SectionInputPatientId from '../section-problem-dimension-type.component';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const tree = create(<SectionInputPatientId/>);
jest.runAllTimers();

test('snapshot', async () => {
    expect(tree).toMatchSnapshot();
});
