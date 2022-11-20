patient_level = 10;
smartwatch_connected = false;

heat_map_data = [];
chosen_param_2D = 0;


export function set_heat_map_data(data){
  heat_map_data = data;
}

export function get_heat_map_data(){
  return heat_map_data;
}

export function set_chosen_param_2D(param){
  chosen_param_2D = param;
}

export function get_chosen_param_2D(){
  return chosen_param_2D;
}

export function set_patient_level(lvl) {
  patient_level = lvl;
}

export function get_patient_level() {
  return patient_level;
}

export function smartwatch_is_disconnected() {
  smartwatch_connected = false;
}

export function smartwatch_is_connected() {
  smartwatch_connected = true;
}

export function get_smartwatch_connected() {
  return smartwatch_connected;
}
