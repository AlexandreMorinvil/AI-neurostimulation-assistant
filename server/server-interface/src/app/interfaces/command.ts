export interface Command {
  action: Action;
  arg: any;
}

export enum Action {
  START_ALGORITHM = 0
}
