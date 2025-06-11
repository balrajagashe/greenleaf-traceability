from fastapi import APIRouter, Depends
from app.core.auth import verify_jwt
router = APIRouter()
AGENTS = []
@router.get("/", dependencies=[Depends(verify_jwt)])
def get_agents():
    return AGENTS
@router.post("/", dependencies=[Depends(verify_jwt)])
def add_agent(agent: dict):
    agent["id"] = len(AGENTS) + 1
    AGENTS.append(agent)
    return agent