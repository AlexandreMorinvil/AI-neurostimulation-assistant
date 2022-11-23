import {Action, ERROR_CODE, Status} from '../class/actions';
import { getBackendUrl } from "../services/connection-backend.service";
import { sendRequest } from "./connection-backend.service";

const sendCommand = async (command) => {
  try {
    console.log(command);
    const response = await fetch(getBackendUrl() + '/command', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: command.action,
        arg: command.arg,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('server connection fail');
    return ERROR_CODE.FAIL_CONNECT_TO_SERVER;
  }
};

export const post_start_new_session = async (n_param, dimension) => {
  const command = {
    action: Action.START_SESSION,
    arg: {
      n_param: n_param,
      dimention: dimension,
    },
  };
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    return response.content.status;
  }
};

export const post_execute_query = async (A, B, y_value) => {
  const command = {
    action: Action.EXECUTE_QUERY,
    arg: {A: A, B: B, y_value: y_value},
  };
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    return response.content;
  }
};

export const get_watch_data = async chart => {
  command = {
    action: Action.GET_WATCH_DATA,
    arg: {},
  };
  try {
    const response = await fetch(getBackendUrl() + '/command', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: command.action,
        arg: command.arg,
      }),
    });
    const json = await response.json();
    return JSON.parse(json.content);
  } catch (error) {
    console.log(error);
  }
};
