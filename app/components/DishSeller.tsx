"use client";

import { useEffect, useState } from "react";
import AddFoodModal from "./modal/AddFoodModal";
import AddCategoryModal from "./modal/AddCategoryModal";

interface Category {
    _id: string;
    name: string;
}

interface CategoryApiResponse {
    success: boolean;
    data: Category[];
}

interface Dish {
    _id: string;
    name: string;
    category?: Category;
    price: number;
    rating: number;
    image: string;
}

const DishSeller = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    // Form states for Add Food
    const [foodName, setFoodName] = useState("");
    const [foodCategory, setFoodCategory] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [foodImage, setFoodImage] = useState<File | null>(null);
    const [foodImagePreview, setFoodImagePreview] = useState<string>("");

    // Form state for Add Category
    const [newCategoryName, setNewCategoryName] = useState("");

    const filterCategories = ["All", ...categoryList.map((c) => c.name)];

    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, dishRes] = await Promise.all([
                    fetch("https://restaurant-backend-antopolis.vercel.app/api/categories"),
                    fetch("https://restaurant-backend-antopolis.vercel.app/api/products"),
                ]);

                const catData: CategoryApiResponse = await catRes.json();
                if (catData.success) setCategoryList(catData.data);

                const productData: Dish[] = await dishRes.json();
                setDishes(productData);
            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredDishes =
        activeCategory === "All"
            ? dishes
            : dishes.filter((d) => d.category?.name === activeCategory);

    const getCategoryColor = () => "bg-red-500";

    // Handlers for image upload preview
    const handleFoodImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFoodImage(e.target.files[0]);
            setFoodImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Save handler for Add Food
    const handleSaveFood = () => {
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

        // Create new dish object
        const newDish: Dish = {
            _id: String(Date.now()),
            name: foodName,
            category: { _id: "temp", name: foodCategory },
            price: priceNum,
            rating: ratingNum,
            image: foodImagePreview, // Using preview as image URL here
        };

        setDishes((prev) => [newDish, ...prev]);

        // Reset form and close modal
        setFoodName("");
        setFoodCategory("");
        setFoodPrice("");
        setFoodRating("");
        setFoodImage(null);
        setFoodImagePreview("");
        setIsFoodModalOpen(false);
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Bestseller Dishes</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore our curated selection of top-rated dishes.
                </p>
            </div>

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filterCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all shadow-sm ${activeCategory === cat
                                ? "bg-gray-900 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsFoodModalOpen(true)}
                        className="px-6 py-2 rounded-full bg-gray-900 text-white"
                    >
                        Add Food
                    </button>
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="px-6 py-2 rounded-full bg-gray-900 text-white"
                    >
                        Add Category
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="text-center py-12 text-gray-700 text-lg">Loading Menu...</div>
                ) : filteredDishes.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-10 border-2 border-dashed border-gray-200 rounded-lg">
                        No dishes found in {activeCategory}.
                    </p>
                ) : (
                    filteredDishes.map((dish) => (
                        <div
                            key={dish._id}
                            className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all group"
                        >
                            <div className="relative h-48">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover group-hover:opacity-90 transition"
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor()}`}
                                    >
                                        {dish.category?.name || "Uncategorized"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(dish.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <span className="text-2xl font-extrabold text-gray-900">${dish.price}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Food Modal */}
            <AddFoodModal
                isOpen={isFoodModalOpen}
                onClose={() => setIsFoodModalOpen(false)}
                onSave={(food) => {

                    const categoryObj = categoryList.find(cat => cat._id === food.category) || { _id: "unknown", name: "Uncategorized" };

                    setDishes(prev => [
                        { _id: String(Date.now()), ...food, category: categoryObj },
                        ...prev
                    ]);

                    setIsFoodModalOpen(false);
                }}

            />

            {/* Add Category Modal */}
            <AddCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSave={(category) => {
                    setCategoryList(prev => [...prev, category]);
                    setIsCategoryModalOpen(false);
                }}
            />
        </div>
    );
};

export default DishSeller;