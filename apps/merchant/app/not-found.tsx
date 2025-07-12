'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className=" bg-green-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <Image
        src="/404.png" // 🪴 Replace with your actual SVG/PNG path
        alt="Page not found"
        width={300}
        height={300}
        className=""
      />
      <h1 className="text-5xl font-extrabold text-green-800 mb-4">Oops! Page not found</h1>
      <p className="text-lg text-green-700 max-w-md mb-6">
        The page you’re looking for might have been pruned or never planted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-200 shadow"
        >
          🌱 Back to Home
        </Link>
        <Link
          href="/shop"
          className="border border-green-600 text-green-700 hover:bg-green-100 px-6 py-3 rounded-lg transition duration-200"
        >
          🛒 Explore Plants
        </Link>
      </div>
    </div>
  );
}
