import React, {useEffect, useState} from 'react';
import logo from "../img/logo.png";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import Button from 'react-bootstrap/Button'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../utils/providerOptions";
const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/28337fe6f81d41dcaf891dbba47aaabe"
const injected = injectedModule()
const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ]
})
function Header() {
    const [walletConnectState, setWalletConnectState] = useState('Connect')
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    const [chainId, setChainId] = useState();
    const [error, setError] = useState("");
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "#2F5425",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
    
    const connectWallet = async () => {
      try {
      const wallets = await onboard.connectWallet()
      } catch (error) {
          setError(error);
        }
    }
    // const connectWallet = async () => {
    //   try {
    //     const provider = await web3Modal.connect();
        // console.log(provider)
        // const library = new ethers.providers.Web3Provider(provider);
        // const accounts = await library.listAccounts();
        // const network = await library.getNetwork();
        // setProvider(provider);
        // setLibrary(library);
        // if (accounts) setAccount(accounts[0]);
        // setChainId(network.chainId);
    //   } catch (error) {
    //     setError(error);
    //   }
    // };

    // const connectWallet = async () => {
    //   if (window.ethereum) {
    //     try {
    //       const accounts = await ethereum.request({
    //         method: 'eth_requestAccounts',
    //         params: [{ eth_accounts: {}}]
    //       });
    //       const account = accounts[0];
    //     } catch (error) {
    //       setError(error);
    //     }
    //   }
    // };
    useEffect(()=>{
      window.addEventListener("scroll", handleScroll);
    },[])
    const handleScroll=()=>{
      if (window.pageYOffset > 100) {
        document.getElementById('mainheader').style.backgroundColor = "#2F5425"
    }else{
      document.getElementById('mainheader').style.backgroundColor = "transparent"
    }
    }

    const handleNavBar =(e)=>{
      console.log(e.target)
    }
    return (
        <header className="header header_right" id='mainheader'>
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-6 col-md-3 header-left__logo">
                        <a href="#"><img src={logo} alt="logo"/></a>
                    </div>
                    <div className="col-6 col-md-9 container__header-right align-self-center">
                        <nav className="header-right__menu text-lg-center">
                            <ul>
                                <li><a  href="index.html">Home</a></li>
                                <li><a  href="#">Tokenomics</a></li>
                                <li><a  href="#">Roadmap</a></li>
                                <li><a  href="#">Partners</a></li>
                                <li><a  href="#">Contact Us</a></li>
                                
                                <li className="connect"><button onClick={() => connectWallet()}>{walletConnectState}</button></li>
                            </ul>
                        </nav>
                        <div className="header__burger" onClick={(e) => handleNavBar(e)}>
                            <span></span>
                        </div>
                    </div>
                </div> 
            </div>
        </header>  
  );
}

export default Header;
