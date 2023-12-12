import Realm from "realm";

export class SessionSnapshot {

  sessionId!: Realm.BSON.ObjectId;
  sessionTime!: number;

  constructor(sessionId: Realm.BSON.ObjectId, sessionTime: number) {
    this.sessionId = sessionId;
    this.sessionTime = sessionTime;
  }
}