"use client";

import { useState } from "react";

interface AddFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (food: {
        name: string;
        category: string;
        price: number;
        rating: number;
        image: string;
    }) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, onSave }) => {
    const [foodName, setFoodName] = useState("");
    const [foodCategory, setFoodCategory] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [foodImage, setFoodImage] = useState<File | null>(null);
    const [foodImagePreview, setFoodImagePreview] = useState("");

    const handleFoodImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFoodImage(e.target.files[0]);
            setFoodImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = () => {
        if (!foodName || !foodCategory || !foodPrice || !foodRating || !foodImage) {
            alert("Please fill all fields and upload an image.");
            return;
        }

        const priceNum = parseFloat(foodPrice);
        const ratingNum = parseInt(foodRating, 10);
        if (isNaN(priceNum) || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
            alert("Please enter valid price and rating (1-5).");
            return;
        }

        onSave({
            name: foodName,
            category: foodCategory,
            price: priceNum,
            rating: ratingNum,
            image: foodImagePreview,
        });

        // Reset form
        setFoodName("");
        setFoodCategory("");
        setFoodPrice("");
        setFoodRating("");
        setFoodImage(null);
        setFoodImagePreview("");
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
                    <h2 className="text-center text-white text-lg font-semibold mb-4">Add Food</h2>
                    <input
                        type="text"
                        placeholder="Food Name"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        className="w-full rounded-lg mb-3 px-3 py-2 bg-[#3a3a3a] border border-[#555] text-white placeholder:text-[#bbb]"
                    />
                    <input
                        type="text"
                        placeholder="Food Category"
                        value={foodCategory}
                        onChange={(e) => setFoodCategory(e.target.value)}
                        className="w-full rounded-lg mb-3 px-3 py-2 bg-[#3a3a3a] border border-[#555] text-white placeholder:text-[#bbb]"
                    />
                    <label
                        htmlFor="food-image-upload"
                        className="w-full rounded-lg mb-4 px-3 py-2 border border-dashed border-red-500 text-red-400 text-center cursor-pointer block"
                    >
                        {foodImage ? "Change image" : "Upload or Drag image here"}
                    </label>
                    <input
                        id="food-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFoodImageChange}
                        className="hidden"
                    />
                    {foodImagePreview && (
                        <img
                            src={foodImagePreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-md mb-3"
                        />
                    )}
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

export default AddFoodModal;
