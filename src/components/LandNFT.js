import React, { useEffect, useState } from 'react'
import logo from "../assets/zomfi.png"
import land from "../assets/land.jpg"
import {useHistory } from "react-router-dom";
import "./css/LandNFT.css"
import {ethers} from "ethers";
import Swal from "sweetalert2"

let erc721token = "0xF112EfdA92bFE834b744eb69B1eA56Cc09C24A87";
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

function LandNFT({walletOn}) {
    let history = useHistory();

    const [reCommonland, setreCommonLad] = useState("0");
    const [reRareland, setreRareLad] = useState("0");
    const [reLegendland, setreLegendLad] = useState("0");

    const [minCommonland, setminCommonLad] = useState("0");
    const [minRareland, setminRareLad] = useState("0");
    const [minLegendland, setminLegendLad] = useState("0");

    const [alCommonland, setalCommonLad] = useState("0");
    const [alRareland, setalRareLad] = useState("0");
    const [alLegendland, setalLegendLad] = useState("0");

    const [onTransaction, setOnTransaction] = useState(false);

    useEffect(() => {
        if(walletOn)
        {
            async function GetRemainLand(){
                let bignum1 = await erc721Contract.totCommon();
                setreCommonLad(bignum1.toString());
    
                let bignum2 = await erc721Contract.totRare();
                setreRareLad(bignum2.toString());
    
                let bignum3 = await erc721Contract.totLegend();
                setreLegendLad(bignum3.toString());
            }
			

            async function TotalMinted(){
                let bignum1 = await erc721Contract.minCommon();
                setminCommonLad(bignum1.toString());
    
                let bignum2 = await erc721Contract.minRare();
                setminRareLad(bignum2.toString());
    
                let bignum3 = await erc721Contract.minLegend();
                setminLegendLad(bignum3.toString());
            }
            TotalMinted();
            GetAllocatedAmount();
            GetRemainLand();
        }
    }, [walletOn])

    async function GetRemainLand(){
        let bignum1 = await erc721Contract.totCommon();
        setreCommonLad(bignum1.toString());

        let bignum2 = await erc721Contract.totRare();
        setreRareLad(bignum2.toString());

        let bignum3 = await erc721Contract.totLegend();
        setreLegendLad(bignum3.toString());
    }

    async function GetAllocatedAmount(){
        let alloc = await erc721Contract.getAllocatedAmount();
        console.log(alloc);

        setalCommonLad(alloc[0].toString());
        setalRareLad(alloc[1].toString());
        setalLegendLad(alloc[2].toString());
    }

    async function TotalMinted(){
        let bignum1 = await erc721Contract.minCommon();
        setminCommonLad(bignum1.toString());

        let bignum2 = await erc721Contract.minRare();
        setminRareLad(bignum2.toString());

        let bignum3 = await erc721Contract.minLegend();
        setminLegendLad(bignum3.toString());
    }

    function LoadingScrren() {
        Swal.fire({
            title: 'Started Minting',
			icon: "success",
            customClass: {
              icon: 'no-border'
            }
          })
    }

	function ApproveTheAmount() {
        Swal.fire({
            title: 'Please Approve the Amount!',
			icon: "info",
            customClass: {
              icon: 'no-border'
            }
          })
    }

    function Decilend() {
        Swal.fire({
            title: 'Transaction Denied!',
            icon: "info",
            customClass: {
              icon: 'no-border'
            }
          })
          setOnTransaction(false);
    }

    function Success() {
        Swal.fire({
            title: 'Transaction is successfull!',
            icon: "success",
            customClass: {
              icon: 'no-border'
            }
          })
          setOnTransaction(false);
    }

    function OnTransaction(){
        Swal.fire({
            title: 'Please Wait! On Transaction!',
            icon: "error",
            customClass: {
              icon: 'no-border'
            }
          })
    }

	function MoreThanAllocated(){
        Swal.fire({
            title: 'More than Allocated',
            icon: "error",
            customClass: {
              icon: 'no-border'
            }
          })
    }
    async function MintCommonNFT(){
        if(onTransaction == false)
        {
			GetAllocatedAmount();
			if(alCommonland > 0)
			{
				let amount = (3* 10**17).toString();
				setOnTransaction(true);
				let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
				let account = accounts[0];
				try{
					let allowance = await erc20Contract.allowance(account, erc721token)
					console.log(allowance.toString())
					console.log(amount);
					ApproveTheAmount();
					if(allowance.toString() < amount){
						let tx = await ApproveAmount(amount);
						console.log(tx);
						MintCommonNFT();
					}
					else{
						try{
							let erc721Contract = new ethers.Contract(erc721token, erc721ABI, tempsigner);
							LoadingScrren();
							let re = await erc721Contract.MintCommonLand();
							let rec = await re.wait();
							Success();
							TotalMinted();
							GetAllocatedAmount();
							GetRemainLand();
							return rec;
						}catch(err)
						{
							Decilend();
						}
					}
				}catch(err)
				{
					Decilend();
				}
			}
			else{
				MoreThanAllocated();
			}
		}else{
			OnTransaction();
		}
    }

	async function MintRareNFT(){
        if(onTransaction == false)
        {
			GetAllocatedAmount();
			if(alRareland > 0)
			{
				let amount = (6* 10**17).toString();
				setOnTransaction(true);
				let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
				let account = accounts[0];
				try{
					let allowance = await erc20Contract.allowance(account, erc721token)
					console.log(allowance.toString())
					console.log(amount);
					ApproveTheAmount();
					if(allowance.toString() < amount){
						let tx = await ApproveAmount(amount);
						console.log(tx);
						MintRareNFT();
					}
					else{
						try{
							let erc721Contract = new ethers.Contract(erc721token, erc721ABI, tempsigner);
							LoadingScrren();
							let re = await erc721Contract.MintRareLand();
							let rec = await re.wait();
							Success();
							TotalMinted();
							GetAllocatedAmount();
							GetRemainLand();
							return rec;
						}catch(err)
						{
							Decilend();
						}
					}
				}catch(err)
				{
					Decilend();
				}
			}
			else{
				MoreThanAllocated();
			}
		}else{
			OnTransaction();
		}
    }

	async function MintLegendNFT(){
        if(onTransaction == false)
        {
			GetAllocatedAmount();
			if(alLegendland > 0)
			{
				let amount = (9* 10**17).toString();
				setOnTransaction(true);
				let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
				let account = accounts[0];
				try{
					let allowance = await erc20Contract.allowance(account, erc721token)
					console.log(allowance.toString())
					console.log(amount);
					ApproveTheAmount();
					if(allowance.toString() < amount){
						let tx = await ApproveAmount(amount);
						console.log(tx);
						MintLegendNFT();
					}
					else{
						try{
							let erc721Contract = new ethers.Contract(erc721token, erc721ABI, tempsigner);
							LoadingScrren();
							let re = await erc721Contract.MintLegendLand();
							let rec = await re.wait();
							Success();
							TotalMinted();
							GetAllocatedAmount();
							GetRemainLand();
							return rec;
						}catch(err)
						{
							Decilend();
						}
					}
				}catch(err)
				{
					Decilend();
				}
			}
			else{
				MoreThanAllocated();
			}
		}else{
			OnTransaction();
		}
    }

    async function ApproveAmount(amount){
        let bignum = await erc20Contract.approve(erc721token, amount);
        let recept = await bignum.wait();
        console.log(recept);
        return recept.transactionHash;
    }
  return (
    <div className='landcards'>
    {walletOn &&
    <div>
        <div className='allDSes'>
            <div className='titleLandNFT'>
                <img className='imagezomfi' src={logo} alt='' />
            </div>
            <div className='details'>
                <div className='titleland' align={"left"}>
                    Mint Zomfi Land NFTs
                </div>
                <div className='descrption' align={"left"}>
                    Choose the land type you would like to mint. 
                    Your owned land NFTs will appear below.
                </div>
            </div>
        </div>

        <div className='landName'>
            Swamp Land Sale
        </div>

        <div className='allcards'>
            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage1' src={land} alt='' /> 
                </div>
                <div className='textdetails'>
                    <div className='NFTName' align={"left"}>
                        <div>Common Land</div>
                    </div>
                    <div className='priceHeading'>Price</div>
                    <div className='middleCard' align={"left"}>
                        <div className='plotsRemain'>{reCommonland} Plots Remaining</div>
                        <div>
                            <img className='pricelogo' src={logo} alt='' />
                        </div>
                        <div className='price'>0.3 ZOM</div>
                    </div>
                    <div className='allocated'>
                        <div className='allocatedTitle'>{alCommonland} allocated nft for you.</div>
                    </div>
                    <div className='mintprogress' align={"left"}>
                        Mint In Progress
                    </div>
                    <div className='minted' align={"left"}>
                        {minCommonland}/4600 Common Land minted
                    </div>
                    <div className='mintNft'>
                        <div className='buttonName' onClick={()=>MintCommonNFT()}>Mint NFT</div>
                    </div>
                </div>
            </div>
            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage1' src={land} alt='' /> 
                </div>
                <div className='textdetails'>
                    <div className='NFTName' align={"left"}>
                        <div>Rare Land</div>
                    </div>
                    <div className='priceHeading'>Price</div>
                    <div className='middleCard' align={"left"}>
                        <div className='plotsRemain'>{reRareland} Plots Remaining</div>
                        <div>
                            <img className='pricelogo' src={logo} alt='' />
                        </div>
                        <div className='price'>0.6 ZOM</div>
                    </div>
                    <div className='allocated'>
                        <div className='allocatedTitle'>{alRareland} allocated nft for you.</div>
                    </div>
                    <div className='mintprogress' align={"left"}>
                        Mint In Progress
                    </div>
                    <div className='minted' align={"left"}>
                        {minRareland}/1600 Rare Land minted
                    </div>
                    <div className='mintNft'>
                        <div className='buttonName' onClick={()=>MintRareNFT()}>Mint NFT</div>
                    </div>
                </div>
            </div>
            <div className='cards'>
                <div className='imageContainer'>
                    <img className='topImage1' src={land} alt='' /> 
                </div>
                <div className='textdetails'>
                    <div className='NFTName' align={"left"}>
                        <div>Legendary Land</div>
                    </div>
                    <div className='priceHeading'>Price</div>
                    <div className='middleCard' align={"left"}>
                        <div className='plotsRemain'>{reLegendland} Plots Remaining</div>
                        <div>
                            <img className='pricelogo' src={logo} alt='' />
                        </div>
                        <div className='price'>0.9 ZOM</div>
                    </div>
                    <div className='allocated'>
                        <div className='allocatedTitle'>{alLegendland} allocated nft for you.</div>
                    </div>
                    <div className='mintprogress' align={"left"}>
                        Mint In Progress
                    </div>
                    <div className='minted' align={"left"}>
                        {minLegendland}/800 Legendary Land minted
                    </div>
                    <div className='mintNft'>
                        <div className='buttonName' onClick={()=>MintLegendNFT()}>Mint NFT</div>
                    </div>
                </div>
            </div>
        </div>
    </div>}

    {!walletOn && 
    <div className='notconnected'>
        <div className='connectYourWallet'>
            Please Connect Your wallet!
        </div>
        <div className='desConnect'>
            There is a connect button top. Please click that and connect your metamask wallet.
        </div>
    </div>}
</div>
  )
}

export default LandNFT