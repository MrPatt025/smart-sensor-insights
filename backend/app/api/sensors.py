# backend/app/api/sensors.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.sensor import SensorData
from pydantic import BaseModel
from typing import List
import datetime

router = APIRouter(prefix="/sensors", tags=["sensors"])

class SensorCreate(BaseModel):
    name: str
    value: float
    timestamp: datetime.datetime = None

@router.post("/", response_model=SensorCreate)
def create_sensor(data: SensorCreate, db: Session = Depends(get_db)):
    sensor = SensorData(
        name=data.name,
        value=data.value,
        timestamp=data.timestamp or datetime.datetime.utcnow()
    )
    db.add(sensor)
    db.commit()
    db.refresh(sensor)
    return sensor

@router.get("/", response_model=List[SensorCreate])
def list_sensors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(SensorData).offset(skip).limit(limit).all()
