from pydantic import BaseModel
from typing import Literal, Optional

StatutProduit = Literal['En stock', 'Stock bas', 'Rupture']

class ProduitBase(BaseModel):
    reference: str
    nom: str
    categorie: str = "Général"
    prixUnitaire: float
    stock: int
    seuilAlerte: int = 5

class ProduitCreate(ProduitBase):
    pass

class ProduitStockUpdate(BaseModel):
    stock: int
    
class Produit(ProduitBase):
    id: str
    statut: StatutProduit
    ventesTotal: int = 0

def calculer_statut(stock: int, seuil_alerte: int) -> StatutProduit:
    if stock <= 0:
        return 'Rupture'
    if stock <= seuil_alerte:
        return 'Stock bas'
    return 'En stock'