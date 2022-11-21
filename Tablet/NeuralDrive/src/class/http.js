import {Action, ERROR_CODE, Status} from '../class/actions';
import {getBackendUrl} from '../services/connection-backend.service';

export const send_request = async data => {
  try {
    console.log(getBackendUrl());
    console.log(data);
    const response = await fetch(getBackendUrl());
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};

export const send_command = async command => {
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

export const post_save_session = async session => {
  const command = {
    action: Action.SAVE_SESSION,
    arg: {
      session: session,
    },
  };
  response = await send_command(command);
  return response.content;
};

export const post_delete_session = async id => {
  const command = {
    action: Action.DELETE_SESSION,
    arg: {
      id: id,
    },
  };
  response = await send_command(command);
  return response.content;
};

export const post_get_all_session = async () => {
  const command = {
    action: Action.GET_ALL_SESSION,
    arg: {},
  };
  response = await send_command(command);
  return response.content;
};

export const post_start_new_session = async (n_param, dimension) => {
  const command = {
    action: Action.START_SESSION,
    arg: {
      n_param: n_param,
      dimention: dimension,
    },
  };
  response = await send_command(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {
    return response.content.status;
  }
};

export const test_connection = async () => {
  try {
    const response = await fetch(get_server_ip() + '/packet', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('server connection fail');
    return ERROR_CODE.FAIL_CONNECT_TO_SERVER;
  }
};

export const post_execute_query = async (A, B, y_value) => {
  const command = {
    action: Action.EXECUTE_QUERY,
    arg: {A: A, B: B, y_value: y_value},
  };
  response = await send_command(command);
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
