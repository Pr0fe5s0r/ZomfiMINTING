import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MiddlePad from "./components/MiddlePad";
import Card from "./components/Card";
import Bottom from "./components/Bottom";
import LandNFT from "./components/LandNFT";
import { useEffect, useState, CSSProperties } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import Swal from "sweetalert2";
import {ethers} from "ethers";

function App() {
  const [loading, setloading] = useState(false);

  let erc721token = "0x42a88Afe081769C12985b607aA306c82053821bA";
  let erc721ABI =[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "token_id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reaminNFT",
          "type": "uint256"
        }
      ],
      "name": "MINTNFT",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "addManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_addr",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_com",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_rare",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_legend",
          "type": "uint256[]"
        }
      ],
      "name": "BulkwhiteListNFTByManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MintCommonLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MintLegendLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MintRareLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "revokeManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "uri",
          "type": "string"
        }
      ],
      "name": "safeMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_com",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_legend",
          "type": "uint256"
        }
      ],
      "name": "whiteListNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_com",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_legend",
          "type": "uint256"
        }
      ],
      "name": "whiteListNFTByManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_adr",
          "type": "address"
        }
      ],
      "name": "withdrawAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tok",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "_tokenIdCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "_whiteListed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllocatedAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyNFTCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalNFTs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "isAlreadyListed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "isManagerOfCon",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "limit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minCommon",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minLegend",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minRare",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceCommon",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceLegend",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "priceRare",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "remainlimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totCommon",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totLegend",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totRare",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  let erc20Token = "0xF78bFa5013046a1ced185D27C4F3beA2f1625935";
  let erc20ABI = [
              {
                  "inputs": [
                      {
                          "internalType": "string",
                          "name": "name_",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "symbol_",
                          "type": "string"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "constructor"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "owner",
                          "type": "address"
                      },
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                      }
                  ],
                  "name": "Approval",
                  "type": "event"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                      },
                      {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                      }
                  ],
                  "name": "Transfer",
                  "type": "event"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "owner",
                          "type": "address"
                      },
                      {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                      }
                  ],
                  "name": "allowance",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "approve",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                      }
                  ],
                  "name": "balanceOf",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "decimals",
                  "outputs": [
                      {
                          "internalType": "uint8",
                          "name": "",
                          "type": "uint8"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "subtractedValue",
                          "type": "uint256"
                      }
                  ],
                  "name": "decreaseAllowance",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "spender",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "addedValue",
                          "type": "uint256"
                      }
                  ],
                  "name": "increaseAllowance",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "name",
                  "outputs": [
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "symbol",
                  "outputs": [
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [],
                  "name": "totalSupply",
                  "outputs": [
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "transfer",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                      },
                      {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                      }
                  ],
                  "name": "transferFrom",
                  "outputs": [
                      {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
              }
  ];

let provider = new ethers.providers.Web3Provider(window.ethereum);
let tempsigner = provider.getSigner();
let erc20Contract = new ethers.Contract(erc20Token, erc20ABI, tempsigner);
let erc721Contract = new ethers.Contract(erc721token, erc721ABI, tempsigner);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 8000);
  }, []);

  const [modalOpenstate, setmodalOpenState] = useState(false);

  const [walletOn, setwalletOn] = useState(false);

  const [showAccount, setShowAccount] = useState("0x000...000");
  const [accountCarrier, setAccountCarier] = useState("0x000000000000000");

  const [accountModal, setAccountModal] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position:'top-end',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const FireToastConnected = () =>{
      Toast.fire({
          icon: 'success',
          title: 'Wallet Connected!'
      })
}

const StartedMinting = () =>{
  Toast.fire({
      icon: 'success',
      title: 'Started Minting!'
  })
}

  async function connect() {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    var account = accounts[0];
    console.log(account);
    setAccountCarier(account);
    let first3 = account.slice(0, 5);
    let last3 = account.slice(-3);
    let finalAccount = first3 + "..." + last3;
    setShowAccount(finalAccount);
    console.log(finalAccount);
    close();
    FireToastConnected();
    setwalletOn(!walletOn);
  }

  async function disconnectwallet() {
    closeAccount();
    setwalletOn(!walletOn);
  }

  const close = () => {
    setmodalOpenState(false);
    document.body.style.overflowY = "scroll";
  };
  const open = () => setmodalOpenState(true);

  const closeAccount = () => {
    setAccountModal(false);
    document.body.style.overflowY = "scroll";
  };

  const openAccount = () => {
    setAccountModal(true);
  };

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loader">
            <div className="loaderscreen">
              <PuffLoader size={100} color={"#f37a24"} loading={loading} />
            </div>
          </div>
        ) : (
          <Switch>
            <Route exact path='/'>
              <Header walletOn={walletOn} showAccount={showAccount} accountCarrier={accountCarrier} disconnectwallet={disconnectwallet} open={open} accountModal={accountModal} modalOpenstate={modalOpenstate} closeAccount={closeAccount} openAccount={openAccount} connect={connect} close={close} />
              <MiddlePad />
              <Card iswalletConnected={walletOn} />
              <Bottom />
            </Route>
            <Route exact path="/mint/land">
              <Header walletOn={walletOn} showAccount={showAccount} accountCarrier={showAccount} disconnectwallet={disconnectwallet} open={open} accountModal={accountModal} modalOpenstate={modalOpenstate} closeAccount={closeAccount} openAccount={openAccount} connect={connect} close={close} />
              <LandNFT walletOn={walletOn}/>
            </Route>
            <Route exact path="/wc">
              <Header walletOn={walletOn} showAccount={showAccount} accountCarrier={showAccount} disconnectwallet={disconnectwallet} open={open} accountModal={accountModal} modalOpenstate={modalOpenstate} closeAccount={closeAccount} openAccount={openAccount} connect={connect} close={close} />
              <LandNFT walletOn={walletOn}/>
            </Route>
            {/* <Route path='/'>
            {history.push("/home")}
          </Route> */}
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
