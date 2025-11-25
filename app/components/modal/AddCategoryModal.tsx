"use client";

import { useState } from "react";

interface Category {
    _id: string;
    name: string;
}

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (category: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave }) => {
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleSave = async () => {
        if (!newCategoryName.trim()) {
            alert("Please enter a category name.");
            return;
        }

        try {
            const response = await fetch(
                "https://restaurant-backend-antopolis.vercel.app/api/categories/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: newCategoryName.trim() }),
                }
            );

            const data = await response.json();

            if (data.success) {
                onSave(data.data);
                setNewCategoryName("");
                onClose();
            } else {
                alert("Failed to add category. Try again!");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Something went wrong. Check console.");
        }
    };


    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                onClick={onClose}
            />
            <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none">
                <div
                    className="bg-[#2e2e2e] rounded-xl p-6 w-80 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-center text-white text-lg font-semibold mb-4">Add Category</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full rounded-lg mb-3 px-3 py-2 bg-[#3a3a3a] border border-[#555] text-white placeholder:text-[#bbb]"
                    />
                    <button
                        onClick={handleSave}
                        className="w-full bg-red-600 rounded-lg py-2 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddCategoryModal;
