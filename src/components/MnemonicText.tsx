import React from 'react';

interface MnemonicTextProps {
    count: number;
    text: string;
}

const MnemonicText: React.FC<MnemonicTextProps> = ({ count, text }) => {
    return (
        <div
            className="flex items-center justify-start gap-2 px-3 py-2 rounded-md 
                 bg-zinc-200 dark:bg-zinc-700 text-sm font-medium shadow-sm 
                 h-12 w-full sm:w-auto min-w-[100px] 
                 transition-all duration-300 ease-in-out 
                 hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer"
        >
            <span className="text-zinc-600 dark:text-zinc-300">{count}.</span>
            <span className="text-zinc-800 dark:text-zinc-100 break-all">{text}</span>
        </div>
    );
};

export default MnemonicText;
