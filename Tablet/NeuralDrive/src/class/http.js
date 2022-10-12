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

export const send_command = async (command, canvas) => {
  try {
    //console.log(command);
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
    // console.log('PARSE', JSON.parse(json.content.predict_heat_map)[0][0]);
    canvas.current_algorithm.data = JSON.parse(json.content.predict_heat_map);
    canvas.current_algorithm.position = JSON.parse(json.content.position);
    canvas.draw_heat_map(canvas.current_algorithm);
    // console.log(canvas.current_algorithm);
    return json;
  } catch (error) {
    console.error(error);
  }
};
