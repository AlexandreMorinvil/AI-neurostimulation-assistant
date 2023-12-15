import { RecordedSensorPoint } from "@class/dataPoint/RecordedSensorPoint";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { SessionSnapshot } from "@class/session/SessionSnapshot";
import Realm, { ObjectSchema } from "realm";

/**
 * The 'schemaVersion' of the Realm.Configuration must be incremented when a schema is modified.
 */

export abstract class SensorPointSchema<T> extends Realm.Object<T> {
  _id!: Realm.BSON.ObjectId;
  sessionId!: Realm.BSON.ObjectId;
  sessionTime!: number;
  timestamp!: number;
}

/**
 * Concrete schemas
 */

export class SmartWatchAccelerometerPointSchema extends
  SensorPointSchema<SmartWatchAccelerometerPointSchema> {

  accelerationX!: number;
  accelerationY!: number;
  accelerationZ!: number;

  static schema: ObjectSchema = {
    name: 'SmartWatchAccelerometerPoint',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectID(),
      },
      sessionId: {
        type: 'objectId',
        indexed: true,
      },
      sessionTime: 'int?',
      timestamp: 'int',
      accelerationX: 'float',
      accelerationY: 'float',
      accelerationZ: 'float',
    },
    primaryKey: '_id',
  };

  static generateRecord(point: SmartwatchAccelerometerPoint, sessionSnapshot: SessionSnapshot):
    SmartWatchAccelerometerPointSchema {
    return {
      sessionId: sessionSnapshot.sessionId,
      sessionTime: sessionSnapshot.sessionTime,
      timestamp: point.timestamp,
      accelerationX: point.accelerationX,
      accelerationY: point.accelerationY,
      accelerationZ: point.accelerationZ,
    } as SmartWatchAccelerometerPointSchema;
  }

  generateEntity(): RecordedSensorPoint<SmartwatchAccelerometerPoint> {
    const { timestamp, accelerationX, accelerationY, accelerationZ } = this;
    return new RecordedSensorPoint<SmartwatchAccelerometerPoint>(
      new SmartwatchAccelerometerPoint([timestamp, accelerationX, accelerationY, accelerationZ]),
      new SessionSnapshot(this.sessionId, this.sessionTime),
    );
  }
}

export class SmartwatchGyroscopePointSchema extends
  SensorPointSchema<SmartwatchGyroscopePointSchema> {

  rotationX!: number;
  rotationY!: number;
  rotationZ!: number;

  static schema: ObjectSchema = {
    name: 'SmartWatchGyroscopePoint',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectID(),
      },
      sessionId: {
        type: 'objectId',
        indexed: true,
      },
      sessionTime: 'int?',
      timestamp: 'int',
      rotationX: 'float',
      rotationY: 'float',
      rotationZ: 'float',
    },
    primaryKey: '_id',
  };
  
  static generateRecord(point: SmartwatchGyroscopePoint, sessionSnapshot: SessionSnapshot):
  SmartwatchGyroscopePointSchema {
    return {
      sessionId: sessionSnapshot.sessionId,
      sessionTime: sessionSnapshot.sessionTime,
      timestamp: point.timestamp,
      rotationX: point.rotationX,
      rotationY: point.rotationY,
      rotationZ: point.rotationZ,
    } as SmartwatchGyroscopePointSchema;
  }

  generateEntity(): RecordedSensorPoint<SmartwatchGyroscopePoint> {
    const { timestamp, rotationX, rotationY, rotationZ } = this;
    return new RecordedSensorPoint<SmartwatchGyroscopePoint>(
      new SmartwatchGyroscopePoint([timestamp, rotationX, rotationY, rotationZ]),
      new SessionSnapshot(this.sessionId, this.sessionTime),
    );
  }
}