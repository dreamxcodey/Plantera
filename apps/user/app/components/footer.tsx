'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h2 className="text-2xl font-bold">Plantera</h2>
            </div>
            <p className="text-green-200 mb-6 leading-relaxed">
              Bringing nature's beauty into your home with premium plants and expert guidance.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* Example: Replace with actual URLs */}
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                {/* Facebook Icon */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523... (icon path omitted for brevity)..." />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                {/* Instagram Icon */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0..." />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                {/* Twitter Icon */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0..." />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories" className="text-green-200 hover:text-white transition-colors cursor-pointer">
                  All Plants
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-green-200 hover:text-white transition-colors cursor-pointer">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-green-200 hover:text-white transition-colors cursor-pointer">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-green-200 hover:text-white transition-colors cursor-pointer">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-green-200 hover:text-white transition-colors cursor-pointer">
                  Plant Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Help</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-green-200 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Plant Care Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-green-200 text-sm">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">📍</span>
                Nursery, Kadiam, 533126 AP Ind
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">✉️</span>
                hello@plantera.com
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">📞</span>
                (91) 9346-39-5054
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-800 mt-12 pt-6 text-center text-green-400 text-sm">
          <p>© {new Date().getFullYear()} Plantera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
