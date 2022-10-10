export const send_request = async url => {
  try {
    const response = await fetch(server_url);
    const json = await response.json();
    console.log(json);
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
