import { Service } from "@class/Service";

class SessionService implements Service {

  isSessionInProgress: boolean = false;

  constructor() {
    // TODO: Verify the database to see if the is an unfinished session to potentially resume.
  }

  destroy(): void { }

  initialize(): void { }
}

const sessionService = new SessionService();
export { sessionService }