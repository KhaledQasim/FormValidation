from typing import Annotated
from datetime import datetime, timedelta

from ..database import models, schemas, crud
from ..database.database import SessionLocal, engine


from fastapi import Depends, APIRouter, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
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


@router.post("/", status_code=status.HTTP_201_CREATED)
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


@router.post("/token", response_model=Token)
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
    token = create_access_token(user.username, user.id, timedelta(minutes=30))
    return {"access_token": token, "token_type": "bearer"}


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
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
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
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user_from_jwt(token: Annotated[str, Depends(oauth2_bearer_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user credentials",)
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user credentials",)

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# def get_password_hash(password):
#     return pwd_context.hash(password)


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)


# def authenticate_user(fake_db, username: str, password: str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user


# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user


# async def get_current_active_user(
#     current_user: Annotated[User, Depends(get_current_user)]
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user


# @router.post("/token", response_model=Token)
# async def login_for_access_token(
#     form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
# ):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


# @router.get("/users/me/", response_model=User)
# async def read_users_me(
#     current_user: Annotated[User, Depends(get_current_active_user)]
# ):
#     return current_user


# @router.get("/users/me/items/")
# async def read_own_items(
#     current_user: Annotated[User, Depends(get_current_active_user)]
# ):
#     return [{"item_id": "Foo", "owner": current_user.username}]
