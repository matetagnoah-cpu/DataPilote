from fastapi import FastAPI

app = FastAPI(title="DataPilote API")


@app.get("/")
def root():
    return {
        "message": "Bienvenue sur l'API DataPilote"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }