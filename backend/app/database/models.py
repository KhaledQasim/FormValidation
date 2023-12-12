from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(14), unique=True, nullable=False)
    email = Column(String(40), unique=True ,nullable=False)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)
    
    form = relationship("Form", back_populates="owner")
    
class Form(Base):
    __tablename__ = "forms"
    
    id = Column(Integer, primary_key=True, index=True)
    form = Column(String, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="form")
    