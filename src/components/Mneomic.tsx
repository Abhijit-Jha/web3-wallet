import { ChevronDown, Copy } from 'lucide-react';
import React, { useState } from 'react';
import MnemonicText from './MnemonicText';
import { toast } from "sonner";

interface MnemonicProps {
    mnemonics: string;
}

const Mnemonic: React.FC<MnemonicProps> = ({ mnemonics }) => {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const mnemonicWords = mnemonics.trim().split(/\s+/);

    const handleCopy = () => {
        navigator.clipboard.writeText(mnemonics);
        toast.success('Mnemonic phrase copied to clipboard!');
    };

    return (
        <div className="mt-6 border-2 p-4">
            <div
                className="flex items-center justify-between cursor-pointer px-6 py-2 rounded-md transition"
                onClick={() => setShowMnemonic(!showMnemonic)}
            >
                <span className="md:text-2xl text-xl font-semibold">Your Secret Phrase</span>
                <ChevronDown
                    className={`w-8 h-8 transition-transform duration-300 rounded-full p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 
            hover:scale-110 ${showMnemonic ? 'rotate-180' : ''}`}
                />
            </div>

            <div
                className={`transition-all duration-500 overflow-hidden transform
          ${showMnemonic ? 'max-h-[600px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}
          onClick={handleCopy}
            >
                <div className="rounded-b-2xl px-6 py-4 bg-zinc-100 dark:bg-zinc-800 mt-2 space-y-4">
                    <span className="text-sm text-red-500 font-medium">
                        Make sure no one is watching you 👀
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {mnemonicWords.map((word, index) => (
                            <MnemonicText key={index} count={index + 1} text={word} />
                        ))}
                    </div>

                    <div
                        onClick={handleCopy}
                        className="flex items-center gap-2 mt-2 text-sm text-zinc-700 dark:text-zinc-200 cursor-pointer p-2 rounded-md w-fit"
                        role="button"
                        tabIndex={0}
                    >
                        <Copy className="w-4 h-4" />
                        <span className="hover:text-zinc-300">Click anywhere to copy phrase</span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Mnemonic;
