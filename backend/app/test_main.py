import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from fastapi.testclient import TestClient
from main import app
from routes.todos import DATA_FILE

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

    response = client.post("/todos", json={
        "title": "Test task",
        "description": "Test description",
        "completed": False,
        "favorite": True
    })
    assert response.status_code == 200
    todo = response.json()
    assert todo["title"] == "Test task"
    assert todo["description"] == "Test description"
    assert todo["completed"] is False
    assert todo["favorite"] is True
    assert "id" in todo


    # Update the completed status to True and favorite to False
    todo_id = todo["id"]
    response = client.patch(f"/todos/{todo_id}", json={"completed": True, "favorite": False, "description": "Updated desc"})
    assert response.status_code == 200
    updated = response.json()
    assert updated["completed"] is True
    assert updated["favorite"] is False
    assert updated["description"] == "Updated desc"

    # Check that the change persists
    response = client.get("/todos")
    assert response.status_code == 200
    todos = response.json()
    assert any(t["id"] == todo_id and t["completed"] and t["description"] == "Updated desc" and t["favorite"] is False for t in todos)

def test_delete_todo():
    """
    Test deleting a todo.
    """

    # Create a todo
    response = client.post("/todos", json={
        "title": "Delete me",
        "description": "desc",
        "completed": False,
        "favorite": False
    })
    assert response.status_code == 200
    todo = response.json()
    todo_id = todo["id"]

    # Delete the todo
    response = client.delete(f"/todos/{todo_id}")
    assert response.status_code == 204

    # Ensure it no longer exists
    response = client.get("/todos")
    todos = response.json()
    assert all(t["id"] != todo_id for t in todos)