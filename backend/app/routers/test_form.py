from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)


def testAuthHello():
    response = client.get(
        "/form/form-hello"
    )
    assert response.status_code == 200