import React, { useState } from 'react';
import { ChainType } from '@/context/seed';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useBTCKeyState, useETHKeyState, useSOLKeyState } from '@/context/keys';

interface WalletHeaderProps {
    chain: ChainType | null;
    onCreate?: () => void;
    onClear?: () => void;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ chain, onCreate, onClear }) => {
    const [open, setOpen] = useState(false);

    const getWalletName: Record<ChainType, string> = {
        eth: 'Ethereum Wallet',
        sol: 'Solana Wallet',
        btc: 'Bitcoin Wallet',
    };

    const currentName = chain ? getWalletName[chain] : 'Wallet';

    const getStore = {
        btc: useBTCKeyState(),
        eth: useETHKeyState(),
        sol: useSOLKeyState()
    };

    const { keys } = getStore[chain || 'sol'];

    const handleDelete = () => {
        onClear?.();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
                {currentName}
            </h2>

            <Dialog open={open} onOpenChange={setOpen}>
                <div className="flex gap-3">
                    <Button
                        className="rounded-md text-sm"
                        onClick={onCreate}
                        aria-label="Create Wallet"
                    >
                        Create Wallet
                    </Button>
                    <DialogTrigger asChild>
                        <Button
                            className="rounded-md bg-red-500 hover:bg-red-600 text-sm"
                            aria-label="Delete All Wallets"
                            disabled={keys.length === 0}
                        >
                            Delete All
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. It will permanently delete all your wallets from this device.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button className='bg-red-500 hover:bg-red-600' onClick={handleDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
};

export default WalletHeader;
