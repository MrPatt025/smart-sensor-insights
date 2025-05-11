# 1. ใช้ Python 3.13-slim image เป็น base
FROM python:3.13-slim

# 2. ตั้ง working directory ใน container เป็น /app
WORKDIR /app

# 3. คัดลอกไฟล์ requirements.txt เข้าไป
COPY requirements.txt .

# 4. ติดตั้ง Python dependencies โดยไม่เก็บ cache
RUN pip install --no-cache-dir -r requirements.txt

# 5. คัดลอกโค้ดของคุณเข้าไปใน /app/app
COPY ./app ./app

# 6. คำสั่งเริ่มต้นเมื่อรัน container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
