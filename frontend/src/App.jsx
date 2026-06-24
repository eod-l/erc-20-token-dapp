import { useState } from 'react';
import { ethers } from 'ethers';
import { tokenAbi } from './tokenAbi';

const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;
const expectedChainId = Number(import.meta.env.VITE_CHAIN_ID || 11155111);
const expectedNetworkName = import.meta.env.VITE_NETWORK_NAME || 'Sepolia';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Not connected');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      setStatus('MetaMask is not installed.');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();

      setWalletAddress(accounts[0] || '');
      setNetworkName(network.name || `Chain ID: ${network.chainId.toString()}`);

      if (Number(network.chainId) !== expectedChainId) {
        setStatus(`Connected, but please switch to ${expectedNetworkName}.`);
      } else {
        setStatus('Wallet connected successfully.');
      }
    } catch (error) {
      setStatus(error.message || 'Failed to connect wallet.');
    } finally {
      setIsConnecting(false);
    }
  }

  async function sendTokens(event) {
    event.preventDefault();

    if (!window.ethereum) {
      setStatus('MetaMask is not installed.');
      return;
    }

    if (!tokenAddress) {
      setStatus('Token address is missing. Add VITE_TOKEN_ADDRESS to the frontend .env file.');
      return;
    }

    if (!ethers.isAddress(recipient)) {
      setStatus('Recipient address is not valid.');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setStatus('Enter a token amount greater than 0.');
      return;
    }

    try {
      setIsSending(true);
      setStatus('Preparing transaction...');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      if (Number(network.chainId) !== expectedChainId) {
        setStatus(`Wrong network. Please switch to ${expectedNetworkName}.`);
        return;
      }

      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const decimals = await tokenContract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await tokenContract.transfer(recipient, parsedAmount);
      setStatus('Transaction sent. Waiting for confirmation...');

      await tx.wait();
      setStatus(`Transfer complete. Transaction hash: ${tx.hash}`);
      setRecipient('');
      setAmount('');
    } catch (error) {
      setStatus(error.reason || error.message || 'Transfer failed.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="app">
      <div className="card">
        <h1>ERC-20 Token DApp</h1>
        <p className="intro">
          Connect your wallet, check your network, and send your ERC-20 token on a testnet.
        </p>

        <button onClick={connectWallet} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>

        <div className="info">
          <p><strong>Wallet:</strong> {walletAddress || 'Not connected'}</p>
          <p><strong>Network:</strong> {networkName || 'Unknown'}</p>
          <p><strong>Expected network:</strong> {expectedNetworkName}</p>
          <p><strong>Token contract:</strong> {tokenAddress || 'Not set yet'}</p>
        </div>

        <form onSubmit={sendTokens}>
          <label>
            Recipient address
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>

          <label>
            Token amount
            <input
              type="number"
              min="0"
              step="any"
              placeholder="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Tokens'}
          </button>
        </form>

        <p className="status"><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
}

export default App;
