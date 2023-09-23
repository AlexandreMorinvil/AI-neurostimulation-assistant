import React from 'react';
import {create} from 'react-test-renderer';
import SettingsMenuItemProblemDimensionType from '../menu-item-problem-dimension-type.component';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const tree = create(<SettingsMenuItemProblemDimensionType/>);
jest.runAllTimers();

test('snapshot', async () => {
    expect(tree).toMatchSnapshot();
});
