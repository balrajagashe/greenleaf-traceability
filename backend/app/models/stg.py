from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from app.core.database import Base

class STG(Base):
    __tablename__ = "stgs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    agent_id = Column(Integer, ForeignKey("agents.id"))
    land_area = Column(Float)
    last_pluck_date = Column(Date)