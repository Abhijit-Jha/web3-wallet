"use client";
import { Button } from '@/components/ui/button';
import { ChainType, useSeedPhraseState } from '@/context/seed';
import React, { useState } from 'react';
import { Keypair } from "@solana/web3.js";
import bip39 from 'bip39';
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
import Footer from '@/components/Footer';

const Page = () => {
    const { mnemonics } = useSeedPhraseState();
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
            const path = `m/44'/0'/${account}'/0/0`;
            const bip32 = BIP32Factory(ecc);
            const root = bip32.fromSeed(seed);
            const child = root.derivePath(path);
            const { address } = bitcoin.payments.p2pkh({
                pubkey: Buffer.from(child.publicKey),
                network: bitcoin.networks.bitcoin
            });

            setKey({
                publicKey: address!,
                secretKey: child.toWIF()
            });
        }
        toast.success('Wallet Successfully Created')
        setUseAccount(account + 1);
    }

    return (
        <div className="sm:mx-12 mx-6 space-y-6">
            <Mneomic mnemonics={mnemonics} />
            <WalletHeader chain={chainParam} onCreate={createWallet} onClear={() => clearKeys()} />
            <div className="space-y-4">
                {keys.map((data, index) => (
                    <WalletCard
                        key={`${data.publicKey}-${index}`}
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
