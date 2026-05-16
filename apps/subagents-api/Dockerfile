FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir -U pip

COPY apps/subagents-api/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY apps/subagents-api/main.py /app/main.py

ENV PYTHONUNBUFFERED=1

EXPOSE 3012

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3012"]
