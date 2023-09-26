import React, { useState, useEffect } from 'react';
import { abi, contractAddress } from '../config.json';
import { Contract, ethers } from 'ethers';

export const BlockchainContext = React.createContext('');

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [renterExists, setRenterExists] = useState('');
  const [renter, setRenter] = useState('');
  const [renterBalance, setRenterBalance] = useState('');
  //const [creditBalance, setCreditBalance] = useState('');

  const provider = new ethers.BrowserProvider(window.ethereum);
  //const signer = provider.getSigner();

  const address = contractAddress;
  const contractAbi = abi;
  const contractProvider = new ethers.Contract(address, contractAbi, provider);
  //const contractSigner = new ethers.Contract(address, contractAbi, signer);
  console.log('context');
  const connectWallet = async () => {
    console.log('connectWallet');
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const accounts = await provider.send('eth_requestAccounts', []);
      console.log('Test');
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const accounts = await provider.send('eth_accounts');

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balanceOf = await contractProvider.balanceOf();
      setBalance(balanceOf);
      console.log('Contract Balance: ' + balanceOf);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    try {
      console.log('Test1');
      const renter = await contractProvider.renterExists(currentAccount);
      setRenterExists(renter);
      console.log('Test2');
      if (renter) {
        await getRenter();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRenter = async () => {
    try {
      const renter = await contractProvider.getRenter();
      setRenter(renter);
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async () => {
    try {
      //console.log(signer);
      const signer = await provider.getSigner();
      const contractSigner = new ethers.Contract(address, contractAbi, signer);
      const newRenter = await contractSigner.addRenter();
      await newRenter.wait();
      console.log('Add renter function works');
      checkRenterExists();
    } catch (error) {
      console.log(error);
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount) {
        const balance = await contractProvider.balanceOfRenter();
        setRenterBalance(ethers.formatEther(balance));
        console.log('Balance: ' + ethers.formatEther(balance));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deposit = async (value) => {
    try {
      contractProvider.on('Deposit', (_from, amount) => {
        console.log('New Transfer event with the arguments: ' + _from + ' ' + amount);
        //console.log(_from, amount);
      });
    } catch (error) {
      console.log(error);
    } /*
    contractProvider.on(contractProvider.filters.Deposit, (_from, amount) => {
      console.log("New Transfer event with the arguments:");
      console.log(_from, amount);
    })*/
    console.log('Deposit function');
    try {
      console.log(currentAccount);
      const signer = await provider.getSigner();
      const contractSigner = new ethers.Contract(address, contractAbi, signer);
      const credit = ethers.parseEther(value.deposit);
      //console.log(credit);
      const deposit = await contractSigner.deposit({ from: currentAccount, value: credit });
      await deposit.wait();
      await getRenterBalance();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();
    checkIfWalletConnected();
    checkRenterExists();
    getRenterBalance();
  }, [currentAccount]);

  return (
    <BlockchainContext.Provider
      value={{ connectWallet, currentAccount, renterExists, addRenter, renterBalance, deposit }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
