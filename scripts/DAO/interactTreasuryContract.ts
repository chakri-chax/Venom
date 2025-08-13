import { error } from "console";
import { Address, toNano, WalletTypes } from "locklift";

import {TreasuryABI} from "../../build/TreasuryABI"
const treasuryContractAddress = new Address("0:a4159a711459861d13e38719791a8f630baab3a3023200340b8e63293329d45d")

const interactTreasuryContract = async () => {
    let treasuryContractInstance;
try {
     treasuryContractInstance = new locklift.provider.Contract(TreasuryABI,treasuryContractAddress)
        // console.log("sadfsdf",treasuryContractInstance);
        const owner = await treasuryContractInstance.methods.owner().call();
        console.log("Owner ::", owner);
    
} catch (error) {
    console.log(error);
    
}
    // const treasuryContractInstance =await locklift.factory.getDeployedContract("Treasury", treasuryContractAddress);
    console.log("addd");
    

   

}

interactTreasuryContract().
then(process.exit(1))
.catch((error) => console.log("[Error]", error)
)