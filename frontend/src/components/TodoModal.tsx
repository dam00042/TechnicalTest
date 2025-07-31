import React, { useState } from "react";
import type { Todo } from "../types/todo";

interface TodoModalProps {
    todo: Todo;
    onClose: () => void;
    onSave: (updated: Todo) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose, onSave}) => {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [favorite, setFavorite] = useState(todo.favorite);

    const handleSave = () => {
        onSave({ ...todo, title, description, favorite });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative z-50">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-lg min-h-[120px] md:min-h-[180px]"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={6}
                    />
                </div>
                <div className="flex items-center mb-4 gap-1" style={{minHeight: '2.2rem'}}>
                    <button
                        onClick={() => setFavorite(f => !f)}
                        className="text-yellow-500 text-3xl focus:outline-none cursor-pointer flex items-center justify-center"
                        title={favorite ? "Unmark as favorite" : "Mark as favorite"}
                        type="button"
                        style={{ width: '2.2rem', height: '2.2rem', lineHeight: 1, padding: 0 }}
                    >
                        {favorite ? "★" : "☆"}
                    </button>
                    <span className="text-base font-medium flex items-center" style={{height: '2.2rem', marginLeft: '0.15rem'}}>
                        Favourite
                    </span>
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                        type="button"
                        title="Save changes"
                    >
                        Save changes
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-white hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg cursor-pointer border border-red-500 border-2 font-semibold"
                        type="button"
                        title="Cancel and close"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;
