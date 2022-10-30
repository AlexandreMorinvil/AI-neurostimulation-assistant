patient_level = 10;
smartwatch_connected = false;
server_ip = 'http://10.0.2.2:5000';

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

export function set_server_ip(ip) {
  server_ip = ip;
}

export function get_server_ip() {
  return server_ip;
}
