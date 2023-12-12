# to run backend app use 
# uvicorn app.main:app --reload

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

from .database.database import SessionLocal, engine
from .database import models

from sqlalchemy.orm import Session

from .routers import auth , form
from .routers.auth import get_current_user_from_jwt, get_current_user_from_jwt_cookie

# Global dependincy
# app = FastAPI(dependencies=[Depends(get_query_token)])

app = FastAPI()
app.include_router(auth.router)
app.include_router(form.router)
# app.include_router(test_database.router)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Below is to allow CORS for our frontend to access our backend API.

#------------------------------------------------------------
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#------------------------------------------------------------


db_dependancy = Annotated[Session, Depends(get_db)]
user_dependancy = Annotated[dict, Depends(get_current_user_from_jwt)]
user_cookie_dependancy = Annotated[dict, Depends(get_current_user_from_jwt_cookie)]

# @app.get("/", status_code=status.HTTP_200_OK)
# async def user(user: user_dependancy, db : db_dependancy ):
#     """Takes in a users JWT token from the header (user: user_dependancy) 
#     then passes it to the dependancy get_current_user_from_jwt to be decoded and verified. 
#     If the token is valid then it will return the user object.
#     Then this function will return the user object as a response.

#     Args:
#         user (user_dependancy): depends on the get_current_user_from_jwt function in file routers.auth.py to return a user object or Exception
#         db (db_dependancy): database dependancy to be used in this function to access the database

#     Raises:
#         HTTPException: if the user object is None then the user is not authenticated then an error is raised

#     Returns:
#         user (dict): returns a user object with current username
#     """
#     if user is None:
#         raise HTTPException(status_code=401, detail="Authentication failed")
#     return {"User": user}


@app.get("/cookie-jwt-validation",status_code=status.HTTP_200_OK)
async def cookie(user: user_cookie_dependancy):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return {"User": user}


@app.get("/status",status_code=status.HTTP_200_OK)
def isOnline():
    return True