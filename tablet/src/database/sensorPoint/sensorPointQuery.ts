import Realm from "realm";
import { SessionSnapshot } from "@class/session/SessionSnapshot";
import { SmartwatchAccelerometerPoint } from "@class/sensorPoint/SmartwatchAccelerometerPoint";
import { SmartWatchAccelerometerPointSchema } from "./sensorPointSchema";
import { SmartwatchGyroscopePoint } from "@class/sensorPoint/SmartwatchGyroscopePoint";
import { SmartwatchGyroscopePointSchema } from "./sensorPointSchema";

export function createSmartwatchAccelerometerPoints(
  realm: Realm,
  smartwatchAccelerometerPoints: Array<SmartwatchAccelerometerPoint>,
  sessionSnapshot: SessionSnapshot,
) {
  realm.write(() => {
    smartwatchAccelerometerPoints.forEach((point) => {
      realm.create(
        SmartWatchAccelerometerPointSchema,
        SmartWatchAccelerometerPointSchema.generateRecord(point, sessionSnapshot),
      );
    });
  });
}

export function createSmartwatcGyroscopePoints(
  realm: Realm,
  smartwatchGyroscopePoints: Array<SmartwatchGyroscopePoint>,
  sessionSnapshot: SessionSnapshot,
) {
  realm.write(() => {
    smartwatchGyroscopePoints.forEach((point) => {
      realm.create(
        SmartwatchGyroscopePointSchema,
        SmartwatchGyroscopePointSchema.generateRecord(point, sessionSnapshot),
      );
    })
  });
}

export function getAccelerometerPointsCountForSession(
  realm: Realm, 
  sessionId: Realm.BSON.ObjectId
) {
  const sessions = realm.objects(SmartWatchAccelerometerPointSchema);
  return sessions.filtered("sessionId == $0", sessionId).length;
}

export function getGyroscopePointsCountForSession(
  realm: Realm, 
  sessionId: Realm.BSON.ObjectId
) {
  const sessions = realm.objects(SmartwatchGyroscopePointSchema);
  return sessions.filtered("sessionId == $0", sessionId).length;
}