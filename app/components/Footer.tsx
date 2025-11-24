"use client";

import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const galleryImages = [
    "/delicious-burger-with-golden-fries.png",
    "/fresh-pasta-dish-with-herbs.png",
    "/cooking-pan-with-pizza.png",
    "/grilled-fish-on-plate.png",
    "/colorful-salad-bowl.png",
    "/restaurant-interior-dining.png",
  ];

  const socialLinks = [
    { icon: PinIcon, label: "Pinterest", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  const navLinks = [
    { label: "About us", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Our Menu", href: "#" },
    { label: "Team", href: "#" },
    { label: "FAQ", href: "#" },
  ];

  return (
    <footer className="bg-[#880808] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Newsletter Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">RESTAURANT</h2>
            <p className="text-sm text-red-100 mb-6">
              Subscribe our newsletter and get discount 25%off
            </p>
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-[90%] h-14 pl-6 pr-14 text-gray-800 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400 text-base "
              />
              <button
                className="absolute right-0 top-0 h-14 w-14 bg-[#A52A2A] rounded-r-md flex items-center justify-center transition-colors group"
                aria-label="Subscribe"
              >
                <Send
                  size={20}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-red-100 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin size={20} className=" text-red-200 mt-0.5" />
                <p>3517 W. Gray St. Utica, Pennsylvania 57867</p>
              </div>
              <div className="flex gap-3">
                <Phone size={20} className=" text-red-200 mt-0.5" />
                <p>(480) 555-0103</p>
              </div>
              <div className="flex gap-3">
                <Mail size={20} className=" text-red-200 mt-0.5" />
                <p>M.Alyaqout@4house.Co</p>
              </div>
              <div className="flex gap-3">
                <Clock size={20} className=" text-red-200 mt-0.5" />
                <p>Sun - Sat / 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Links</h3>
            <ul className="flex flex-row text-sm gap-4 sm:flex-col">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-red-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram Gallery Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Instagram Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-sm overflow-hidden border-2 border-red-600 hover:border-white transition-colors"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    width={109}
                    height={109}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="bg-[#A52A2A] p-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between  gap-4  text-red-100">
          <p>&copy; Copyright © 2025. All rights reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Term of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Partner
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
