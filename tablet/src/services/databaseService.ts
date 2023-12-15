import Realm from "realm";
import { Service } from "@class/Service";
import { Session } from "@class/session/Session";
import { SessionSnapshot } from "@class/session/SessionSnapshot";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { realmConfiguration } from "src/database/configuration";
import * as sessionQuery from "src/database/session/sessionQuery";
import * as sensorPointQuery from "src/database/sensorPoint/sensorPointQuery";
import { Subject, Subscription } from "rxjs";

class DatabaseService implements Service {

  private realm!: Realm;
  private sessionsSubscription: Subject<void> = new Subject();

  constructor() {
    this.realm = new Realm(realmConfiguration);
  }

  get isInitialized(): boolean {
    return Boolean(this.realm);
  }

  /**
   * Service interface
   */
  
  destroy(): void { }

  initialize(): void {
    if(this.isInitialized) return;
    this.realm = new Realm(realmConfiguration);
  }

  /**
   * Database queries 
   */

  createSession(session: Session): void {
    sessionQuery.createSession(this.realm, session);
    this.sessionsSubscription.next();
  }

  concludeSession(session: Session): void {
    sessionQuery.setSessionAsCompleted(this.realm, session);
    this.sessionsSubscription.next();
  }

  getAllSessions(): Array<Session> {
    return sessionQuery.getAllSessions(this.realm);
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

  /**
   * Subscriptions
   */
  subscribeToSessions(callback: () => void): Subscription {
    return this.sessionsSubscription.subscribe(callback);
  }
}

const databaseService = new DatabaseService();
export { databaseService }