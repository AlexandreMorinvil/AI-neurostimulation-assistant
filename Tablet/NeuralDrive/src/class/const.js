import React from 'react';

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

class ServerConnection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      patient_level: 10,
      smartwatch_connected: false,
      server_ip: 'http://10.0.2.2:5000',
    }
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
    return (
      <TextInput>
        Connected to: {get_server_ip()}
      </TextInput>
    )
  }
}

export {ServerConnection};
