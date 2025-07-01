import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Wallet {
    publicKey: string;
    secretKey: string;
}

interface KeyState {
    keys: Wallet[];
    setKey: (wallet: Wallet) => void;
    clearKeys: () => void;
    deleteKey: (publicKey: string, secretKey: string) => void;
}

export const useSOLKeyState = create<KeyState>()(
    persist(
        (set, get) => ({
            keys: [],
            setKey: (wallet) => {
                const existing = get().keys;
                set({ keys: [...existing, wallet] });
            },
            clearKeys: () => set({ keys: [] }),
            deleteKey: (publicKey, secretKey) => {
                const filtered = get().keys.filter(
                    (w) => !(w.publicKey === publicKey && w.secretKey === secretKey)
                );
                set({ keys: filtered });
            }
        }),
        {
            name: 'sol-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export const useETHKeyState = create<KeyState>()(
    persist(
        (set, get) => ({
            keys: [],
            setKey: (wallet) => {
                const existing = get().keys;
                set({ keys: [...existing, wallet] });
            },
            clearKeys: () => set({ keys: [] }),
            deleteKey: (publicKey, secretKey) => {
                const filtered = get().keys.filter(
                    (w) => !(w.publicKey === publicKey && w.secretKey === secretKey)
                );
                set({ keys: filtered });
            }
        }),
        {
            name: 'eth-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export const useBTCKeyState = create<KeyState>()(
    persist(
        (set, get) => ({
            keys: [],
            setKey: (wallet) => {
                const existing = get().keys;
                set({ keys: [...existing, wallet] });
            },
            clearKeys: () => set({ keys: [] }),
            deleteKey: (publicKey, secretKey) => {
                const filtered = get().keys.filter(
                    (w) => !(w.publicKey === publicKey && w.secretKey === secretKey)
                );
                set({ keys: filtered });
            }
        }),
        {
            name: 'btc-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
