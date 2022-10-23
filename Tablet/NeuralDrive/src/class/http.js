import {Action, ERROR_CODE, Status} from '../class/actions';

server_url = 'http://10.0.2.2:5000';

export const send_request = async data => {
  try {
    console.log(server_url);
    console.log(data);
    const response = await fetch(server_url);
    const json = await response.json();
    console.log(json);
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};

export const send_command = async command => {
  try {
    console.log(command);
    const response = await fetch(server_url + '/command', {
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

export const post_start_new_session = async () => {
  const command = {
    action: Action.START_SESSION,
    arg: {
      n_param: this.n_param,
      dimention: this.dimension,
    },
  };
  response = await send_command(command);
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
    const response = await fetch(server_url + '/command', {
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
    console.error(error);
  }
};
