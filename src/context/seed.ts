import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ChainType = 'sol' | 'eth' | 'btc';

interface SeedPhraseType {
    mnemonics: string;
    selectedChain: ChainType | null;
    setMnemonics: (mnemonics: string) => void;
    setChain: (chain: ChainType) => void;
}

export const useSeedPhraseState = create<SeedPhraseType>()(
    persist(
        (set) => ({
            mnemonics: '',
            selectedChain: null,

            setMnemonics: (mnemonics) => set({ mnemonics }),
            setChain: (chain) => set({ selectedChain: chain }),
        }),
        {
            name: 'wallet-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
