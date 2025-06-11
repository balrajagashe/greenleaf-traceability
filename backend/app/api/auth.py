from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt

router = APIRouter()
SECRET_KEY = "greenleaf-secret"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    if req.email == "balraj.agashe@gmail.com" and req.password == "balraj@123":
        token = jwt.encode(
            {"sub": req.email, "exp": datetime.utcnow() + timedelta(hours=2)},
            SECRET_KEY, algorithm=ALGORITHM
        )
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")