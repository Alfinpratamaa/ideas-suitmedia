// components/Banner.tsx
'use client';
import { useEffect, useRef } from 'react';

const Banner: React.FC = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            style={{ backgroundImage: 'url(/download.jpeg)', backgroundClip: "content-box" }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/50 to-transparent z-10">
                <h1 className="text-4xl text-white">Ideas</h1>
                <p className="text-lg text-white">Where all our great things begin</p>
            </div>
            <div
                className="absolute bottom-0 left-0 w-full h-28 bg-white z-20"
                style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
                }}
            />
        </section>
    );
};

export default Banner;
