'use client';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from "next/image";
type ImageProps = string | StaticImageData;

export default function ImageGallery({ images }: { images: ImageProps[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const mainImage = images[currentIndex];

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setPosition({ x: 50, y: 50 });
  };

  // For remote images, we need to configure the Next.js Image component
  const isRemoteImage = (src: ImageProps): src is string => {
    return typeof src === 'string' && src.startsWith('http');
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg mb-4 cursor-pointer "
        onMouseMove={handleMouseMove}
        onClick={toggleZoom}
      >
        {isRemoteImage(mainImage) ? (
          <Image
            src={mainImage}
            alt="Main product"
            fill
            className="object-contain"
            style={{
              transformOrigin: `${position.x}% ${position.y}%`,
              transform: isZoomed ? 'scale(2)' : 'scale(1)',
              transition: 'transform 0.2s ease-out'
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={true} // For remote images not configured in next.config.js
          />
        ) : (
          <Image
            src={mainImage}
            alt="Main product"
            fill
            className="object-contain"
            style={{
              transformOrigin: `${position.x}% ${position.y}%`,
              transform: isZoomed ? 'scale(2)' : 'scale(1)',
              transition: 'transform 0.2s ease-out'
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2 shadow-sm">
          {isZoomed ? (
            <ZoomOut size={20} className="text-gray-700" />
          ) : (
            <ZoomIn size={20} className="text-gray-700" />
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="relative">
        {images.length > 1 && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5  rounded-full shadow-md p-1 z-10 hover:bg-gray-100 transition-colors"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5  rounded-full shadow-md p-1 z-10 hover:bg-gray-100 transition-colors"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all border-2 ${currentIndex === idx
                ? 'border-green-500 scale-105'
                : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              aria-label={`View image ${idx + 1}`}
            >
              {isRemoteImage(img) ? (
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                  unoptimized={true}
                />
              ) : (
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
