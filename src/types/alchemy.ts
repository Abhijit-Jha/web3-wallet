// types/alchemy.ts (or at the top of your util file)
export interface AlchemyTokenBalance {
    contractAddress: string;
    tokenBalance: string;
    error?: string;
}

export interface AlchemyTokenBalanceResult {
    address: string;
    tokenBalances: AlchemyTokenBalance[];
}

export interface AlchemyTokenBalanceResponse {
    jsonrpc: string;
    id: number;
    result: AlchemyTokenBalanceResult;
}
