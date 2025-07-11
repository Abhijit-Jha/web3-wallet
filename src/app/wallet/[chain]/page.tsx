"use client";
import { ChainType, useSeedPhraseState } from '@/context/seed';
import React, { useState } from 'react';
import { Keypair } from "@solana/web3.js";
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';
import { ethers } from "ethers";
import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { useBTCKeyState, useETHKeyState, useSOLKeyState } from '@/context/keys';
import WalletCard from '@/components/WalletCard';
import Mneomic from '@/components/Mneomic';
import WalletHeader from '@/components/WalletHeader';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { generateSeedPhraseAndStore } from '@/lib/utils/generateSeedPhraseAndStore';

const Page = () => {
    const { mnemonics, setMnemonics } = useSeedPhraseState();
    const [inputMneomnics, setInputMnemonics] = useState('');
    const [account, setUseAccount] = useState(0);
    const params = useParams();

    const chainParam = params?.chain as ChainType || 'sol';
    const getStore = {
        btc: useBTCKeyState(),
        eth: useETHKeyState(),
        sol: useSOLKeyState()
    };

    const { keys, setKey, clearKeys, deleteKey } = getStore[chainParam];

    async function createWallet() {
        if (!mnemonics) {
            toast.error('Please generate a mnemonic first');
            return;
        }
        const seed = bip39.mnemonicToSeedSync(mnemonics);

        if (chainParam === 'sol') {
            const path = `m/44'/501'/${account}'/0'`;
            const dPath = derivePath(path, seed.toString('hex'));
            const keyPair = Keypair.fromSeed(dPath.key);

            setKey({
                publicKey: keyPair.publicKey.toBase58(),
                secretKey: bs58.encode(keyPair.secretKey),
            });

        } else if (chainParam === 'eth') {
            const path = `m/44'/60'/${account}'/0/0`;
            const wallet = ethers.HDNodeWallet.fromSeed(seed).derivePath(path);

            setKey({
                publicKey: wallet.address,
                secretKey: wallet.privateKey
            });

        } else if (chainParam === 'btc') {
            const path = `m/44'/0'/${account}'/0/0`; //1 for testnet, 0 for mainnet
            const bip32 = BIP32Factory(ecc);
            const root = bip32.fromSeed(seed);
            const child = root.derivePath(path);
            const { address } = bitcoin.payments.p2pkh({
                pubkey: Buffer.from(child.publicKey),
                network: bitcoin.networks.bitcoin //or testnet
            });

            setKey({
                publicKey: address!,
                secretKey: child.toWIF()
            });
        }
        toast.success('Wallet Successfully Created')
        setUseAccount(account + 1);
    }

    if (!mnemonics) {
        return (
            <div className="m-10 space-y-4">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                    Mnemonic Not Found
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Please generate or paste your mnemonic phrase to create wallets.
                </p>
                <div className='sm:flex gap-2 h-20 w-full space-y-4'>
                    <Input
                        placeholder="Enter your Mnemonic or leave empty to generate"
                        className="sm:w-5/6 h-12 "
                        onChange={(e) => {
                            setInputMnemonics(e.target.value);
                        }}
                    />
                    <Button variant="default" className="sm:w-1/6 rounded-sm h-12 cursor-pointer w-full"
                        onClick={() => {
                            if (!inputMneomnics) {
                                const generatedMnemonic = bip39.generateMnemonic();
                                setMnemonics(generatedMnemonic);
                                toast.success('Wallet Created Successfully');

                            } else {
                                if (bip39.validateMnemonic(inputMneomnics)) {
                                    setMnemonics(inputMneomnics);
                                    toast.success('Wallet Created Successfully');
                                } else {
                                    toast.error('Invalid mnemonic phrase Please check again!!');
                                }
                            }
                        }}>
                        {inputMneomnics ? "Import wallet" : "Generate Seed Phrase"}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="sm:mx-12 mx-6 space-y-6">
            <Mneomic mnemonics={mnemonics} />
            <WalletHeader chain={chainParam} onCreate={createWallet} onClear={() => clearKeys()} />
            <div className="space-y-4">
                {keys.map((data, index) => (
                    <WalletCard
                        key={`${data.publicKey}-${index}`}
                        walletNumber={index + 1}
                        secretKey={data.secretKey}
                        publicKey={data.publicKey}
                        handleWalletDeletion={() => {
                            console.log("Called")
                            deleteKey(data.publicKey, data.secretKey);
                            toast.success(`Wallet ${data.publicKey} is deleted`);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
