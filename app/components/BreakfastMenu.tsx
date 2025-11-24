/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  thumbnail: string;
  heroImage: string;
}

const CATEGORIES: Category[] = [
  {
    id: "waffles",
    name: "Waffles",
    title: "BREAKFAST",
    description:
      "Breakfast, often referred to as the 'most important meal of the day', provides essential nutrients to kick start our day. It includes a variety of foods, like fruits, cereals, dairy products, and proteins, that contribute to a balanced diet.",

    primaryColor: "#9f1239",
    secondaryColor: "#450a0a",
    accentColor: "#e11d48",
    thumbnail:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=300&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "french-toast",
    name: "French Toast",
    title: "SWEET START",
    description:
      "Our French Toast is crafted with brioche bread, soaked in a rich custard of eggs and cream, then grilled to golden perfection. Topped with fresh berries and a dusting of powdered sugar for a delightful morning treat.",
    // Blue Theme
    primaryColor: "#1e40af",
    secondaryColor: "#172554",
    accentColor: "#3b82f6",
    thumbnail:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=300&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "pancakes",
    name: "Pancakes",
    title: "FLUFFY STACK",
    description:
      "Experience the fluffiest pancakes in town. Served in a stack of three, these golden delights are made from our secret buttermilk batter recipe. Best enjoyed with a generous pour of pure maple syrup and a side of whipped butter.",

    primaryColor: "#c2410c",
    secondaryColor: "#431407",
    accentColor: "#f97316",
    thumbnail:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=300&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "crepes",
    name: "Crepes",
    title: "DELICATE FOLD",
    description:
      "Thin, delicate, and irresistibly buttery. Our crepes are folded with precision and filled with your choice of sweet hazelnut spread, fresh strawberries, or savory ham and cheese. A touch of European elegance for your morning.",

    primaryColor: "#15803d",
    secondaryColor: "#052e16",
    accentColor: "#22c55e",
    thumbnail:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=300&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1200&auto=format&fit=crop",
  },
];

const BreakfastMenu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://restaurant-backend-antopolis.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = products.filter((p: any) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const searchRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeCategory = CATEGORIES[activeIndex];

  const handleCategorySelect = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const isMovingForward = activeIndex > prevIndex;

  const animationClass = isAnimating
    ? isMovingForward
      ? "animate-plate-enter-clockwise"
      : "animate-plate-enter-counter-clockwise"
    : "opacity-100 rotate-0 scale-100";

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-sans text-white transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: activeCategory.secondaryColor }}
    >
      <style>{`
        @keyframes plateEnterClockwise {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-90deg) translateX(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateX(0);
          }
        }
        @keyframes plateEnterCounterClockwise {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(90deg) translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateX(0);
          }
        }
        .animate-plate-enter-clockwise {
          animation: plateEnterClockwise 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-plate-enter-counter-clockwise {
          animation: plateEnterCounterClockwise 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-0 left-0 h-full w-full md:w-[65%]"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M0 0 L50 0 Q 75 50 50 100 L 0 100 Z"
            fill={activeCategory.primaryColor}
            className="transition-colors duration-700 ease-in-out"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute bottom-0 right-0 h-[60%] w-[50%]"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 100 Q 80 40 100 10 L 100 100 Z"
            fill={activeCategory.primaryColor}
            className="transition-colors duration-700 ease-in-out opacity-90"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-[45%] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="absolute top-8 left-8 md:left-12 lg:left-16">
            <h3 className="text-3xl font-bold tracking-widest uppercase  drop-shadow-md">
              Restaurant
            </h3>
          </div>

          <div className="mt-16 md:mt-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight drop-shadow-sm">
              {activeCategory.title}
            </h1>

            <p className="text-sm md:text-base opacity-95 leading-relaxed max-w-md mb-12 font-light drop-shadow-sm">
              {activeCategory.description}
            </p>

            <div className="flex gap-4 md:gap-6">
              {CATEGORIES.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(index)}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-label={`Select ${cat.name}`}
                >
                  <div
                    className={`
                      relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-500 transform
                      ${
                        activeIndex === index
                          ? "scale-110 shadow-2xl ring-2 ring-white ring-offset-2 ring-offset-transparent"
                          : "opacity-80 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105"
                      }
                    `}
                  >
                    <img
                      src={cat.thumbnail}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className={`
                      h-1 bg-white mt-5 rounded-full transition-all duration-300 ease-out shadow-sm
                      ${
                        activeIndex === index
                          ? "w-12 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] h-full flex flex-col p-8 md:p-12">
          <div className="flex justify-end items-start h-20">
            <div className="relative w-full max-w-[350px] " ref={searchRef}>
              <input
                type="text"
                placeholder="Search...."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                onClick={() => setSearchOpen(true)}
                className="w-full py-3 pl-12 pr-6 rounded-full bg-white text-gray-800
               placeholder-gray-800 font-medium shadow-xl focus:outline-none
               transition-transform duration-300 hover:scale-105 focus:ring-2"
                style={{
                  ["--tw-ring-color" as any]: activeCategory.primaryColor,
                }}
              />

              {/* Search Icon */}
              <svg
                className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Product Dropdown */}
              {searchOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl z-50 p-4 max-h-80 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        <img
                          src={item.image}
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <span className="text-gray-800 font-medium">
                          {item.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm">No products found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative perspective-1000">
            <div
              className={`
                relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]
                z-10 filter drop-shadow-2xl
                ${animationClass}
              `}
            >
              <img
                key={activeCategory.heroImage} // Key forces a fresh element for animation
                src={activeCategory.heroImage}
                alt={activeCategory.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakfastMenu;
