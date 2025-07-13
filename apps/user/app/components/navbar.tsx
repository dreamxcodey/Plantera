'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide categories bar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowCategories(false);
      } else if (currentScrollY < lastScrollY) {
        setShowCategories(true);
      }

      // Sticky navbar effect
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveCategory(null);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main categories data
  const mainCategories = [
    {
      name: "Gardening",
      subcategories: [
        "Top Plants' Packs",
        "Packs by Features",
        "Miniature Gardens & Kits",
        "Packs by Location",
        "Packs by Occasions",
        "Packs by Season"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Plants",
      subcategories: [
        "Trending Plants",
        "By Type",
        "By Features & Uses",
        "By Location",
        "Foliage Plants",
        "Flowering Plants",
        "By Season",
        "By Color"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Seeds",
      subcategories: [
        "Trending Seeds",
        "Vegetable/Herb Seeds",
        "Flower Seeds",
        "Tree and Forestry Seeds",
        "All Seasons Seeds",
        "Easy to Grow Seeds"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
      )
    },
    {
      name: "Planters",
      subcategories: [
        "Trending Planters",
        "By Type",
        "By Material",
        "By Color",
        "By Size",
        "By Shape"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Gifts",
      subcategories: [
        "Trending Gifts",
        "Plants as Corporate Gifts",
        "Gifts for Festivals",
        "Gifts for Loved Ones",
        "Gifts for Occasions"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
          <path d="M9 11H5v6a2 2 0 002 2h4v-8zm2 8v-8h4v6a2 2 0 01-2 2h-2z" />
        </svg>
      )
    },
    {
      name: "Accessories",
      subcategories: [
        "Best Seller Accessories",
        "Gardening Tools",
        "Miniature Garden Toys",
        "Gardening Accessories",
        "Addons"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div ref={navbarRef}>
      {/* Main Navbar */}
      <motion.header
        // initial={{ y: -100 }}
        // animate={{ y: 0 }}
        // transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-gradient-to-r from-green-100 mask-b-to-emerald-50 shadow-lg py-2"
          : "bg-gradient-to-b from-green-200 mask-b-to-emerald-100 backdrop-blur-sm py-3"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center group-hover:from-green-700 group-hover:to-emerald-600 transition-colors shadow-lg"
            >
              <span className="text-white font-bold text-xl">P</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-green-800 group-hover:text-emerald-700 transition-colors">
              Plantera
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${pathname === "/"
                ? "text-emerald-700 bg-emerald-50 font-semibold"
                : "text-green-800 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${pathname === "/shop"
                ? "text-emerald-700 bg-emerald-50 font-semibold"
                : "text-green-800 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${pathname === "/categories"
                ? "text-emerald-700 bg-emerald-50 font-semibold"
                : "text-green-800 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${pathname === "/about"
                ? "text-emerald-700 bg-emerald-50 font-semibold"
                : "text-green-800 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
            >
              About
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center bg-emerald-50 rounded-full pl-4 pr-2 py-1 transition-all duration-300 shadow-inner">
              <input
                type="text"
                placeholder="Search plants, seeds, tools..."
                className="bg-transparent outline-none w-58 text-green-800 placeholder-emerald-600/70"
              />
              <button className="p-2 text-emerald-700 hover:text-emerald-900 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Search Toggle */}
            <button
              className="md:hidden p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              className="p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <Link
              href="/account"
              className="p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden container mx-auto px-4 py-3"
          >
            <div className="flex items-center bg-emerald-50 rounded-full px-4 py-2 shadow-inner">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search plants, seeds, tools..."
                className="bg-transparent outline-none w-full text-green-800 placeholder-emerald-600/70"
              />
              <button
                className="p-1 text-emerald-700 hover:text-emerald-900 rounded-full transition-colors"
                onClick={() => setIsSearchOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-emerald-100"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
                <Link
                  href="/"
                  className="px-4 py-3 text-emerald-800 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="px-4 py-3 text-emerald-800 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/categories"
                  className="px-4 py-3 text-emerald-800 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-3 text-emerald-800 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-3 text-emerald-800 font-medium hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Contact
                </Link>
                <div className="flex space-x-4 pt-2 pb-3 justify-center">
                  <Link
                    href="/account"
                    className="flex items-center text-emerald-800 px-4 py-2 font-medium hover:bg-emerald-50 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Account
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center text-emerald-800 px-4 py-2 font-medium hover:bg-emerald-50 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Cart (3)
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Categories Bar */}
      <motion.div
        animate={{
          y: showCategories ? 0 : -100,
          opacity: showCategories ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-16 md:top-20 w-full bg-gradient-to-r from-emerald-50 to-green-50 z-40 shadow-sm border-b border-emerald-100`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {mainCategories.map((category, index) => (
              <div key={index} className="group relative">
                <button
                  className="flex items-center px-3 py-1.5 text-emerald-800 font-medium hover:text-emerald-700 hover:bg-white rounded-lg transition-colors whitespace-nowrap border border-emerald-200 shadow-sm"
                  onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                >
                  {category.icon}
                  {category.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform ${activeCategory === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeCategory === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-1 w-64 bg-white border border-emerald-100 rounded-lg shadow-lg z-50"
                  >
                    <div className="py-2 max-h-80 overflow-y-auto">
                      {category.subcategories.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            <Link
              href="/buy-again"
              className="flex items-center px-3 py-1.5 text-emerald-800 font-medium hover:text-emerald-700 hover:bg-white rounded-lg transition-colors whitespace-nowrap border border-emerald-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Buy Again
            </Link>
            <Link
              href="/gift-options"
              className="flex items-center px-3 py-1.5 text-emerald-800 font-medium hover:text-emerald-700 hover:bg-white rounded-lg transition-colors whitespace-nowrap border border-emerald-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Gift Options
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="h-28 md:h-32"></div>
    </div>
  );
}
