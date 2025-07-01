import { useSeedPhraseState } from '@/context/seed';
import bip39 from 'bip39';
import AesEncryption from 'aes-encryption';

const aes = new AesEncryption();

export async function generateSeedPhraseAndStore(chain: "sol" | "eth" | "btc") {
    const { mnemonics, setMnemonics, setChain } = useSeedPhraseState.getState();
    setChain(chain)
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!secretKey || secretKey.length < 16) {
        throw new Error('Invalid or missing NEXT_PUBLIC_SECRET_KEY');
    }

    aes.setSecretKey(secretKey);

    const encryptedMnemonic = localStorage.getItem('encryptedMnemonic');

    if (encryptedMnemonic) {
        const decrypted = aes.decrypt(encryptedMnemonic);
        if (bip39.validateMnemonic(decrypted)) {
            setMnemonics(decrypted);
            return;
        }
    }

    const gmnemonic = bip39.generateMnemonic();
    setMnemonics(gmnemonic);

    const encrypted = aes.encrypt(gmnemonic);
    localStorage.setItem('encryptedMnemonic', encrypted);

    console.log('New mnemonic:', gmnemonic);
}
