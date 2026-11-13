# DataPilote

Application de gestion et d’analyse de données destinée aux PME.

## Lancement du frontend

Depuis la racine du projet :

    cd frontend
    npm run dev

Ouvre http://localhost:5173 dans ton navigateur.

## Lancement du backend

Dans un deuxième terminal :

    cd backend
    source venv/bin/activate
    uvicorn app.main:app --reload

API disponible sur http://127.0.0.1:8000
