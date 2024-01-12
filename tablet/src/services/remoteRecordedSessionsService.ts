import { Subject, Subscription } from "rxjs";
import { Service } from "@class/Service";
import { Session } from "@class/session/Session";
import { databaseService } from "./databaseService";

class RemoteRecordedSessionsService implements Service {

  private _selectedSessions: Array<Session> = [];
  private selectedSessionsSubject: Subject<Array<Session>> = new Subject();

  destroy(): void { }

  initialize(): void { }

  get hasSelectedSession(): boolean {
    return this.selectedSessions.length > 0;
  }
  
  get selectedSessions(): Array<Session> {
    return this._selectedSessions;
  }

  get selectedSessionsCount(): number {
    return this._selectedSessions.length;
  }

  deleteSelectedSessions(): void {
    databaseService.deleteSessions(this._selectedSessions.map((session) => session.id));
    this._selectedSessions = [];
    this.selectedSessionsSubject.next(this.selectedSessions);
  }

  subscribeToSelectedSessions(callback: (selectedSessions: Array<Session>) => void): Subscription {
    return this.selectedSessionsSubject.subscribe(callback);
  }

  toggleSessionSelection(session: Session): void {
    const index = this._selectedSessions.findIndex((element) => session.isSameAs(element));
    if (index === -1) 
      this._selectedSessions.push(session);
    else
      this._selectedSessions.splice(index, 1);
    this.selectedSessionsSubject.next(this.selectedSessions);
  }

  unselectAll(): void {
    this._selectedSessions = [];
    this.selectedSessionsSubject.next(this.selectedSessions);
  }
}

const remoteRecordedSessionsService = new RemoteRecordedSessionsService();
export { remoteRecordedSessionsService }