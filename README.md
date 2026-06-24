ERC-20 Token DApp

A beginner-friendly full-stack ERC-20 token project built with Solidity, Hardhat, React, and MetaMask. The project includes a smart contract deployed to the Sepolia public testnet and a frontend that allows users to connect their wallet and transfer tokens.
Features

    ERC-20 token smart contract written in Solidity
    OpenZeppelin-based implementation
    Hardhat setup for compile, test, and deployment
    React frontend built with Vite
    MetaMask wallet connection
    displays connected wallet address
    displays selected network
    transfer tokens to another wallet
    deployed to Sepolia public testnet
    successful end-to-end token transfer test completed

Project Structure

    contracts/ - smart contracts
    scripts/ - deployment scripts
    test/ - Hardhat tests
    frontend/ - React frontend

Quick Start
1. Install dependencies

npm install
cd frontend && npm install

2. Create environment file

Create a .env file in the project root:

SEPOLIA_RPC_URL=your_rpc_url_here
BASE_SEPOLIA_RPC_URL=
PRIVATE_KEY=your_test_wallet_private_key_here
ETHERSCAN_API_KEY=
BASESCAN_API_KEY=

3. Compile the contract

npm run compile

4. Run tests

npm test

5. Deploy the contract

npm run deploy:sepolia

After deployment, copy the printed contract address.
6. Configure the frontend

Create frontend/.env and set:

VITE_TOKEN_ADDRESS=0xad1eA156f97EFfE05542669bbAD3298C223A8EfD
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia

7. Run the frontend

cd frontend
npm run dev

How to Use

    Open the frontend in the browser
    Connect MetaMask
    Switch MetaMask to the Sepolia network
    Enter a recipient wallet address
    Enter a token amount
    Confirm the transfer in MetaMask

Current Project Status

The following parts are completed:

    ERC-20 token contract created
    contract compiled successfully
    local Hardhat test passed
    deployer wallet funded with Sepolia ETH
    contract deployed to Sepolia
    frontend connected to deployed contract
    MetaMask integration working
    token transfer tested successfully between wallets

Token Details

    Token name: Beginner Token
    Token symbol: BGT
    Initial supply: 1000000 tokens minted to deployer

Deployment Details

    Network: Sepolia
    Chain ID: 11155111
    Contract Address: PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE

Optional Frontend Deployment

If deploying the frontend publicly, you can use Vercel or Netlify and then add the live URL here.

    Frontend URL: Local development only

Security Notes

    use a test wallet only
    never commit private keys to the repository
    keep .env files out of version control

Future Improvements

    display token balance in the frontend
    show transaction status messages
    add explorer links for transactions
    improve UI styling
    deploy frontend publicly

