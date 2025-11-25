"use client";

import { useState, useEffect } from "react";

interface Category {
    _id: string;
    name: string;
}

interface AddFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (food: {
        _id?: string;
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://restaurant-backend-antopolis.vercel.app/api/categories/");
                const data = await res.json();
                if (data.success) setCategories(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handleFoodImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFoodImage(e.target.files[0]);
            setFoodImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        if (!foodName || !foodCategory || !foodPrice || !foodImage) {
            alert("Please fill all fields and upload an image.");
            return;
        }

        const priceNum = parseFloat(foodPrice);
        if (isNaN(priceNum)) {
            alert("Please enter a valid price.");
            return;
        }

        setLoading(true);

        const CLOUD_NAME = "di83h3jzy";

        try {
            // 2. Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", foodImage as File);
            formData.append("upload_preset", "restaurant");
            const cloudinaryRes = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // 🔥 CORRECTED Cloud Name
                {
                    method: "POST",
                    body: formData,
                }
            );


            if (!cloudinaryRes.ok) {
                const errorData = await cloudinaryRes.json();
                console.error("Cloudinary Upload Failed:", errorData);
                alert("Image upload failed. Please ensure the Cloud Name and Preset are correct.");
                setLoading(false);
                return;
            }

            const cloudinaryData = await cloudinaryRes.json();
            const imageUrl = cloudinaryData.secure_url;


            const selectedCategory = categories.find(
                (cat) => cat._id === foodCategory || cat.name === foodCategory
            );
            if (!selectedCategory) {
                alert("Invalid category selected.");
                setLoading(false);
                return;
            }


            const res = await fetch("https://restaurant-backend-antopolis.vercel.app/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: foodName,
                    category: selectedCategory._id,
                    price: priceNum,
                    rating: 5,
                    image: imageUrl,
                }),
            });

            const data = await res.json();
            if (data.success) {
                onSave(data.data);

                setFoodName("");
                setFoodCategory("");
                setFoodPrice("");
                setFoodImage(null);
                setFoodImagePreview("");
                onClose();
            } else {
                alert("Failed to add food: " + (data.message || "Unknown server error."));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong during the save process!");
        } finally {
            setLoading(false);
        }
    };



    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div
                    className="bg-[#2e2e2e] rounded-xl p-6 w-80 pointer-events-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-center text-white text-lg font-semibold mb-4">Add Food</h2>

                    <input
                        type="text"
                        placeholder="Food Name"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                        className="w-full rounded-lg mb-3 px-3 py-2 bg-[#3a3a3a] border border-[#555] text-white placeholder:text-[#bbb]"
                    />

                    <select
                        value={foodCategory}
                        onChange={e => setFoodCategory(e.target.value)}
                        className="w-full rounded-lg mb-3 px-3 py-2 bg-[#3a3a3a] border border-[#555] text-white"
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Price"
                        value={foodPrice}
                        onChange={e => setFoodPrice(e.target.value)}
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
                        disabled={loading}
                        className="w-full bg-red-600 rounded-lg py-2 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddFoodModal;
