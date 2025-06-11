from fastapi import APIRouter, Depends
from app.core.auth import verify_jwt
router = APIRouter()
STGS = []
@router.get("/", dependencies=[Depends(verify_jwt)])
def get_stgs():
    return STGS
@router.post("/", dependencies=[Depends(verify_jwt)])
def add_stg(stg: dict):
    stg["id"] = len(STGS) + 1
    STGS.append(stg)
    return stg