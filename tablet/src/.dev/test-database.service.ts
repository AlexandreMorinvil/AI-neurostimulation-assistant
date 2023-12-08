import Realm, { ObjectSchema } from "realm";

// Define your object model
class WatchAccelerometerDataPoint extends Realm.Object<WatchAccelerometerDataPoint> {

  //_id?:  Realm.BSON.ObjectId;
  sessionId!: string;
  // timestamp!: number;
  // accelerationX!: number;
  // accelerationY!: number;
  // accelerationZ!: number;

  static schema: ObjectSchema = {
    name: 'WatchAccelerometerDataPoint',
    properties: {
      _id: { 
        type: 'objectId',
        default: () => new Realm.BSON.ObjectID(),
      },
      sessionId: 'string',
      // timestamp: 'number',
      // accelerationX: 'Number',
      // accelerationY: 'number',
      // accelerationZ: 'number',
    },
    primaryKey: '_id',
  };
}

let realm: Realm;

const config: Realm.Configuration = {
  schema: [WatchAccelerometerDataPoint],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
};

export async function databaseSetupTests() {
  console.log("databaseSetupTests");
  realm = await Realm.open(config);
  console.log("Realm was opened");
}

export async function insertTester() {
  console.log("START OF INSERT QUERY");
  
  let watchAccelerometerDataPoint: unknown;
  realm.write(() => {
    watchAccelerometerDataPoint = realm.create(
      "WatchAccelerometerDataPoint", {
        sessionId: 'Session1',
      }
    );
  })
  console.log("Query result", watchAccelerometerDataPoint);

  console.log("END OF INSERT QUERY");
}


export async function testRetreiveQuery() {
  console.log("START OF QUERY");
  // const result = realm.objectForPrimaryKey(
  //   'WatchAccelerometerDataPoint', 
  //   new Realm.BSON.ObjectId("61e16f21f82a9db6a2094e78")
  // );
  const result = realm.objects('WatchAccelerometerDataPoint');
  console.log("Query result", result);

  console.log("END OF QUERY");
}

export async function closeRealmDatabase() {
  console.log("CLOSING REALM DATABASE");
  realm.close();
  console.log("REALM DATABASE CLOSED");
}

export async function deleteRealmDatabase() {
  Realm.deleteFile(config);
}

// TODO: Remember to include a code realm.close() to avoid memory leaks


export function generateUniqueId() {
  console.log(`UUID: ${new Realm.BSON.UUID().toString()} | ObjectId: ${new Realm.BSON.ObjectID().toString()}`);
}