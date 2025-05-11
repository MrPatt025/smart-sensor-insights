# backend/app/main.py
from fastapi import Depends, HTTPException, FastAPI
from sqlalchemy.orm import Session
from .core.database import engine, get_db
from .models.base import Base
from .api.sensors import router as sensor_router  # Import sensor router

app = FastAPI()

# สร้างตารางเมื่อเริ่มระบบ
Base.metadata.create_all(bind=engine)

# เชื่อม router
app.include_router(sensor_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# placeholder for sensor router
@app.get("/sensors")
async def read_sensors(db: Session = Depends(get_db)):
    return {"message": "List sensors will be here"}
