import React from 'react';
import {create, act} from 'react-test-renderer';
import * as service from '../app-setup.service';
import {render, fireEvent} from '@testing-library/react-native';

import * as connectionBackendService from "../connection-backend.service";
import * as patientService from "../patient.service";
import * as problemDimensionTypeService from "../problem-dimension-type.service";
import * as tremorPointService from "../tremor-point.service";
import * as watchDataService from "../watch-data.service";


//Mocking functions
jest.spyOn(connectionBackendService, 'cleanUp');
jest.spyOn(tremorPointService, 'cleanUp');
jest.spyOn(watchDataService, 'cleanUp');

jest.spyOn(connectionBackendService, 'initialize');
jest.spyOn(patientService, 'initialize');
jest.spyOn(problemDimensionTypeService, 'initialize');
jest.spyOn(tremorPointService, 'initialize');
jest.spyOn(watchDataService, 'initialize');


//Testing 
describe("app-setup service", ()=>{
  test('cleanUp should call various cleanUp functions in other services', () => {
    service.cleanUp();
    expect(connectionBackendService.cleanUp).toHaveBeenCalled();
    expect(tremorPointService.cleanUp).toHaveBeenCalled();
    expect(watchDataService.cleanUp).toHaveBeenCalled();
  });

  test('initialize should call various initialize functions in other services', () => {
    service.initialize();
    expect(connectionBackendService.initialize).toHaveBeenCalled();
    expect(patientService.initialize).toHaveBeenCalled();
    expect(problemDimensionTypeService.initialize).toHaveBeenCalled();
    expect(tremorPointService.initialize).toHaveBeenCalled();
    expect(watchDataService.initialize).toHaveBeenCalled();
  });
});