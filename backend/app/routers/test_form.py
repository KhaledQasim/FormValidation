from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from datetime import timedelta


from .auth import create_access_token
from ..database.database import Base
from ..main import app


# Must import the db dependancy from the router you are testing
from .form import get_db


# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
# Below is an in memory database that will be deleted when the test is done
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_create_user_form():
    jwt_cookie = create_access_token("test", 1, timedelta(1))

    request_data = {
        "first_name": "2",
        "last_name": "string",
        "phone": 1222222222,
        "dob": "2023-12-14",
        "address": "string",
        "post_code": "string",
        "company": "string",
        "nationality": "English",
        "json_file": "{\"cat\":\"dog\"}"
    }
    response = client.post(
        "/form/create",
        cookies={"jwt": jwt_cookie},
        json=request_data
    )
    assert response.is_success


def test_create_user_form_with_invalid_jwt():
    jwt_cookie = create_access_token("test", 1, timedelta(-1))
    expired_jwt = client.post(
        "/form/create",
        cookies={"jwt": jwt_cookie},
        json={"form": "Hello Form"}
    )
    assert expired_jwt.is_error

    invalid_jwt = client.post(
        "/form/create",
        cookies={"jwt": "theInvalidJwt"},
        json={"form": "Hello Form"}
    )
    assert invalid_jwt.is_error


def test_get_user_forms():
    jwt_cookie = create_access_token("test", 1, timedelta(1))
    request = {
        "first_name": "string",
        "last_name": "string",
        "phone": 1222222222,
        "dob": "2023-12-14",
        "address": "string",
        "post_code": "string",
        "company": "string",
        "nationality": "English",
        "json_file": "{\"cat\":\"dog\"}"
    }

    client.post(
        "/form/create",
        cookies={"jwt": jwt_cookie},
        json=request
    )

    get_users_form = client.get(
        "/form/all",
        cookies={"jwt": jwt_cookie},
    )

    assert get_users_form.is_success

    data = get_users_form.json()
    response_data = {
        "id": 1,
        "phone": 1222222222,
        "address": "string",
        "company": "string",
        "json_file": {
            "cat": "dog"
        },
        "last_name": "string",
        "first_name": "string",
        "dob": "2023-12-14T00:00:00",
        "post_code": "string",
        "nationality": "English",
        "owner_id": 1
    }
    first_object = data[0]
    assert first_object["phone"] == response_data["phone"]    
    # assert data[0] == response_data


