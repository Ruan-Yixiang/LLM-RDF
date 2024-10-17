FROM python:3.8.19

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 81

CMD ["python", "backend/backend.py"]
