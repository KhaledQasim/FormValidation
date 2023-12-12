from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ..database.database import Base
from ..main import app
# Must import the db dependancy from the router you are testing
from .auth import get_db

# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
# Below is an in memory database that will be deleted when the test is done
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_create_user():
    client.post(
        "/auth",
        json={"email": "test@test1.com", "password": "12345Test?","username": "test1"},
    )
    response = client.post(
        "/auth",
        json={"email": "test@test.com", "password": "12345Test?","username": "test"},
    )
    assert response.status_code == 200
   

    # response = client.get(f"/users/{user_id}")
    # assert response.status_code == 200, response.text
    # data = response.json()
    # assert data["email"] == "deadpool@example.com"
    # assert data["id"] == user_id