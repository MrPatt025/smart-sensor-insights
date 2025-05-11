# 1. ใช้ Node.js 18 เป็น base
FROM node:20-alpine3.20

# 2. ตั้ง working directory เป็น /app
WORKDIR /app

# 3. คัดลอกไฟล์ package*.json มาเพื่อติดตั้ง dependencies
COPY package*.json ./

# 4. ใช้ npm install เพื่อติดตั้ง dependencies ทั้งหมด
RUN npm install

# 5. คัดลอกโค้ดทั้งหมดเข้าไป
COPY . .

# 6. คำสั่งเริ่มต้น: รัน dev server ของ Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
