'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [isVisible, setIsVisible] = useState(true);
    const [isTransparent, setIsTransparent] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction: 'up' | 'down' = scrollY > lastScrollY ? 'down' : 'up';

            if (scrollY > 100) {
                if (direction === 'down' && isVisible) {
                    setIsVisible(false);
                } else if (direction === 'up' && !isVisible) {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }

            // Apply transparency only when scrolling up
            setIsTransparent(direction === 'up' && scrollY > 100);

            lastScrollY = scrollY;
            setScrollDirection(direction);
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => window.removeEventListener('scroll', updateScrollDirection);
    }, [isVisible]);

    return (
        <header
            className={clsx(
                'fixed w-full top-0 z-50 bg-primary transition-transform duration-300 ease-in-out',
                isVisible ? 'translate-y-0' : '-translate-y-full',
                isTransparent ? 'bg-opacity-55' : 'bg-opacity-100'
            )}
        >
            <nav className="flex justify-between items-center p-4">
                <h1>
                    <Link className="text-white font-bold text-xl" href="/">
                        Suitmedia
                    </Link>
                </h1>
                <ul className="flex space-x-4">
                    {[
                        { path: '/', label: 'Work' },
                        { path: '/about', label: 'About' },
                        { path: '/services', label: 'Services' },
                        { path: '/ideas', label: 'Ideas' },
                        { path: '/careers', label: 'Careers' },
                        { path: '/contact', label: 'Contact' },
                    ].map((link) => (
                        <li key={link.path}>
                            <Link href={link.path}>
                                <p
                                    className={clsx(
                                        'text-white hover:text-slate-200',
                                        pathname === link.path && 'border-b-2 border-white'
                                    )}
                                >
                                    {link.label}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
