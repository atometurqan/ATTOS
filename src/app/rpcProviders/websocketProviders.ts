import {ethers} from "ethers";

const infureProviderWs = new ethers.providers.WebSocketProvider(
    "wss://avalanche-fuji.infura.io/ws/v3/cdf507bdc77c400cb2040de9ec05c16d"
);
const attosProviderWs = new ethers.providers.WebSocketProvider(
    "wss://attos.fun/ATTOS/ws"
);

export {infureProviderWs, attosProviderWs};