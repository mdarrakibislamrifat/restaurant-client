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

export default function Footer() {
  const galleryImages = [
    "/delicious-burger-with-golden-fries.jpg",
    "/fresh-pasta-dish-with-herbs.jpg",
    "/cooking-pan-with-pizza.jpg",
    "/grilled-fish-on-plate.jpg",
    "/colorful-salad-bowl.jpg",
    "/restaurant-interior-dining.jpg",
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
    <footer className="bg-red-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Newsletter Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">RESTAURANT</h2>
            <p className="text-sm text-red-100 mb-6">
              Subscribe our newsletter and get discount 25%off
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-white text-gray-900 placeholder:text-gray-500 border-0 rounded-sm"
              />
              <button
                className="bg-white text-red-800 hover:bg-red-50 px-3 rounded-sm"
                size="icon"
              >
                <Send size={18} />
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
                <MapPin
                  size={20}
                  className="flex-shrink-0 text-red-200 mt-0.5"
                />
                <p>3517 W. Gray St. Utica, Pennsylvania 57867</p>
              </div>
              <div className="flex gap-3">
                <Phone
                  size={20}
                  className="flex-shrink-0 text-red-200 mt-0.5"
                />
                <p>(480) 555-0103</p>
              </div>
              <div className="flex gap-3">
                <Mail size={20} className="flex-shrink-0 text-red-200 mt-0.5" />
                <p>M.Alyaqout@4house.Co</p>
              </div>
              <div className="flex gap-3">
                <Clock
                  size={20}
                  className="flex-shrink-0 text-red-200 mt-0.5"
                />
                <p>Sun - Sat / 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Links</h3>
            <ul className="space-y-3 text-sm">
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
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-700"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm text-red-100">
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
