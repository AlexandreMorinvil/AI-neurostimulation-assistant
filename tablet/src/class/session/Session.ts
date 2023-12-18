import Realm from "realm";
import { SessionSchema } from "src/database/session/sessionSchema";
import { SessionSnapshot } from "./SessionSnapshot";

export class Session {

  private _id: Realm.BSON.ObjectId;
  private _dateStart: Date;
  private _dateCompletion: Date | null;

  constructor(sessionSchema?: SessionSchema) {
    this._id = sessionSchema?._id ?? new Realm.BSON.ObjectId();
    this._dateStart = sessionSchema?.dateStart ?? new Date();
    this._dateCompletion = sessionSchema?.dateCompletion ?? null;
  }

  get dateStart(): Date {
    return this._dateStart;
  }

  get dateCompletion(): Date | null {
    return this._dateCompletion;
  }

  get duration(): number | null {
    return this._dateCompletion ?
      this._dateCompletion.getTime() - this._dateStart.getTime() :
      null;
  }

  get id(): Realm.BSON.ObjectId {
    return this._id;
  }

  get isSessionConcluded(): boolean {
    return Boolean(this.dateCompletion);
  }

  get sessionTime(): number {
    return this.dateCompletion ?
      this.dateCompletion.getTime() - this.dateStart.getTime() :
      new Date().getTime() - this.dateStart.getTime();
  }

  conclude(): void {
    this._dateCompletion = new Date();
  }

  getSnapshot(): SessionSnapshot {
    return new SessionSnapshot(this._id, this.sessionTime);
  }

  isSameAs(session: Session) {
    return this._id.toString() === session.id.toString();
  }
}