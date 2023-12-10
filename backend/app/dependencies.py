from typing import Annotated
from fastapi.security import OAuth2PasswordBearer

from fastapi import Header, HTTPException









oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")