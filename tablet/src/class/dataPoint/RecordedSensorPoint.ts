import { SessionSnapshot } from "@class/session/SessionSnapshot";

export class RecordedSensorPoint<SensorPointType> {

  private _sensorPoint!: SensorPointType;
  private _sessionSnapshot!: SessionSnapshot;

  constructor(sensorPoint: SensorPointType, sessionSnapshot: SessionSnapshot) {
    this._sensorPoint = sensorPoint;
    this._sessionSnapshot = sessionSnapshot;
  }

  get sensorPoint(): SensorPointType {
    return this._sensorPoint;
  }

  get sessionSnapshot(): SessionSnapshot {
    return this._sessionSnapshot;
  }
} 