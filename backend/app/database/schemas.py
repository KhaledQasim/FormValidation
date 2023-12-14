# Declare schemas using pydantic, this allows a uniform data , apply validation to our data, and convert between json and python objects
from typing import Annotated, Any
from enum import Enum
from datetime import date
from pydantic.functional_validators import AfterValidator
from fastapi import Query

from pydantic import (
    Json,
    BaseModel,
    ValidationError,
    ValidationInfo,
    field_validator,
)


class Nationality(str, Enum):
    English = "English"
    Scottish = "Scottish"
    Welsh = "Welsh"


class FormBase(BaseModel):
    # make names 20 long and 1 long for non null names
    first_name: Annotated[str, Query(min_length=1, max_length=20)]
    last_name: Annotated[str, Query(min_length=1, max_length=20)]
    phone: int
    dob: date
    address: Annotated[str, Query(min_length=1, max_length=50)]
    post_code: Annotated[str, Query(min_length=1, max_length=20)]
    company: Annotated[str, Query(min_length=1, max_length=30)]
    nationality: Annotated[Nationality, Query(min_length=1, max_length=40)]
    json_file: Annotated[Json[Any], Json[Any]]

    @field_validator('phone')
    @classmethod
    def check_alphanumeric(cls, v: str):
        if (len(str(v)) < 10 or len(str(v)) > 13):
            raise ValueError("Phone number must be between 2 and 13 digits")
        else:
            return v
       


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
    username: Annotated[str, Query(
        min_length=3, max_length=13, pattern=("^[a-zA-Z0-9]{3,13}$"))] = ...
    email: Annotated[str, Query(min_length=4, max_length=30, pattern=(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))] = ...


# Code below is a custom validator for password syntax since I could not find a regex that would work for all cases
def check_password_syntax(password: str):
    special_symbols = '!£$%^&*-_+=:;@~#?'

    if (len(password) < 8):
        return False

    if (len(password) > 30):
        return False

    if not any(char.islower() for char in password):
        return False

    if not any(char.isupper() for char in password):
        return False

    if not any(char.isdigit() for char in password):
        return False

    if not any(char in special_symbols for char in password):
        return False

    return True

# Password is provided here since this is the only class that will not be returned by our API (we don't want to return the password)


class UserCreate(UserBase):
    # TODO add password regex
    password: str

    @field_validator('password')
    @classmethod
    def check_alphanumeric(cls, v: str):
        # if (len(v) > 30):
        #     raise ValueError("Password must be at least 8 characters long")
        # else:
        #     return v
        if (check_password_syntax(v) == True):
            return v
        else:
            raise ValueError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character of : !£$%^&*-_+=:;@~#?")


# Here we are returning data from the database, so we can now include the other attributes e.g id
class User(UserBase):
    id: int
    username: str
    email: str
    disabled: bool
    form: list[Form] = []

    class ConfigDict:
        # orm_mode is now deprecated in favor of from_attributes
        # orm_mode = True
        from_attributes = True
