FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV MONGO_URI=mongodb://root:p@sswort@mongo_book_shop:27017/admin


# Before start, wait for mongo
CMD ["/bin/sh", "-c", "sleep 5 && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"]
