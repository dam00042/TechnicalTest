import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

DATA_FILE = Path(__file__).parent / "todos.json"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todo(BaseModel):
    id: str
    title: str
    completed: bool = False

class TodoCreate(BaseModel):
    title: str
    completed: bool = False

class TodoUpdate(BaseModel):
    completed: bool


def load_todos() -> list[Todo]:
    """Load todos from the JSON file."""
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return [Todo(**todo) for todo in json.load(f)]


def save_todos(todos: list[Todo]):
    """
    Save todos to the JSON file.

    Args:
        todos (list[Todo]): List of Todo objects to save.
    """
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([todo.model_dump() for todo in todos], f, indent=2)


@app.get("/todos", response_model=list[Todo])
def get_todos():
    """Get all todos."""
    return load_todos()


@app.post("/todos", response_model=Todo)
def add_todo(todo: TodoCreate):
    """
    Add a new todo.

    Args:
        todo (TodoCreate): The todo to add.
    """
    todos = load_todos()
    new_todo = Todo(id=str(uuid.uuid4()), title=todo.title, completed=todo.completed)
    todos.append(new_todo)
    save_todos(todos)
    return new_todo



@app.patch("/todos/{todo_id}", response_model=Todo)
def update_todo_status(todo_id: str, update: TodoUpdate):
    """
    Update the completed status of a todo.

    Args:
        todo_id (str): The ID of the todo to update.
        update (TodoUpdate): The update to apply.
    """
    todos = load_todos()
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = update.completed
            save_todos(todos)
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: str):
    """
    Delete a todo by its ID.

    Args:
        todo_id (str): The ID of the todo to delete.
    """
    todos = load_todos()
    new_todos = [todo for todo in todos if todo.id != todo_id]
    if len(new_todos) == len(todos):
        raise HTTPException(status_code=404, detail="Todo not found")
    save_todos(new_todos)
