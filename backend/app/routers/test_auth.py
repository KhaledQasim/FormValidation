from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ..database.database import Base
from ..main import app
# Must import the db dependancy from the router you are testing
from .auth import get_db
import pytest


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


def test_create_user():
    response = client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test"},
    )
    assert response.is_success

    # response = client.get(f"/users/{user_id}")
    # assert response.status_code == 200, response.text
    # data = response.json()
    # assert data["email"] == "deadpool@example.com"
    # assert data["id"] == user_id


def test_create_duplicate_user_username():
    client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test"},
    )
    response = client.post(
        "/auth",
        json={"email": "test2@test.com",
              "password": "12345Test?", "username": "test"},
    )
    assert response.is_error


def test_create_duplicate_user_email():
    client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test"},
    )
    response = client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test1"},
    )
    assert response.is_error


def test_create_duplicate_user_username_and_email():
    client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test"},
    )
    response = client.post(
        "/auth",
        json={"email": "test@test.com",
              "password": "12345Test?", "username": "test"},
    )
    assert response.is_error


def test_create_user_with_wrong_username_syntax():
    """
    Test that a user can't be created with a username that doesn't match the regex "^[a-zA-Z0-9]{3,13}$"

    Regex states that the username must be between 3 and 13 characters long and can only contain letters and numbers.

    The tests below should return a 4xx error code because the username is too short or too long or contains a special character.

    """
    
    special_character_response = client.post(
        "/auth",
        json={"email": "test@test.com","password": "12345Test?", "username": "test@"},
    )
    assert special_character_response.is_error



    username_too_short_response = client.post(
        "/auth",
        json={"email": "test1@test.com",
              "password": "12345Test?", "username": "te"},
    )
    assert username_too_short_response.is_error



    # username here is above 13 characters long
    username_too_long_response = client.post(
        "/auth",
        json={"email": "test2@test.com", "password": "12345Test?",
              "username": "test5678900000"},
    )
    assert username_too_long_response.is_error


def test_create_user_with_wrong_email_syntax():

    no_at_email_symbol_response = client.post(
        "/auth",
        json={"email": "test!test.com",
              "password": "12345Test?", "username": "test"},
    )
    assert no_at_email_symbol_response.is_error



    no_dot_response = client.post(
        "/auth",
        json={"email": "test@testcom",
              "password": "12345Test?", "username": "test1"},
    )
    assert no_dot_response.is_error



    # email is 31 characters long
    email_too_long_response = client.post(
        "/auth",
        json={"email": "test@test.cooooooooooooooooooom",
              "password": "12345Test?", "username": "test2"},
    )
    assert email_too_long_response.is_error



    email_too_short_response = client.post(
        "/auth",
        json={"email": "t@t", "password": "12345Test?", "username": "test2"},
    )
    assert email_too_short_response.is_error














# test not working as expected and is approving all requests please fix later

# def test_create_user_with_wrong_password_syntax():

#     password_too_short = client.post(
#         "/auth",
#         json={"email": "test@test.com","password": "1Test?", "username": "test"},
#     )
#     assert password_too_short.is_error

#     password_too_long = client.post(
#         "/auth",
#         json={"email": "test1@test.com",
#               "password": "12345Test?321231231321314124124", "username": "test1"},
#     )
#     assert password_too_long.is_error

#     password_with_no_lowerCase = client.post(
#         "/auth",
#         json={"email": "test2@test.com","password": "12345TEST?", "username": "test2"},
#     )
#     assert password_with_no_lowerCase.is_error

#     password_with_no_upperCase = client.post(
#         "/auth",
#         json={"email": "test3@test.com",
#               "password": "12345test?", "username": "test3"},
#     )
#     assert password_with_no_upperCase.is_error

#     password_with_no_number = client.post(
#         "/auth",
#         json={"email": "test4@test.com",
#               "password": "TestTestTest?", "username": "test4"},
#     )
#     assert password_with_no_number.is_error

#     password_with_no_special = client.post(
#         "/auth",
#         data={"email": "test5@test.com",
#               "password": "TestTestTest1", "username": "test5"},
#     )
#     assert password_with_no_special.is_error













def test_create_user_with_wrong_password_syntax():

    password_too_short = client.post(
        "/auth",
        json={"email": "test@test.com","password": "1Test?", "username": "test"},
    )
    assert password_too_short.is_error

    # password below is 31 characters long
    password_too_long = client.post(
        "/auth",
        json={"email": "test1@test.com",
              "password": "12345Test?321231231321314124124", "username": "test1"},
    )
    assert password_too_long.is_error



    password_with_no_lowerCase = client.post(
        "/auth",
        json={"email": "test2@test.com","password": "12345TEST?", "username": "test2"},
    )
    assert password_with_no_lowerCase.is_error



    password_with_no_upperCase = client.post(
        "/auth",
        json={"email": "test3@test.com",
              "password": "12345test?", "username": "test3"},
    )
    assert password_with_no_upperCase.is_error

    password_with_no_number = client.post(
        "/auth",
        json={"email": "test4@test.com",
              "password": "TestTestTest?", "username": "test4"},
    )
    assert password_with_no_number.is_error

    password_with_no_special = client.post(
        "/auth",
        json={"email": "test5@test.com",
              "password": "TestTestTest1", "username": "test5"},
    )
    assert password_with_no_special.is_error
