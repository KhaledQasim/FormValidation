from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(14), unique=True, nullable=False)
    email = Column(String(40), unique=True ,nullable=False)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)
    
