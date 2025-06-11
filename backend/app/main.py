from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import agent, stg, auth

app = FastAPI(title="Green Leaf Traceability API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # allow any frontend to talk
    allow_credentials=True,
    allow_methods=["*"],            # allow all HTTP methods (GET/POST/etc)
    allow_headers=["*"],            # allow all headers
)

app.include_router(agent.router, prefix="/agents", tags=["Agents"])
app.include_router(stg.router, prefix="/stgs", tags=["STGs"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
