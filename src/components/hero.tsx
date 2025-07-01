"use client";
import React from 'react';
import { Button } from './ui/button';
import { LinkPreview } from './ui/link-preview';
import { generateSeedPhraseAndStore } from '@/lib/utils/generateSeedPhraseAndStore';
import { useRouter } from 'next/navigation';
import Footer from './Footer';
import { toast } from 'sonner';

const Hero = () => {
    const router = useRouter();

    const handleClick = async (chain: 'sol' | 'btc' | 'eth') => {
        try {
            await generateSeedPhraseAndStore(chain);
            const chainName = chain.charAt(0).toUpperCase() + chain.slice(1);

            toast.success(`${chainName} wallet created successfully 🚀`);
            router.push(`/wallet/${chain}`);
        } catch (error) {
            toast.error(`Failed to create ${chain.toUpperCase()} wallet. Please try again.`);
            console.error(error);
        }
    };


    return (
        <>
            <section className="flex justify-center items-center h-[70vh] px-6">
                <div className="text-center space-y-6 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
                        Create{' '}
                        <LinkPreview
                            url="https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets"
                            className="text-blue-700 hover:underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            Hierarchical Deterministic (HD)
                        </LinkPreview>{' '}
                        Wallets
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 ">
                        Secure and scalable wallets supporting multiple blockchains.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Button aria-label="Explore Solana support" onClick={() => handleClick('sol')}>
                            Solana
                        </Button>
                        <Button aria-label="Explore Bitcoin support" onClick={() => handleClick('btc')}>
                            Bitcoin
                        </Button>
                        <Button aria-label="Explore Ethereum support" onClick={() => handleClick('eth')}>
                            Ethereum
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Hero;
