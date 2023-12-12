from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from typing import Annotated

from sqlalchemy.orm import Session
from ..database import models, schemas, crud
from ..database.database import SessionLocal, engine

from .auth import SECRET_KEY, ALGORITHM
from jose import JWTError
from jose import jwt as JWT



router = APIRouter(
    prefix="/form",
    tags=["form"],
    # dependencies=[Depends(oauth2_scheme)],
)




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependancy = Annotated[Session, Depends(get_db)]









def get_current_user_from_jwt_cookie(jwt: str = Cookie(None)):
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
        return user_id
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user credentials",)
        

       
@router.get("/all",status_code=status.HTTP_200_OK)
async def get_forms(jwt: str = Cookie(None), db: Session = Depends(get_db)):
    """Takes in a users JWT token from the browser httponly cookie and returns all the forms that belong to that user

    Args:
        jwt (str): jwt cookie
        db (Session): to connect to the db

    Raises:
        HTTPException: if the user does not own any forms or an invalid JWT token is provided then an error is raised

    Returns:
        forms (form): the forms that belong to the user
    """
    try:
        user = get_current_user_from_jwt_cookie(jwt)
        
        forms = crud.get_form_by_id_of_owner(
            db, user_id=user)
        return forms
    
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")   



@router.post("/create")
async def create_user_form(form: schemas.FormCreate, db: Session = Depends(get_db),jwt: str = Cookie(None)):
    """Creates a form for the user that is currently logged in

    Args:
        form (schemas.FormCreate): form data containing the form string
        db (Session): to connect to the database
        jwt (str): jwt token from the browser httponly cookie that is used to identify the user

    Raises:
        HTTPException: if the user is not logged in or the jwt token is invalid then an error is raised

    Returns:
        _type_: _description_
    """
    try:
        user = get_current_user_from_jwt_cookie(jwt)
        crud.create_user_form(db=db, form=form, user_id=user)
        return {"message": "Form created successfully"}
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    
    
@router.get("/form-hello",status_code=status.HTTP_200_OK)
def auth_hello():
    return "ok"