"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t border-zinc-800 dark:border-zinc-700 py-4 mt-12">
            <div className="flex flex-col md:flex-row justify-center items-center text-sm text-zinc-600 dark:text-zinc-400 gap-1">
                <span>🚀 Created by</span>
                <Link
                    href="https://github.com/Abhijit-Jha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-600"
                >
                    Abhijit Jha
                </Link>
                <span className="hidden md:inline">•</span>
                <Link
                    href="https://github.com/Abhijit-Jha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-600"
                >
                    ⭐ Star me on GitHub
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
