import Realm from "realm";
import { Session } from "@class/session/Session";
import { SessionSchema } from "./sessionSchema";

export function createSession(realm: Realm, session: Session) {
  realm.write(() => {
    realm.create(
      SessionSchema.schema.name,
      session.generateDatabaseEntry()
    );
  });
}

export function setSessionAsCompleted(realm: Realm, session: Session) {
  realm.write(() => {
    const sessionRecord: SessionSchema = realm.objectForPrimaryKey(
      SessionSchema.schema.name,
      session.id
    ) as SessionSchema;
    sessionRecord.dateCompletion = session.dateCompletion || new Date();
  });
}