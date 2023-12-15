import Realm from "realm";
import { SessionSnapshot } from "@class/session/SessionSnapshot";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartWatchAccelerometerPointSchema } from "./sensorPointSchema";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
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