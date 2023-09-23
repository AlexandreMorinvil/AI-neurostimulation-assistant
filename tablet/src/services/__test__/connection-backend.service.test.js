import React from 'react';
import {create, act} from 'react-test-renderer';
import * as service from '../connection-backend.service';
import {render, fireEvent} from '@testing-library/react-native';

import * as persistentDataService from '../persistant-data.service';


//Mocking functions
jest.spyOn(persistentDataService, 'savePersistantData');
jest.spyOn(service.subject, 'next');

//Testing 
describe("connection-backend", ()=>{
  test('activateLocalHostMode should set the tablet in localhostmode', () => {
    service.activateLocalHostMode();
    expect(persistentDataService.savePersistantData).toHaveBeenCalledWith('isInLocalhostMode', true);
    expect(service.subject.next).toHaveBeenCalled();
    expect(service.getIsInLocalhostMode()).toEqual(true);
  });

  test('deactivateLocalHostMode should unset the tablet from localhostmode', () => {
    service.deactivateLocalHostMode();
    expect(persistentDataService.savePersistantData).toHaveBeenCalledWith('isInLocalhostMode', false);
    expect(service.subject.next).toHaveBeenCalled();
    expect(service.getIsInLocalhostMode()).toEqual(false);
  });

  test('getBackendIpAddress should return localhost when in localhost mode and ip address when not in localhost mode', () => {
    service.activateLocalHostMode();
    expect(service.getBackendIpAddress()).toEqual('localhost');

    service.deactivateLocalHostMode();
    expect(service.getBackendIpAddress()).toEqual('0.0.0.0');
  });

  test('getBackendUrl should return correct ULR when in localhost mode or when not in localhost mode', () => {
    service.activateLocalHostMode();
    expect(service.getBackendUrl()).toEqual('http://localhost:5000');

    service.deactivateLocalHostMode();
    expect(service.getBackendUrl()).toEqual('http://0.0.0.0:5000');
  });

  test('isIpCurrentIpAddress should return true when given the correct ipaddress and false when not', () => {
    expect(service.isIpCurrentIpAddress('0.0.0.0')).toEqual(true);

    expect(service.isIpCurrentIpAddress('wrong')).toEqual(false);
  });

  test('sendRequest should return true', () => {
    expect(service.sendRequest()).toEqual(true);
  });

  test('setBackendIpAddress correctly set the backend ip address and call functions', () => {
    expect(service.getBackendIpAddress()).toEqual('0.0.0.0');

    service.setBackendIpAddress('1.1.1.1');
    expect(service.getBackendIpAddress()).toEqual('1.1.1.1');
    expect(persistentDataService.savePersistantData).toHaveBeenCalledWith('backendIpAddress', '1.1.1.1');
    expect(service.subject.next).toHaveBeenCalled();
  });

});

/*test('___', () => {
    
  });*/