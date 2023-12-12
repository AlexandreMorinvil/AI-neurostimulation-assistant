import Realm from "realm";
import { Service } from "@class/Service";
import { Session } from "@class/session/Session";
import { SessionSnapshot } from "@class/session/SessionSnapshot";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { 
  SmartWatchAccelerometerPointSchema, 
  SmartwatchGyroscopePointSchema, 
} from "@database/sensorPoint/sensorPointSchema";
import { SessionSchema } from "@database/session/sessionSchema";
import * as sessionQuery from "@database/session/sessionQuery";
import * as sensorPointQuery from "@database/sensorPoint/sensorPointQuery";

class DatabaseService implements Service {

  private realm!: Realm;

  constructor() {
    const configuration: Realm.Configuration = {
      deleteRealmIfMigrationNeeded: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      schemaVersion: 1,
      schema: [
        SessionSchema,
        SmartWatchAccelerometerPointSchema,
        SmartwatchGyroscopePointSchema,
      ],
    };
    Realm.open(configuration).then((realm: Realm) => {
      this.realm = realm;
    });
  }

  /**
   * Service interface
   */

  destroy(): void {
    this.realm?.close();
  }

  initialize(): void { }

  /**
   * Database queries 
   */

  createSession(session: Session): void {
    sessionQuery.createSession(this.realm, session);
  }

  concludeSession(session: Session): void {
    sessionQuery.setSessionAsCompleted(this.realm, session);
  }

  storeSmartwatchAccelerometerPoint(
    smartWatchAccelerometerPoints: Array<SmartwatchAccelerometerPoint>,
    sessionSnapshot?: SessionSnapshot|null): void {
    sensorPointQuery.createSmartwatchAccelerometerPoints(
      this.realm,
      smartWatchAccelerometerPoints,
      sessionSnapshot || undefined,
    );
    console.log("Accelerometer point saved");
  }

  storeSmartwatchGyroscopePoint(
    smartWatchGyroscopePoints: Array<SmartwatchGyroscopePoint>,
    sessionSnapshot?: SessionSnapshot|null): void {
    sensorPointQuery.createSmartwatcGyroscopePoints(
      this.realm,
      smartWatchGyroscopePoints,
      sessionSnapshot || undefined,
    );
    console.log("Gyroscope point saved");
  }
}

const databaseService = new DatabaseService();
export { databaseService }