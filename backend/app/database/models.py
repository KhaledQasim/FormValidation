from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean ,Enum , JSON
from sqlalchemy.orm import relationship
import enum
class Nationality(enum.Enum):
    English = "English"
    Scottish = "Scottish"
    Welsh = "Welsh"
    

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
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(Integer, nullable=False)
    dob = Column(DateTime, nullable=False)
    address = Column(String, nullable=False)
    post_code = Column(String, nullable=False)
    company = Column(String, nullable=False)
    nationality = Column(Enum(Nationality), nullable=False)
    json_file = Column(JSON, nullable=False)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="form")
    