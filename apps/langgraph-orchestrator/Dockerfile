FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir -U pip

COPY apps/langgraph-orchestrator/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY apps/langgraph-orchestrator/main.py /app/main.py
COPY apps/langgraph-orchestrator/graph_app.py /app/graph_app.py
COPY apps/langgraph-orchestrator/refusal_patterns.yaml /app/refusal_patterns.yaml

ENV REPO_ROOT=/repo
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
