from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import produit

app = FastAPI(title="API CRM")

# Autoriser les requêtes depuis le frontend React (localhost:5173 ou 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes produits
app.include_router(produit.router)

@app.get("/")
def root():
    return {"message": "API CRM opérationnelle"}