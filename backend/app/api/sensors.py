# backend/app/api/sensors.py
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.sensor import SensorData
from ..services.cleaning import clean_sensor_dataframe  # Import cleaning service
from pydantic import BaseModel
from typing import List
import datetime
import pandas as pd
import io

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

@router.post("/upload", response_model=dict)
async def upload_sensors(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    # อ่าน DataFrame
    df = pd.read_csv(io.StringIO(content.decode()), parse_dates=["timestamp"])
    cleaned_df, stats = clean_sensor_dataframe(df)
    # บันทึกลง DB
    for _, row in cleaned_df.iterrows():
        sensor = SensorData(
            name=row["name"],
            value=row["value"],
            timestamp=row["timestamp"]
        )
        db.add(sensor)
    db.commit()
    return stats
