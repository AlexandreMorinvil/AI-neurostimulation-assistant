import { getBackendUrl } from "./connection-backend.service";

// Constants
const COMMAND_HTTP_ROUTE = '/command';
const DEFAULT_HEADER_HTTP_REQUEST = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

// Private methods
export async function sendCommand(command) {
  try {
    console.log("Got here too");
    const response = await fetch(getBackendUrl() + COMMAND_HTTP_ROUTE, {
      method: 'POST',
      headers: DEFAULT_HEADER_HTTP_REQUEST,
      body: command.stringify(),
    });
    console.log("123456789", response);
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error(`Http request failed for command ${command.action} to backend.`);
    throw error;
  }
};