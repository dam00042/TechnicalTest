from fastapi import APIRouter, HTTPException
from app.models.todo_model import Todo, TodoCreate, TodoUpdate
from pathlib import Path
import json
import uuid

DATA_FILE = Path(__file__).parent.parent / "todos.json"

router = APIRouter(prefix="/todos", tags=["todos"])

def load_todos() -> list[Todo]:
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return [Todo(**todo) for todo in json.load(f)]

def save_todos(todos: list[Todo]):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([todo.model_dump() for todo in todos], f, indent=2)

@router.get("/", response_model=list[Todo])
def get_todos():
    return load_todos()

@router.post("/", response_model=Todo)
def add_todo(todo: TodoCreate):
    todos = load_todos()
    new_todo = Todo(
        id=str(uuid.uuid4()),
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        favorite=todo.favorite
    )
    todos.append(new_todo)
    save_todos(todos)
    return new_todo

@router.patch("/{todo_id}", response_model=Todo)
def update_todo_status(todo_id: str, update: TodoUpdate):
    todos = load_todos()
    for todo in todos:
        if todo.id == todo_id:
            if update.title is not None:
                todo.title = update.title
            if update.description is not None:
                todo.description = update.description
            if update.completed is not None:
                todo.completed = update.completed
            if update.favorite is not None:
                todo.favorite = update.favorite
            save_todos(todos)
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: str):
    todos = load_todos()
    new_todos = [todo for todo in todos if todo.id != todo_id]
    if len(new_todos) == len(todos):
        raise HTTPException(status_code=404, detail="Todo not found")
    save_todos(new_todos)
