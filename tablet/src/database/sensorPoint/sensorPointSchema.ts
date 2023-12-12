import Realm, { ObjectSchema } from "realm";

/**
 * The 'schemaVersion' of the Realm.Configuration must be incremented when a schema is modified.
 */

export class SmartWatchAccelerometerPointSchema extends
  Realm.Object<SmartWatchAccelerometerPointSchema> {

  _id?: Realm.BSON.ObjectId;
  sessionId!: Realm.BSON.ObjectId;
  sessionTime?: number;
  timestamp!: number;
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
}

export class SmartwatchGyroscopePointSchema extends
  Realm.Object<SmartwatchGyroscopePointSchema> {

  _id?: Realm.BSON.ObjectId;
  sessionId!: Realm.BSON.ObjectId;
  sessionTime?: number;
  timestamp!: number;
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
}