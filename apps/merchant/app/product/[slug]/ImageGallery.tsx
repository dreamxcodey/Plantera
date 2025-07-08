'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="relative">
      <div
        className="relative aspect-square overflow-hidden rounded-lg mb-4 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <img
          src={mainImage}
          alt="Main product"
          className="w-full h-full object-contain"
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
            transform: zoom ? 'scale(2)' : 'scale(1)'
          }}
        />
        {zoom && (
          <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2">
            <ZoomIn size={20} className="text-gray-700" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 relative">
        {images.length > 4 && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full shadow-md p-1 z-10"
              onClick={() => {
                const currentIndex = images.indexOf(mainImage);
                setMainImage(images[(currentIndex - 1 + images.length) % images.length]);
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full shadow-md p-1 z-10"
              onClick={() => {
                const currentIndex = images.indexOf(mainImage);
                setMainImage(images[(currentIndex + 1) % images.length]);
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`border-2 rounded-lg overflow-hidden aspect-square transition-all ${mainImage === img
                ? 'border-green-500 scale-105'
                : 'border-transparent opacity-70 hover:opacity-100'
              }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
