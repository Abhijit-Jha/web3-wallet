"use client";
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getETHTokenBalance } from '@/lib/utils/getETHTokenBalance';
import { getSOLBalance } from '@/lib/utils/getSOLBalance';
import { useSeedPhraseState } from '@/context/seed';

interface WalletCardProps {
  publicKey: string;
  secretKey: string;
  walletNumber: number;
  handleWalletDeletion: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ publicKey, secretKey, handleWalletDeletion, walletNumber }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { selectedChain } = useSeedPhraseState();

  useEffect(() => {
    const fetchBalance = async () => {
      let result = await getETHTokenBalance(publicKey);
      if (selectedChain == 'eth') {
        result = await getETHTokenBalance(publicKey);
      } else if (selectedChain == 'sol') {
        result = await getSOLBalance(publicKey);
      }
      if (result?.error) {
        toast.error("Failed to fetch balance");
        setBalance(0)
      } else {
        const total = result?.tokenBalances?.reduce((acc: number, token: { tokenBalance: string }) => {
          const balance = parseFloat(token.tokenBalance) || 0;
          return acc + balance;
        }, 0);
        setBalance(total || 0);
      }
    };

    fetchBalance();
  }, [publicKey, selectedChain]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = () => {
    handleWalletDeletion();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-md dark:shadow-lg border border-zinc-300 dark:border-zinc-800 rounded-2xl transition hover:shadow-xl">
        <CardHeader className="flex justify-between items-start pb-1">
          <div>
            <CardTitle className="text-base font-semibold">
              Wallet {walletNumber}
            </CardTitle>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {balance !== null ? `${balance.toFixed(4)} ${selectedChain?.toUpperCase()}` : "Loading..."}
            </p>
          </div>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-600 hover:bg-red-600/10 dark:text-red-500 dark:hover:bg-red-600/20"
              aria-label="Delete wallet"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </DialogTrigger>
        </CardHeader>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the selected wallet from this device. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className='bg-red-500 hover:bg-red-600' onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>

        <CardContent className="space-y-5 mt-2">
          {/* Public Address */}
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Public Address
            </label>
            <div className="relative">
              <Input
                type="text"
                value={publicKey}
                disabled
                className="pr-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                onClick={() => handleCopy(publicKey)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Private Key */}
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Private Key
            </label>
            <div className="relative">
              <Input
                type={showSecret ? "text" : "password"}
                value={secretKey}
                disabled
                className="pr-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default WalletCard;
