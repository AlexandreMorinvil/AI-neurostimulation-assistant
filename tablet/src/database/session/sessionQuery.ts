import Realm from "realm";
import { Session } from "@class/session/Session";
import { SessionSchema } from "./sessionSchema";

export function createSession(realm: Realm, session: Session) {
  realm.write(() => {
    realm.create(SessionSchema, SessionSchema.generateRecord(session));
  });
}

export function deleteSessions(realm: Realm, sessionIds: Array<Realm.BSON.ObjectId>) {
  realm.write(() => {
    sessionIds.forEach((sessionId) => {
      const session = realm.objectForPrimaryKey(SessionSchema, sessionId);
      realm.delete(session);
    });
  });
}

export function getAllSessions(realm: Realm): Array<Session> {
  const sessions = realm.objects(SessionSchema);
  return sessions.map((session) => session.generateEntity());
}

export function setSessionAsCompleted(realm: Realm, session: Session) {
  realm.write(() => {
    const sessionRecord: SessionSchema = realm.objectForPrimaryKey(
      SessionSchema,
      session.id,
    ) as SessionSchema;
    sessionRecord.dateCompletion = session.dateCompletion || new Date();
  });
}