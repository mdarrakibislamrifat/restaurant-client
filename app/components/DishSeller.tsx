"use client";

import { useEffect, useState } from "react";

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

    const filterCategories = ["All", ...categoryList.map((c) => c.name)];

    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, dishRes] = await Promise.all([
                    fetch("https://restaurant-backend-antopolis.vercel.app/api/categories"),
                    fetch("https://restaurant-backend-antopolis.vercel.app/api/products")
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

    const getCategoryColor = (name?: string) => {
        const colors: Record<string, string> = {
            Breakfast: "bg-red-500",
            Lunch: "bg-red-500",
            Dinner: "bg-red-500"
        };
        return colors[name || ""] || "bg-gray-500";
    };

    if (loading) {
        return <div className="text-center py-12 text-gray-700 text-lg">Loading Menu...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
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
                            className={` px-6 py-2 rounded-full font-medium transition-all shadow-sm ${activeCategory === cat
                                ? "bg-gray-900 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-2 rounded-full bg-gray-800 text-white ">
                        Add Food
                    </button>
                    <button className="px-6 py-2 rounded-full bg-gray-800 text-white ">
                        Add Category
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDishes.length === 0 ? (
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
                                        className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getCategoryColor(
                                            dish.category?.name
                                        )}`}
                                    >
                                        {dish.category?.name || "Uncategorized"}
                                    </span>
                                </div>



                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(dish.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 fill-yellow-400"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <span className="text-2xl font-extrabold text-gray-900">
                                        ${dish.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DishSeller;
