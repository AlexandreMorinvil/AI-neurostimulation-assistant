import React from 'react';

patient_level = 10;
smartwatch_connected = false;
server_ip = 'http://localhost:5000';
const SERVER_DELAY = 1000;
allow_get_watch_data = true;

mutex = false;

export function get_mutex() {
  return mutex;
}

export function set_mutex(state) {
  mutex = state;
}

export function set_allow_get_watch_data(state) {
  allow_get_watch_data = state;
}

export function get_allow_get_watch_data() {
  return allow_get_watch_data;
}

heat_map_data = [];
dimension_of_chart = 0;


export function set_heat_map_data(data){
  heat_map_data = data;
}

export function get_heat_map_data(){
  return heat_map_data;
}

export function set_dimension_of_chart(dimension){
  dimension_of_chart = dimension;
}

export function get_dimension_of_chart(){
  return dimension_of_chart;
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

export function set_server_ip(ip) {
  server_ip = ip;
}

export function get_server_ip() {
  return server_ip;
}

class ServerConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_level: 10,
      smartwatch_connected: false,
      server_ip: 'http://10.0.2.2:5000',
    };
  }

  set_patient_level(lvl) {
    this.setState({patient_level: lvl});
  }

  get_patient_level() {
    return patient_level;
  }

  smartwatch_is_disconnected() {
    this.setState({smartwatch_connected: false});
  }

  smartwatch_is_connected() {
    this.setState({smartwatch_connected: true});
  }

  get_smartwatch_connected() {
    return smartwatch_connected;
  }

  set_server_ip(ip) {
    server_ip = ip;
    this.setState({server_ip: ip});
  }

  get_server_ip() {
    return server_ip;
  }

  render() {
    return <Text>Connected to: {get_server_ip()}</Text>;
  }
}

export {ServerConnection};
