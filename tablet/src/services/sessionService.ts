import Realm from "realm";
import { Service } from "@class/Service";
import { Session } from "@class/session/Session";
import { Subject, Subscription } from "rxjs";
import { databaseService } from "./databaseService";
import { SessionSnapshot } from "@class/session/SessionSnapshot";

class SessionService implements Service {

  private activeSession: Session|null = null;
  private sessionStatusSubject: Subject<boolean> = new Subject;

  constructor() {
    // TODO: Verify the database to see if there is an unfinished session to potentially resume.
  }

  get isSessionInProgress(): boolean {
    return (this.activeSession && !this.activeSession.isSessionConcluded) || false;
  }

  concludeSession(): void {
    if (!this.activeSession) return;
    this.activeSession.conclude();
    databaseService.concludeSession(this.activeSession);
    this.sessionStatusSubject.next(this.isSessionInProgress);
  }

  correspondsToActiveSession(session: Session): boolean {
    return this.activeSession?.isSameAs(session) || false;
  }

  destroy(): void { }

  getSnapshot(): SessionSnapshot|null {
    return this.activeSession?.getSnapshot() || null;
  }

  initialize(): void { }

  startSession(): void {
    const session = new Session();
    databaseService.createSession(session);
    this.activeSession = session;
    this.sessionStatusSubject.next(this.isSessionInProgress);
  }

  subscribeToSessionStatus(callback: (isSessionInProgres: boolean) => void): Subscription {
    return this.sessionStatusSubject.subscribe(callback);
  }
}

const sessionService = new SessionService();
export { sessionService }