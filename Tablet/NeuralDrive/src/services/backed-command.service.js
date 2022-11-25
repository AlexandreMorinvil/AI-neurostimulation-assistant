import { BackendCommand } from "../class/backend-command.class";
import { Action } from "../class/actions";

import { sendCommand } from "./http-request.service";

// Exported methods
export async function commandExecuteQuery(A, B, y_value) {

  console.log("THIS WAS CALLED");

  // Command
  const command = new BackendCommand(
    Action.EXECUTE_QUERY,
    {
      A: A,
      B: B,
      y_value: y_value
    }
  )

  // Execute command and handle response
  try {
    const response = await sendCommand(command);
    const { predict_heat_map, position, values, next_query } = response;
    return {
      heatMapBase64JpegImagejpeg: predict_heat_map,
      heatMapData: values,
      suggestedParameterValues: next_query
      // b: position,
    };
  }

  // Behavior in case of failed command 
  catch (error) {
    console.log("HERE IS AN ERROR!", error)
    // throw error;
  }
};