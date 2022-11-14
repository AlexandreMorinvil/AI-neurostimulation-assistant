export const Action = {
  START_SESSION: 0,
  CONNECT_WATCH: 1,
  RECEIVE_DATA_WATCH: 2,
  EXECUTE_QUERY: 3,
  GET_WATCH_DATA: 4,
  SAVE_SESSION: 5,
};

export const Status = {
  IDLE: 3,
  STOP: 0,
  START: 1,
};

export const ERROR_CODE = {
  FAIL_CONNECT_TO_SERVER: -1,
};
