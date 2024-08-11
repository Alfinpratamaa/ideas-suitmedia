// components/Banner.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import client from '@/lib/sanityClient';
import { urlFor } from '@/lib/urlFor';

const Banner: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const fetchBannerData = async () => {
          try {
             const bannerData = await client.fetch(`
  *[_type == "banner"] | order(publishedDate desc)[0] {
    title,
    description,
    image
  }
`);

              

              if (bannerData) {
                  setTitle(bannerData.title || '');
                  setDescription(bannerData.description || '');

                  // Ensure image is not undefined
                  if (bannerData.image) {
                      setBackgroundImage(urlFor(bannerData.image).url());
                  } else {
                      console.warn('Image field is missing or undefined');
                  }
              }
          } catch (error) {
              console.error('Failed to fetch banner data:', error);
          }
      };

      fetchBannerData();

      const handleScroll = () => {
          if (bannerRef.current) {
              const scrollY = window.scrollY;
              bannerRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
        <section
            ref={bannerRef}
            className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundClip: 'content-box' }}
      >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/50 to-transparent z-10">
              <h1 className="text-4xl text-white">{title}</h1>
              <p className="text-lg text-white">{description}</p>
          </div>
          <div
              className="absolute bottom-0 left-0 w-full h-28 bg-white z-20"
              style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
              }}
          />
      </section>
  );
};

export default Banner;
