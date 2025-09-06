'use client';
import { useEffect, useState } from 'react';


export default function useDarkMode(defaultValue = false) {
    const [isDark, setIsDark] = useState(defaultValue);


    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setIsDark(saved === 'dark');
        }
    }, []);


    useEffect(() => {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);


    return [isDark, setIsDark];
}