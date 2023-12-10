# Declare schemas using pydantic, this allows a uniform data shape for our data, apply validation to our data here

from pydantic import BaseModel

# No id provided here because it is auto-incremented and decided in the database
class UserBase(BaseModel):
    username: str
    email: str

# Password is provided here since this is the only class that will not be returned by our API
class UserCreate(UserBase):
    password: str

# Here we are returning data from the database, so we can now include the other attributes e.g id
class User(UserBase):
    id: int
    username: str
    email: str
    disabled: bool

    class Config:
        # orm_mode is now deprecated in favor of from_attributes
        # orm_mode = True
        from_attributes = True
