# Declare schemas using pydantic, this allows a uniform data , apply validation to our data, and convert between json and python objects
from typing import Annotated
from pydantic import BaseModel, Field
from fastapi import Query





class FormBase(BaseModel):
    form: str


class FormCreate(FormBase):
    pass
    
class Form(FormBase):
    id: int
    owner_id: int
    
    
    class ConfigDict:
        from_attributes = True
        
        
        
# The common attributes of UserCreate and User class go here to avoid duplication
class UserBase(BaseModel):
    # the "= ..." tells fastapi and pydantic that this is a required field
    username: Annotated[str , Query(min_length=3,max_length=13,pattern=("^[a-zA-Z0-9]{3,13}$"))] = ...
    email: Annotated[str , Query(min_length=4,max_length=30,pattern=("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))] = ...

# Password is provided here since this is the only class that will not be returned by our API (we don't want to return the password)
class UserCreate(UserBase):
    password: Annotated[str , Query(min_length=8,max_length=22,pattern=("^[a-zA-Z\d][a-zA-Z\d!?%&*]{7,21}$"))] = ...

# Here we are returning data from the database, so we can now include the other attributes e.g id
class User(UserBase):
    id: int
    username: str
    email: str
    disabled: bool
    form: list[Form] = []
    class ConfigDict:
        # orm_mode is now deprecated in favor of from_attributes
        orm_mode = True
        # from_attributes = True