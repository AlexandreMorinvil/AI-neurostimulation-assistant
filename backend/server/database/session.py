import datetime
from bson import ObjectId
from dataclasses import dataclass, field
from dataclasses_json import config, dataclass_json

@dataclass_json
@dataclass
class Session:
    _id: ObjectId
    date_start: datetime.datetime = field(metadata=config(field_name="dateStart"))
    date_completion: datetime.datetime = field(metadata=config(field_name="dateCompletion"))
