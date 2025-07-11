export async function getETHTokenBalance(publicAddress: string) {
    const url = process.env.NEXT_PUBLIC_ETH_URL!;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [publicAddress, "erc20"]
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json.result; // This contains the token balances
    } catch (error: unknown) {
        console.error('Error fetching token balances:', error);
        return { error: error };
    }
}
