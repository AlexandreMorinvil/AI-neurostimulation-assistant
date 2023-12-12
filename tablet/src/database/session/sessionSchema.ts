import Realm, { ObjectSchema } from "realm";

/**
 * The 'schemaVersion' of the Realm.Configuration must be incremented when a schema is modified.
 */

export class SessionSchema extends Realm.Object<SessionSchema> {

  _id!: Realm.BSON.ObjectId;
  dateStart!: Date;
  dateCompletion!: Date;

  static schema: ObjectSchema = {
    name: 'Session',
    properties: {
      _id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectID(),
      },
      dateStart: 'date',
      dateCompletion: 'date?',
    },
    primaryKey: '_id',
  };
}
