import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export async function getSOLBalance(pKey: string) {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey = new PublicKey(pKey);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
}