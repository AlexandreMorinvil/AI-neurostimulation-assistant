import { SessionSnapshot } from "@class/session/SessionSnapshot";

export abstract class SensorPoint {

  timestamp!: number;  

  constructor(timestamp: number) {
    this.timestamp = timestamp;
  }

  abstract get magnitude(): unknown;
  abstract generateDatabaseEntry(sessionSnapshot?: SessionSnapshot): unknown;
} 