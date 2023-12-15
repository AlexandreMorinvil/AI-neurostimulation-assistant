import Realm from "realm";
import { SessionSchema } from "./session/sessionSchema";
import { SmartWatchAccelerometerPointSchema, SmartwatchGyroscopePointSchema } from "./sensorPoint/sensorPointSchema";

export const realmConfiguration: Realm.Configuration = {
  deleteRealmIfMigrationNeeded: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  schemaVersion: 1,
  schema: [
    SessionSchema,
    SmartWatchAccelerometerPointSchema,
    SmartwatchGyroscopePointSchema,
  ],
};