from bson import ObjectId
from dataclasses import dataclass, field
from dataclasses_json import config, dataclass_json

@dataclass_json
@dataclass
class SensorPoint:
    _id: ObjectId
    session_id: ObjectId = field(metadata=config(field_name="sessionId"))
    session_time: int = field(metadata=config(field_name="sessionTime"))
    timestamp: int = field(metadata=config(field_name="timestamp"))

@dataclass_json
@dataclass
class SmartWatchAccelerometerPoint(SensorPoint):
    acceleration_x: float = field(metadata=config(field_name="accelerationX"))
    acceleration_y: float = field(metadata=config(field_name="accelerationY"))
    acceleration_z: float = field(metadata=config(field_name="accelerationZ"))

@dataclass_json
@dataclass
class SmartwatchGyroscopePointSchema(SensorPoint):
    rotation_x: float = field(metadata=config(field_name="rotationX"))
    rotation_y: float = field(metadata=config(field_name="rotationY"))
    rotation_z: float = field(metadata=config(field_name="rotationZ"))