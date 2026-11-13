from fastapi import APIRouter, HTTPException
from typing import List
import time
from app.models.produit import Produit, ProduitCreate, ProduitStockUpdate, calculer_statut

router = APIRouter(prefix="/api/produits", tags=["Produits"])

# Données initiales en mémoire
produits_db: List[Produit] = [
    Produit(
        id="1",
        reference="PROD-001",
        nom="Chaise Ergonomique V1",
        categorie="Mobilier",
        prixUnitaire=199.99,
        stock=45,
        seuilAlerte=10,
        statut="En stock",
        ventesTotal=120
    ),
    Produit(
        id="2",
        reference="PROD-002",
        nom="Bureau Assis-Debout",
        categorie="Mobilier",
        prixUnitaire=499.00,
        stock=4,
        seuilAlerte=5,
        statut="Stock bas",
        ventesTotal=85
    ),
    Produit(
        id="3",
        reference="PROD-003",
        nom='Écran 27" 4K',
        categorie="Électronique",
        prixUnitaire=349.50,
        stock=0,
        seuilAlerte=8,
        statut="Rupture",
        ventesTotal=210
    ),
    Produit(
        id="4",
        reference="PROD-004",
        nom="Clavier Mécanique Sans Fil",
        categorie="Accessoires",
        prixUnitaire=89.90,
        stock=18,
        seuilAlerte=10,
        statut="En stock",
        ventesTotal=340
    ),
    Produit(
        id="5",
        reference="PROD-005",
        nom="Casque Réduction de Bruit",
        categorie="Électronique",
        prixUnitaire=179.00,
        stock=3,
        seuilAlerte=5,
        statut="Stock bas",
        ventesTotal=95
    ),
]

@router.get("/", response_model=List[Produit])
def get_produits():
    return produits_db

@router.post("/", response_model=Produit, status_code=201)
def create_produit(data: ProduitCreate):
    nouveau_produit = Produit(
        id=str(int(time.time() * 1000)),
        reference=data.reference,
        nom=data.nom,
        categorie=data.categorie,
        prixUnitaire=data.prixUnitaire,
        stock=data.stock,
        seuilAlerte=data.seuilAlerte,
        statut=calculer_statut(data.stock, data.seuilAlerte),
        ventesTotal=0
    )
    produits_db.append(nouveau_produit)
    return nouveau_produit

@router.patch("/{produit_id}/stock", response_model=Produit)
def update_stock(produit_id: str, data: ProduitStockUpdate):
    for p in produits_db:
        if p.id == produit_id:
            p.stock = data.stock
            p.statut = calculer_statut(p.stock, p.seuilAlerte)
            return p
    raise HTTPException(status_code=404, detail="Produit introuvable")

@router.delete("/{produit_id}", status_code=204)
def delete_produit(produit_id: str):
    global produits_db
    longueur_init = len(produits_db)
    produits_db = [p for p in produits_db if p.id != produit_id]
    if len(produits_db) == longueur_init:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    return None