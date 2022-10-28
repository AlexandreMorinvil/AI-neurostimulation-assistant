patient_level = 10;
smartwatch_connected = false;

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
