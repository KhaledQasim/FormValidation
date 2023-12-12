from typing import Annotated
from datetime import datetime, timedelta

from ..database import models, schemas, crud
from ..database.database import SessionLocal, engine


from fastapi import Depends, APIRouter, HTTPException, status, Cookie, Response, FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError
from jose import jwt as JWT
from sqlalchemy.orm import Session

# Declare URI routes of this file
router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    # dependencies=[Depends(oauth2_scheme)],

)
# creates all tables in database
models.Base.metadata.create_all(bind=engine)
# Dependency needed to be used in every file that needs to access the database, below when using "yield" it will create new SQLAlchemy SessionLocal for a single request and then close it once the request is finished.


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependancy = Annotated[Session, Depends(get_db)]


# JWT Config
SECRET_KEY = "2241dd92e1054a55240b17076b1e8db94ab854fb4bcc98cd04eeeef0b7b52d9a"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Pydantic model for token api response
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# If changing the prefix of this files route then change the tokenUrl to match the new route
oauth2_bearer_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


@router.post("/")
async def create_user(db: db_dependancy,
                      create_user: schemas.UserCreate):
    """Create a new user in the database

    Args:
        db (db_dependancy): A dependancy that creates a new SQLAlchemy SessionLocal for a single request and then closes it once the request is finished.
        create_user (schemas.UserCreate): Takes in data based on schemas.UserCreate Pydantic model, in that model we can apply validation. 

    Returns:
        201 (StatusCode): 201 Status code for successful creation of a new user
    """
    
    username = crud.get_user_by_username(db, create_user.username)
    email = crud.get_user_by_email(db, create_user.email)
    if username is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    if email is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists",
        )
    else:
        create_user_model = models.User(
            username=create_user.username,
            email=create_user.email,
            hashed_password=pwd_context.hash(create_user.password),
        )
    crud.create_user(db, create_user_model)

    # user = authenticate_user(db, create_user.username, create_user.password)
    # token = create_access_token(user.username, user.id, timedelta(minutes=30))
    content = {"message": "User created successfully"}
    # content = {"access_token": token, "token_type": "bearer"}    
    response = JSONResponse(content=content)
    # response.set_cookie(key="jwt", value=token,httponly=True,samesite="strict",secure=True)
    return response
  
        
        
   


# @router.post("/token", response_model=Token)
@router.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependancy):
    """Takes in a username and password from the user and checks if the user exists in the database 
    and if the password matches the hashed password in the database.

    Args:
        form_data (Annotated[OAuth2PasswordRequestForm): takes in a username and password from the user in the form format of OAuth2PasswordRequestForm
        db (db_dependancy): database session dependancy since we need to access the database to check if the user exists and if the password matches the hashed password in the database

    Raises:
        HTTPException: If the user is not found or the password does not match then an error is raised

    Returns:
        Token (object): returns a token object with the access_token and token_type
    """

    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
        
        
    token = create_access_token(user.username, user.id, timedelta(minutes=180))
    content = {"message": "User is valid, token created successfully"}
    response = JSONResponse(content=content)
    response.set_cookie(key="jwt", value=token,httponly=True,samesite="strict",secure=True)
    return response
    
    # return {"access_token": token, "token_type": "bearer"}




def authenticate_user(db, username: str, password: str):
    """
    Authenticates a user by checking if the username and password match the database record for that user.

    Args:
        db (object): database session
        username (str): sent username from the user
        password (str): sent password from the user

    Returns:
        user (str of user in database): if the user is found and the password matches then the user is returned else False is returned
    """
    email = crud.get_user_by_email(db, username)
    user = crud.get_user_by_username(db, username)
   
    if not email and not user:
        return False
    elif email:
        if not pwd_context.verify(password, email.hashed_password):
            return False
        return email
    elif user:
        if not pwd_context.verify(password, user.hashed_password):
            return False
        return user
    
   


def create_access_token(username: str, user_id: int, expires_delta: timedelta | None = None):
    """
    Creates a JWT token that expires in 30 minutes

    Args:
        username (str): username of the user
        user_id (int): user_id of the user
        expires_delta (timedelta, optional): How long the token will last. Defaults to None.

    Returns:
        token (token): A signed token with the user's info that expires in 30 minutes
    """
    to_encode = {"exp": datetime.utcnow() + expires_delta,
                 "sub": username,
                 "id": user_id}
    # Below line could be used to add more data to the token
    # to_encode.update({"exp": datetime.utcnow() + expires_delta})
    encoded_jwt = JWT.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user_from_jwt(token: Annotated[str, Depends(oauth2_bearer_scheme)]):
    try:
        payload = JWT.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user credentials",)
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user credentials",)
        
        
async def get_current_user_from_jwt_cookie(jwt: str = Cookie(None)):
    try:
        if not jwt:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="No provided cookie",)
        payload = JWT.decode(jwt, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user credentials",)
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user credentials",)
    # print (jwt)
    # return  {"cookie_value": jwt}

