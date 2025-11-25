"use client";

import Image from "next/image";
import chef from "../../public/Chef making ok sign over white background.png";
import avatar from "../../public/Ellipse2.png";
import React, { useState } from 'react';

const feedbacks = [
    {
        id: 1,
        text: "Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.",
        name: "Tayyab Sohail",
        role: "UX/UI Designer",
        avatar: avatar
    },
    {
        id: 2,
        text: "Crisp, flavorful, and expertly crafted. The shrimp was tender, the seasoning subtle yet impactful, and the wasabi mayo added a smooth heat.",
        name: "Sarah Johnson",
        role: "Food Blogger",
        avatar: avatar
    },
    {
        id: 3,
        text: "Rich, refreshing, and full of character. The spicy tuna had great texture, the rice was impeccably cooked, and the sesame drizzle elevated the entire dish.",
        name: "Michael Chen",
        role: "Restaurant Critic",
        avatar: avatar
    }
];

const CHEF_IMAGE_URL = chef.src;

const CustomerFeedback = () => {
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    const currentFeedback = feedbacks[currentFeedbackIndex];

    const goToFeedback = (index: number) => {
        setCurrentFeedbackIndex(index);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start">

                {/* Left Content - Feedback */}
                <div className="flex-1 max-w-lg lg:mr-20 mb-10 lg:mb-0">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-center lg:text-left text-gray-900 leading-tight">
                        Customer <span className="text-red-700">Feedback</span>
                    </h2>

                    <p className="mt-6 sm:mt-8 text-base sm:text-xl text-gray-700 leading-relaxed min-h-[100px] text-center lg:text-left">
                        {currentFeedback.text}
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
                        <div className="flex items-center gap-4 justify-center sm:justify-start">
                            <Image
                                src={currentFeedback.avatar}
                                alt={currentFeedback.name}
                                width={64}
                                height={64}
                                className="rounded-full object-cover w-[64px] h-[64px]"
                            />
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    {currentFeedback.name}
                                </h3>
                                <p className="text-sm sm:text-lg text-gray-500">
                                    {currentFeedback.role}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center sm:justify-end">
                            {feedbacks.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToFeedback(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentFeedbackIndex === index
                                        ? 'bg-red-700'
                                        : 'bg-red-300 hover:bg-red-400'
                                        }`}
                                    aria-label={`Go to feedback ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content - Chef Image */}
                <div className="relative flex-1 w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[550px] max-w-[590px]">
                    <div
                        className="absolute inset-0 bg-[#AD1519]"
                        style={{ clipPath: 'polygon(0% 66%, 100% 25%, 100% 100%, 0% 100%)' }}
                    ></div>
                    <Image
                        src={CHEF_IMAGE_URL}
                        alt="Smiling Chef"
                        layout="fill"
                        objectFit="cover"
                        className="absolute bottom-0 right-0 z-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerFeedback;