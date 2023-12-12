import { Service } from "@class/Service";
import { Subject, Subscription } from "rxjs";

class SessionService implements Service {

  isSessionInProgress: boolean = false;
  private sessionStatusSubject: Subject<boolean> = new Subject;

  constructor() {
    // TODO: Verify the database to see if the is an unfinished session to potentially resume.
  }

  concludeSession(): void {
    this.isSessionInProgress = false;
    this.sessionStatusSubject.next(this.isSessionInProgress);
  }

  destroy(): void { }

  initialize(): void { }

  startSession(): void {
    this.isSessionInProgress = true;
    this.sessionStatusSubject.next(this.isSessionInProgress);
  }

  subscribeToSessionStatus(callback: (isSessionInProgres: boolean) => void): Subscription {
    return this.sessionStatusSubject.subscribe(callback);
  }
}

const sessionService = new SessionService();
export { sessionService }