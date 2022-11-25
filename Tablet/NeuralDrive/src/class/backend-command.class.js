export class BackendCommand {
  constructor(action = null, args = {}) {
    this.action = action;
    this.arguments = args;
  }

  get action() {
    return this.action;
  }

  get arguments() {
    return this.arguments;
  }

  stringify() {
    return JSON.stringify({
      action: this.action,
      arg: this.arguments
    });
  }
}