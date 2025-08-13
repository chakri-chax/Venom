import { lockliftChai, LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import * as dotenv from "dotenv";
import chai from "chai";

dotenv.config();
chai.use(lockliftChai);

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-devnet.venom.foundation/";

// Create your own link on https://dashboard.evercloud.dev/

const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    version: "0.62.0",

    // Specify config for extarnal contracts as in exapmple
    externalContracts: {
      "node_modules/tip3-contracts/contracts": ["TokenRoot", "TokenWallet"],
    },
  },
  linker: {
    // Specify path to your stdlib
    // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
    // // Specify path to your Linker
    // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

    // Or specify version of linker
    version: "0.15.48",
  },
  networks: {
    locklift: {
      connection: {
        id: 1001,
        // @ts-ignore
        type: "proxy",
        // @ts-ignore
        data: {},
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
      fork: {
        contracts: [
          {
            address: "0:56a3f53b5d07da8266c38eb7b4fe1b0e3f3dac6b88ef23a1634d4b9bd4eb2bbe",
            abi: {
              path: "external_abi/DexPair.abi.json",
            },
          },
          {
            codeHash: "b91fd2506cbcf7d973347f5fe7240c93966153d041e86c5036f4cb8109d54983",
            abi: {
              path: "external_abi/DexTokenVault.abi.json",
            },
          },
          {
            codeHash: "3f6602aa1baa20ae46859741cc2338f866ffa54dd8e737af39035aac90b2b7d9",
            abi: {
              path: "external_abi/TokenWallet.abi.json",
            },
          },
          {
            codeHash: "dea8fa8b886d2d8ac9f55274d96762a0308239d3a52c6788ddc03218258379ac",
            abi: {
              path: "external_abi/VaultTokenWallet.abi.json",
            },
          },
          {
            abi: { path: "external_abi/DexRoot.abi.json" },
            address: "0:8befb8324b036876ac5da268570031c10b0baa5c26bc7f69af17b2db20fc09b7",
          },
        ],
        source: {
          type: "live",
          connection: {
            id: 1000,
            type: "jrpc",
            group: "dev",
            data: {
              endpoint: "https://jrpc.venom.foundation",
            },
          },
        },
      },
    },
    local: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [LOCAL_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      // This giver is default local-node giverV2
      giver: {
        // Check if you need provide custom giver
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: "https://jrpc.venom.foundation",
        },
      },
      giver: {
        address: process.env.VENOM_MAIN_GIVER_ADDRESS!,
        key: process.env.VENOM_MAIN_GIVER_KEY!,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    main: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: "mainnetJrpc",
      // This giver is default Wallet
      giver: {
        address: process.env.VENOM_MAIN_GIVER_ADDRESS!,
        key: process.env.VENOM_MAIN_GIVER_KEY!,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    mainnet: {
      connection: {
        id: 1,
        type: "jrpc", //proto
        group: "mainnet",
        data: {
          endpoint: "https://jrpc.venom.foundation",
          
        }
      },
      giver: {
        address: "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081", // Optional for mainnet
        key: "25d1567ab079ee2b031a163a8226c34dbbd29475bc56626fb4c49a1d30b71330", 
      },
      keys: {
        // Your mainnet key
        phrase: "push finger naive equip onion rely hundred aisle upgrade seed dog budget",
        amount: 20,
      },
     
    },
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
