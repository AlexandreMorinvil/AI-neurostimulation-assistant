var current_heat_map = [];

var watch_data = [];

var current_user = 'Noe';

/************************** SMART WATCH ********************************/
/***********************************************************************/
export function insert_watch_data(data) {
  watch_data.push(data);
}

export function get_watch_data(data) {
  watch_data.push(data);
}
/***********************************************************************/

/********************************** USER********************************/
/***********************************************************************/
export function set_current_user(user) {
  current_user = user;
}

export function get_current_user(user) {
  return current_user;
}
/***********************************************************************/

/********************************HEAT MAP*******************************/
/***********************************************************************/
export function set_heat_map(heat_map) {
  current_heat_map = heat_map;
}

export function get_heat_map(user) {
  return current_heat_map;
}
/***********************************************************************/
