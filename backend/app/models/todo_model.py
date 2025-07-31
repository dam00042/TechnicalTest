from pydantic import BaseModel

class Todo(BaseModel):
    id: str
    title: str
    description: str = ""
    completed: bool = False
    favorite: bool = False

class TodoCreate(BaseModel):
    title: str
    description: str = ""
    completed: bool = False
    favorite: bool = False

class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None
    favorite: bool | None = None
