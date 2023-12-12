import Realm from "realm";
import { SessionSchema } from "../../database/session/sessionSchema";
import { SessionSnapshot } from "./SessionSnapshot";

export class Session {
  
  private _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  private _dateStart: Date = new Date();
  private _dateCompletion: Date | null = null;
  
  get dateStart(): Date {
    return this._dateStart;
  }

  get dateCompletion(): Date|null {
    return this._dateCompletion;
  }

  get id() {
    return this._id;
  }

  get isSessionConcluded(): boolean {
    return !Boolean(this.dateCompletion);
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

  generateDatabaseEntry(): SessionSchema {
    return {
      _id: this._id,
      dateStart: this.dateStart,
      dateCompletion: this.dateCompletion,
    } as SessionSchema;
  }
}