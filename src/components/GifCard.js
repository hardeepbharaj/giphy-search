'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GifCard = ({ gif, priority = false }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="relative aspect-square">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={gif.images.fixed_height.url}
          alt={gif.title || 'GIF'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          priority={priority}
          quality={75}
        />
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-300 truncate">{gif.title}</p>
      </div>
    </motion.div>
  );
};

export default GifCard;