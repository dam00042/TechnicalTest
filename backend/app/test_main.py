import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from fastapi.testclient import TestClient
from main import app, DATA_FILE
import os

client = TestClient(app)

def setup_module(module):
    """
    Remove the data file before each test run to ensure a clean state.
    """
    if DATA_FILE.exists():
        DATA_FILE.unlink()

def test_add_and_update_todo():
    """
    Test the creation of a new todo and updating its completed status.
    """
    response = client.post("/todos", json={"title": "Test task", "completed": False})
    assert response.status_code == 200
    todo = response.json()
    assert todo["title"] == "Test task"
    assert todo["completed"] is False
    assert "id" in todo

    # Update the completed status to True
    todo_id = todo["id"]
    response = client.patch(f"/todos/{todo_id}", json={"completed": True})
    assert response.status_code == 200
    updated = response.json()
    assert updated["completed"] is True

    # Check that the change persists
    response = client.get("/todos")
    assert response.status_code == 200
    todos = response.json()
    assert any(t["id"] == todo_id and t["completed"] for t in todos)