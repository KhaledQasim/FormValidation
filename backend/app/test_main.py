from fastapi.testclient import TestClient
from .routers.auth import create_access_token
from .main import app 
from datetime import timedelta


clint = TestClient(app)

# using a jwt that will never expire



def test_cookie():
    test_token = create_access_token("test", 1,timedelta(minutes=1))
    response = clint.get(
        "/cookie-jwt-validation",
        cookies={"jwt": test_token})
    assert response.is_success

def test_invalid_jwt_cookie():
    response = clint.get(
        "/cookie-jwt-validation",
        cookies={"jwt": "invalid"},)
    assert response.is_error


def test_expired_jwt_cookie():
    test_token = create_access_token("test", 1,timedelta(minutes=-1))
    response = clint.get(
        "/cookie-jwt-validation",
        cookies={"jwt": test_token},)
    response.is_error
    
    
def test_isOnline():
    response = clint.get(
        "/status"
    )
    assert response.status_code == 200