import {ethers} from "ethers";

const fujiExternalProvider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc"
);
const attosExternalProviderSubnet = new ethers.providers.JsonRpcProvider(
    "https://attos.fun/ATTOS/rpc"
);

export {fujiExternalProvider, attosExternalProviderSubnet};