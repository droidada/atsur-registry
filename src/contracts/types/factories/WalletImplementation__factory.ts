/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  WalletImplementation,
  WalletImplementationInterface,
} from "../WalletImplementation";

const _abi = [
  {
    inputs: [],
    name: "celoTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "erc20TokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawCeloToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawErc20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "xChangeContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610731806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063623231f811610050578063623231f814610119578063bbdb063c14610129578063d80759a81461013c57600080fd5b80632d0797341461007757806354fd4d501461008c5780635d80e08a146100d4575b600080fd5b61008a6100853660046105a6565b61014f565b005b604080518082018252600681527f76312e302e300000000000000000000000000000000000000000000000000000602082015290516100cb91906105e7565b60405180910390f35b6000546100f49073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100cb565b475b6040519081526020016100cb565b61008a610137366004610653565b610316565b61011b61014a36600461067f565b6104ea565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101de91906106a3565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610277576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f574c3a20556e617574686f72697a65640000000000000000000000000000000060448201526064015b60405180910390fd5b6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83811660048301526024820183905284169063a9059cbb906044016020604051808303816000875af11580156102ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061031091906106c0565b50505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610381573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a591906106a3565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610439576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f574c3a20556e617574686f72697a656400000000000000000000000000000000604482015260640161026e565b8047116104a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f57493a20496e73756666696369656e742062616c616e63650000000000000000604482015260640161026e565b60405173ffffffffffffffffffffffffffffffffffffffff83169082156108fc029083906000818181858888f193505050501580156104e5573d6000803e3d6000fd5b505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610557573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057b91906106e2565b92915050565b73ffffffffffffffffffffffffffffffffffffffff811681146105a357600080fd5b50565b6000806000606084860312156105bb57600080fd5b83356105c681610581565b925060208401356105d681610581565b929592945050506040919091013590565b600060208083528351808285015260005b81811015610614578581018301518582016040015282016105f8565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b6000806040838503121561066657600080fd5b823561067181610581565b946020939093013593505050565b60006020828403121561069157600080fd5b813561069c81610581565b9392505050565b6000602082840312156106b557600080fd5b815161069c81610581565b6000602082840312156106d257600080fd5b8151801515811461069c57600080fd5b6000602082840312156106f457600080fd5b505191905056fea2646970667358221220db39c3b129c5d5f11ee5ae649df4460038237b7bb51c7fc1faabe0e244eea1c064736f6c63430008140033";

type WalletImplementationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WalletImplementationConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WalletImplementation__factory extends ContractFactory {
  constructor(...args: WalletImplementationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<WalletImplementation> {
    return super.deploy(overrides || {}) as Promise<WalletImplementation>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WalletImplementation {
    return super.attach(address) as WalletImplementation;
  }
  override connect(signer: Signer): WalletImplementation__factory {
    return super.connect(signer) as WalletImplementation__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WalletImplementationInterface {
    return new utils.Interface(_abi) as WalletImplementationInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): WalletImplementation {
    return new Contract(
      address,
      _abi,
      signerOrProvider,
    ) as WalletImplementation;
  }
}