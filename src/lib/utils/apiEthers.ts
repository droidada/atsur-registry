
import { providers } from "ethers";
import dotenv from "dotenv";
dotenv.config();


const provider = new providers.JsonRpcProvider(process.env.RPC_NAME, process.env.RPC_URL);



