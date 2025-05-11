# backend/app/models/sensor.py
from sqlalchemy import Column, Integer, String, DateTime, Float
from .base import Base
import datetime

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    value = Column(Float, nullable=False)
