from fastapi import FastAPI
from app.api import agent, stg, auth

app = FastAPI(title="Green Leaf Traceability API")

app.include_router(agent.router, prefix="/agents", tags=["Agents"])
app.include_router(stg.router, prefix="/stgs", tags=["STGs"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])