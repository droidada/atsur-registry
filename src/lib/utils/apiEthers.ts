
import ethers from "ethers";
import dotenv from "dotenv";
dotenv.config();


const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_NAME, process.env.RPC_URL);
