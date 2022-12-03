import React from 'react';
import {create, act} from 'react-test-renderer';
import * as service from '../connection-watch.service';
import {render, fireEvent} from '@testing-library/react-native';

import * as connectionBackendService from "../connection-backend.service";
import * as networkService from "../network.service";


//Mocking functions
jest.spyOn(global, 'clearTimeout');
jest.spyOn(global, 'setTimeout');
jest.spyOn(connectionBackendService, 'getBackendIpAddress');

//Testing 
describe("connection-watch", ()=>{
  test('watchIsnotConnected should set _isConnected to false', () => {
    service.watchIsnotConnected();
    expect(service.getIsConnectedStatus()).toEqual(false);
  });

  test('stopWatchTimeOut should call clearTimeout', () => {
    service.stopWatchTimeOut();
    expect(clearTimeout).toHaveBeenCalled()
  });

  test('watchIsConnected should set _isConnected to true and call setTimeOut', () => {
    service.watchIsConnected();
    expect(service.getIsConnectedStatus()).toEqual(true);
    expect(setTimeout).toHaveBeenCalled()
  });

  test('ipAddressToPutInSmartWatch should return backend ip address if not in localhost mode', () => {
    connectionBackendService.deactivateLocalHostMode();   
    service.ipAddressToPutInSmartWatch();
    expect(connectionBackendService.getBackendIpAddress).toHaveBeenCalled(); 
  });

});