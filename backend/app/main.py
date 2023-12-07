# to run backend app use 
# uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

app = FastAPI()





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




@app.get("/")
async def root():
    return {"message" : "Hello World"}


