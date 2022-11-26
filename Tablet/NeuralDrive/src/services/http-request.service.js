import { Action, ERROR_CODE, Status } from '../class/actions';
import { getBackendUrl } from "./connection-backend.service";

// Exported methods
export async function postStartNewSession(dimensions) {

  // Request format
  const command = {
    action: Action.START_SESSION,
    arg: {
      dimensions: dimensions,
    },
  };
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {

    // Response format 
    return {
      status: response.content?.status
    }
  }
};

export async function postExecuteQuery(A, B, y_value) {

  // Request format
  const command = {
    action: Action.EXECUTE_QUERY,
    arg: {
      A: A,
      B: B,
      y_value: y_value
    },
  };

  // Send request and handle errors
  response = await sendCommand(command);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {

    // Response format
    return {
      heatMapBase64JpegImage: response.content?.heatmap_base64_jpeg_image,
      position: response.content?.position,
      values: response.content?.values,
      nextQuery: response.content?.next_query
    }
  }
};

export async function getVisualizationsForParameters(firstParameterIndex, secondParameterIndex) {

  // Request format
  const method = "GET";
  const command = {
    action: Action.GET_VIZUALIZATIONS,
    arg: {
      first_parameter: firstParameterIndex,
      second_parameter: secondParameterIndex,
    },
  };

  // Send request and handle errors
  response = await sendCommand(command, method);
  if (response === ERROR_CODE.FAIL_CONNECT_TO_SERVER) {
    return Status.STOP;
  } else {

    // Response format
    return {
      heatMapBase64JpegImage: response.content?.heatmap_base64_jpeg_image,
      parameterGraphBase64JpegImage: response.content?.parameter_graph_base64_jpeg_image,
    }
  }
};

// Private methods
async function sendCommand(command, method) {
  try {
    console.log("Send HTTP request for command :", command);
    const response = await fetch(getBackendUrl() + '/command', {
      method: method || 'POST',
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
    console.error('Http request failed');
    return ERROR_CODE.FAIL_CONNECT_TO_SERVER;
  }
};
