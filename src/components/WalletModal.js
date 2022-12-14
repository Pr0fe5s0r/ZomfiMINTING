import {motion} from "framer-motion";
import Backdrop from "./Backdrop";
import React,{useEffect, useState, useRef} from 'react'
import "./css/Modal.css"
import "./css/WalletModal.css"
import land from "../assets/land.jpg"
import Swal from "sweetalert2";
import {ethers} from "ethers";

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
]

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


function WalletModal({gcase, handleClose, account, disconnect, commonbal, rarebal, legenbal}) {

    const [balance, setbalance] = useState(false);

    const [pcommon, setpcommon] = useState("0");
    const [prare, setprare] = useState("0");
    const [plegend, setplegend] = useState("0");

	const address = useRef(null);
	const common = useRef(null);
	const rare = useRef(null);
	const legend = useRef(null);


    const [isLandorpet, setisLandOrPet] = useState(false);
	const [iswc, setiswc] = useState(false);

    const [erc20bala, setErc20Bal] = useState("0");

	const [ismanager, setismanager] = useState(false);

    useEffect(() => {
        if(parseInt(commonbal) >0 || parseInt(rarebal) >0 || parseInt(legenbal) >0)
        {
            setbalance(true);
            setpcommon((parseInt(commonbal) * 0.3).toString());
            setprare((parseInt(rarebal) * 0.6).toString());
            setplegend((parseInt(legenbal) * 0.9).toString());
        }
        if(gcase)
        {
            document.body.style.overflow = "hidden"
        }

        async function GetBalanceof(){
            let accountss = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            var accounts = accountss[0];
            let balance = await erc20Contract.balanceOf(accounts);
            setErc20Bal(parseFloat((balance)/10**18).toString());
        }

		async function isMnager(){
            let accountss = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            var accounts = accountss[0];
            let isman = await erc721Contract.isManagerOfCon(accounts);
            if(isman == true)
			{
				setismanager(true);
			}
        }
        GetBalanceof();
		isMnager();
    }, [gcase])

    function Success() {
        Swal.fire({
            title: 'Transaction is successfull!',
            icon: "success",
            customClass: {
              icon: 'no-border'
            }
          })
    }

    function pleaseCheck() {
        Swal.fire({
            title: 'Please Check the inputs!',
            icon: "error",
            customClass: {
              icon: 'no-border'
            }
          })
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    const PleaseWait = () =>{
        Toast.fire({
            icon: 'info',
            title: 'Please Wait for Transaction to Complete!'
    })
    }

    async function ApproveWhiteList(address, com, rare, legen){
        if(address != "" && com != "" && rare != "" && legen != "")
        {
            let isman = await erc721Contract.whiteListNFTByManager(address, com, rare, legen);
            PleaseWait();
            let rec = await isman.wait();
            Success();
        }
        else{
            pleaseCheck();
        }
    }
    

    const dropIn = {
        hidden:{
            y: "-100vh",
            opacity: 0,
        },
        visible:{
            y:"0",
            opacity:1,
            transition:{
                duration: 0.1,
                type: "spring",
                damping: 100,
                stiffness: 500,
            }
        },
        exit:{
            y:"100vh",
            opacity: 0,
        },
    };

  return (
    <Backdrop onClick={handleClose}>
        <motion.div onClick={(e)=> e.stopPropagation()} 
            className="modalOri"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
                <div className="cardoption">
                    <div className="contents">
                        <div className="accountCarrier">
                            <div className="account" align={'left'}>
                                Your Wallet
                            </div>
                            <div className="walletModal">
                                <div className="wallet">
                                    {account}
                                </div>
                            </div>
                        </div>
                        <div className="accountCarrier" align={'right'}>
                            <div className="account" align={'left'}>
                                ZOMFI
                            </div>
                            <div className="walletModal">
                                <div className="wallet">
                                    {erc20bala}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Landpetsbtn">
                        <div className="land" style={{backgroundColor: isLandorpet && "#a16cfd"}} onClick={()=>{
							setisLandOrPet(!isLandorpet)
							setiswc(iswc)
							}}>
                            Lands
                        </div>
                        <div className="pets" style={{backgroundColor: !isLandorpet && "#a16cfd"}} onClick={()=>{
							setisLandOrPet(!isLandorpet)
							setiswc(iswc)
							}}>
                            Pets
                        </div>
						{ismanager && <div className="whitelist" style={{backgroundColor: iswc && "#a16cfd"}} onClick={()=>{
							setiswc(!iswc)
							}}>
                            WhitList
                        </div>}
                    </div>
					{iswc && <div className="wccontainer">
						<div className="titlewc" align={"left"}>
							Enter the Address:
							<div className="commonwcinput">
							<input 
							 className="inu" 
							 align={"left"}
							 ref={address}
							 placeholder="0xadhkn37shi5jm2kd"
							 type="text"
							 id="message"
							 name="message"/>
							</div>
						</div>
						<div className="titlewc" align={"left"}>
							Common Land:
							<div className="commonwcinput">
							<input 
							 className="inu" 
							 align={"left"}
							 placeholder="2"
							 ref={common}
							 type="text"
							 id="message"
							 name="message"/>
							</div>
						</div>
						<div className="titlewc" align={"left"}>
							Rare Land:
							<div className="commonwcinput">
							 <input 
							 className="inu" 
							 align={"left"}
							 placeholder="2"
							 ref={rare}
							 type="text"
							 id="message"
							 name="message"/>
							</div>
						</div>
						<div className="titlewc" align={"left"}>
							Legend Land:
							<div className="commonwcinput">
							<input 
							 className="inu" 
							 align={"left"}
							 placeholder="2"
							 ref={legend}
							 type="text"
							 id="message"
							 name="message"/>
							</div>
						</div>
						<div className="approveButton" onClick={()=>{
                            ApproveWhiteList(address.current.value, common.current.value, rare.current.value, legend.current.value);
							}}>
                            Approve
                        </div>
					</div>}
                    <div className="myLnads">
                        {isLandorpet && 
                        <div className="account" align={'left'}>
                            My Lands:
                        </div>}

                        {!isLandorpet && 
                        <div className="account" align={'left'}>
                            My Pets:
                        </div>}
                    </div>
                    <div className="baltitle">
                        <div className="imgTitle">Image</div>
                        <div className="NameTitle">Name</div>
                        <div className="counttitle">Count</div>
                        <div className="totpricetitle">Total Price</div>
                    </div>
                    {balance && isLandorpet && <div className="allLands">
                            <div className="commonLand">
                                <div className="image">
                                    <img className="imageLandbal" src={land} alt="" />
                                </div>
                                  <div className="landname" align={"left"}>
                                      Common
                                  </div>
                                  <div className="landcount">
                                      {commonbal}
                                  </div>
                                  <div className="landprice">
                                      {pcommon}
								  </div>
                            </div>
                            <div className="commonLand">
                                <div className="image">
                                    <img className="imageLandbal" src={land} alt="" />
                                </div>
                                <div className="rlandname">
                                 Rare
                                </div>
                                <div className="landcount">
                                    {rarebal}
                                </div>
                                <div className="landprice">
                                    {prare}
                                </div>
                            </div>
                            <div className="commonLand">
                                <div className="image">
                                    <img className="imageLandbal" src={land} alt="" />
                                </div>
                                <div className="landname">
                                    Legendary
                                </div>
                                <div className="rlandcount">
                                    {legenbal}
                                </div>
                                <div className="landprice">
                                    {plegend}
                                </div>
                            </div>
                    </div>}

                    {balance && !isLandorpet && <div className="nobala">
                        <div className="thereisno">Pets are Coming Soon!</div>
                    </div>}

                    {!balance && 
                    <div className="nobala">
                        <div className="thereisno">There is no Content!</div>
                    </div>}

                    <div className="disconnect" onClick={disconnect}>
                        <div className="title">
                            Disconnect
                        </div>
                    </div>
                </div>
        </motion.div>
    </Backdrop>
  )
}

export default WalletModal