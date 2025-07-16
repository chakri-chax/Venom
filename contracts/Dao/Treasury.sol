// //   //TO do

// // Layout of Contract:
// // version
// // imports
// // errors
// // interfaces, libraries, contracts
// // Type declarations
// // State variables
// // Events
// // Modifiers
// // Functions

// // Layout of Functions:
// // constructor
// // receive function (if exists)
// // fallback function (if exists)
// // external
// // public
// // internal
// // private
// // view & pure functions

// // SPDX-License-Identifier: MIT

// pragma solidity >=0.8.0 <0.9.0;
// pragma abicoder v2;

// // Uncomment this line to use console.log
// import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // Import ERC721 interface

// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
// import "./PriceConvertor.sol";
// //import {Swap} from "../swap.sol";
// import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
// import "@uniswap/swap-router-contracts/contracts/interfaces/IV3SwapRouter.sol";
// import "./ITreasury.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// //Record User deposits in an array format. Each deposit should store user’s depositTime, treasuryDeposit and DeedMint

// interface IMyERC20 {
//     function mint(address to, uint256 amount) external;
// }

// interface IDeedToken {
//     function mintForTreasury(address account, uint256 amount) external;
// }

// contract Treasury is Ownable, ReentrancyGuard, PriceConverter, IERC721Receiver {
//     //PriceConverter public priceConverter;

//     uint256 public FULL_TERM_LOCK_PERIOD = 2 * 6 * 30 * 24 * 60 * 60;
//     address public constant WETH = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
//     address public SWAP_ROUTER_02 = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
//     uint256 public maxslippage = 30;

//     uint256 public DEED_EMISSION_RATE = 50;
//     //uint256 public constant d = 100;
//     address public governance;
//     address[] public assets;
//     uint256[] public assetsdecimals;
//     address[] public priceFeed;
//     uint8[] public assetAllocationRatio;
//     address public immutable mainWallet;
//     address public immutable deedToken;
//     address public immutable DaiToEthPriceFeed;
//     address public depositingAddress;
//     uint24[] poolFeeTier = [100, 100, 3000, 100];

//     uint256 public totalTreasuryPoints;

//     address[] public topTreasuryHolders;
//     mapping(address => uint256) public treasuryHolderIndex;
//     mapping(address => uint256) public treasuryBalances;

//     struct User {
//         uint256 treasuryDeposit;
//         uint256 firstDepositTime;
//     }
//     mapping(address => User[]) public userDeposits; // in dollars User[]

//     // NFT Contracts
//     address public immutable deedNFT;
//     address public immutable founderNFT;
//     address public immutable genesisNFT;
//     bool public forceUnlock = false; // Admin-controlled flag for early unlock

//     mapping(address => mapping(address => uint256[])) public lockedNFTs;
//     mapping(address => mapping(address => uint256[])) public contractlockedNFTs;
//     mapping(address => bool) public isTopTreasuryHolder;
//     // mapping(address => uint256[]) private userDepositIndices;
//     mapping(address => mapping(address => mapping(uint256 => uint256)))
//         public lockTimestamps;

//     event DepositBatch(uint256 users, uint256 totalamountdeposited);
//     event GovernanceUpdated(address oldGovernance, address newGovernance); // more events
//     event NFTLocked(address indexed user, address nftContract, uint256 tokenId);
//     event NFTUnlocked(
//         address indexed user,
//         address nftContract,
//         uint256 tokenId
//     );
//     event Withdraw(address user, uint256 deposits, uint256 deedMinted);
//     event TreasuryIsDrained();
//     event fundsTransferred(address receiver, uint256 totalamountinDai);

//     event assetpriceinusd(uint256 assetpriceinusd);
//     event assetpriceindai(uint256 assetpriceindai);
//     event slipageamoun(uint256 slipageamount);
//     event minoutamt(uint256 minoutamt);
//     event amountou(uint256 amount);
//     event swaplog(address assets0, address assets1, uint256 userShare);

//     // event splitamount(uint256 splitAmount);
//     //         event usdinassetprice(uint256 usdInassetprice);
//     //         event assetpriceind(uint256 assetPriceindai);
//     //         event slipageamt(uint256 slipageamount);
//     //         event minamt(uint256 minamountout);
//     //       event swaplog2(address asseta,address assetb,uint256 usdinassetprice);

//     constructor(
//         address[] memory _assets,
//         uint256[] memory _assetsdecimals,
//         uint8[] memory _assetAllocations,
//         address _deedNFT,
//         address _founderNFT,
//         address _genesisNFT,
//         address _mainWallet,
//         address[] memory _priceFeed,
//         address _deedToken,
//         address _DaiToEthPriceFeed,
//         address _depositingAddress
//     ) Ownable(msg.sender) {
//         require(
//             _assets.length == _priceFeed.length,
//             "Mismatched arrays length"
//         );
//         require(
//             _assets.length == _assetsdecimals.length,
//             "Mismatched arrays length"
//         );
//         require(
//             _deedNFT != address(0) &&
//                 _genesisNFT != address(0) &&
//                 _founderNFT != address(0) &&
//                 _mainWallet != address(0) &&
//                 _deedToken != address(0) &&
//                 _DaiToEthPriceFeed != address(0),
//             "Invalid address"
//         );
//         assets = _assets;
//         assetsdecimals = _assetsdecimals;
//         calculateSumOfRatios(_assetAllocations);
//         assetAllocationRatio = _assetAllocations;
//         deedNFT = _deedNFT;
//         founderNFT = _founderNFT;
//         genesisNFT = _genesisNFT;
//         mainWallet = _mainWallet;
//         priceFeed = _priceFeed;
//         deedToken = _deedToken;
//         depositingAddress = _depositingAddress;
//         DaiToEthPriceFeed = _DaiToEthPriceFeed;
//     }
//     modifier onlyGovernanace() {
//         require(msg.sender == governance, "Only owner can call this");
//         _;
//     }

//     modifier onlyOwnerOrGovernance() {
//         require(
//             msg.sender == owner() || msg.sender == governance,
//             "Caller is not the owner or governance"
//         );
//         _;
//     }

//     modifier onlyOwnerOrDepositingAddress() {
//         require(
//             msg.sender == owner() || msg.sender == depositingAddress,
//             "Only depositing address or owner can call it"
//         );
//         _;
//     }

//     // Functions to lock Deed, Founder, and Genesis NFTs
//     function lockDeedNFT(uint256 tokenId) external {
//         require(
//             !_isLocked(msg.sender, deedNFT, tokenId),
//             "NFT is locked or not owned by user"
//         );
//         require(
//             IERC721(deedNFT).ownerOf(tokenId) == msg.sender,
//             "User does not own the NFT"
//         );

//         require(
//             IERC721(deedNFT).getApproved(tokenId) == address(this),
//             "Contract is not approved to transfer this NFT"
//         );

//         IERC721(deedNFT).safeTransferFrom(msg.sender, address(this), tokenId);
//         // lockedDeedNFTBalance[msg.sender]++;
//         lockTimestamps[msg.sender][deedNFT][tokenId] = block.timestamp;
//         lockedNFTs[msg.sender][deedNFT].push(tokenId);
//         contractlockedNFTs[address(this)][deedNFT].push(tokenId);
//         emit NFTLocked(msg.sender, deedNFT, tokenId);
//     }

//     function lockFounderNFT(uint256 tokenId) external {
//         require(
//             !_isLocked(msg.sender, founderNFT, tokenId),
//             "NFT is  locked or not owned by user"
//         );
//         require(
//             IERC721(founderNFT).ownerOf(tokenId) == msg.sender,
//             "User does not own the NFT"
//         );

//         require(
//             IERC721(founderNFT).getApproved(tokenId) == address(this),
//             "Contract is not approved to transfer this NFT"
//         );

//         IERC721(founderNFT).safeTransferFrom(
//             msg.sender,
//             address(this),
//             tokenId
//         );
//         lockTimestamps[msg.sender][founderNFT][tokenId] = block.timestamp;
//         lockedNFTs[msg.sender][founderNFT].push(tokenId);
//         contractlockedNFTs[address(this)][founderNFT].push(tokenId);
//         emit NFTLocked(msg.sender, founderNFT, tokenId);
//     }

//     function lockGenesisNFT(uint256 tokenId) external {
//         require(
//             !_isLocked(msg.sender, genesisNFT, tokenId),
//             "NFT is not locked or not owned by user"
//         );
//         require(
//             IERC721(genesisNFT).ownerOf(tokenId) == msg.sender,
//             "User does not own the NFT"
//         );
//         require(
//             IERC721(genesisNFT).getApproved(tokenId) == address(this),
//             "Contract is not approved to transfer this NFT"
//         );

//         IERC721(genesisNFT).safeTransferFrom(
//             msg.sender,
//             address(this),
//             tokenId
//         );
//         lockTimestamps[msg.sender][genesisNFT][tokenId] = block.timestamp;
//         lockedNFTs[msg.sender][genesisNFT].push(tokenId);
//         contractlockedNFTs[address(this)][genesisNFT].push(tokenId);
//         emit NFTLocked(msg.sender, genesisNFT, tokenId);
//     }

//     // Unlock NFT (Deed, Founder, Genesis)
//     function unlockNFT(
//         address _nftContract,
//         uint256 _tokenId
//     ) external nonReentrant {
//         require(
//             _isLocked(msg.sender, _nftContract, _tokenId),
//             "NFT is not locked or not owned by user"
//         );

//         require(
//             forceUnlock ||
//                 block.timestamp >=
//                 lockTimestamps[msg.sender][_nftContract][_tokenId] +
//                     FULL_TERM_LOCK_PERIOD,
//             "NFT is still locked and cannot be unlocked before the term ends"
//         );

//         _removeLockedNFT(msg.sender, _nftContract, _tokenId);
//         uint256[] storage tokens = contractlockedNFTs[address(this)][
//             _nftContract
//         ];
//         uint256 lengthh = tokens.length;
//         for (uint256 i = 0; i < lengthh; i++) {
//             if (tokens[i] == _tokenId) {
//                 tokens[i] = tokens[lengthh - 1];
//                 tokens.pop();
//                 break;
//             }
//         }

//         // IERC721(_nftContract).approve(msg.sender, _tokenId);
//         IERC721(_nftContract).safeTransferFrom(
//             address(this),
//             msg.sender,
//             _tokenId
//         );
//         emit NFTUnlocked(msg.sender, _nftContract, _tokenId);
//     }

//     // Internal function to check if the NFT is locked
//     function _isLocked(
//         address user,
//         address nftContract,
//         uint256 tokenId
//     ) internal view returns (bool) {
//         uint256[] memory lockedTokens = lockedNFTs[user][nftContract];
//         uint256 length = lockedTokens.length;
//         for (uint256 i = 0; i < length; i++) {
//             if (lockedTokens[i] == tokenId) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     // Internal function to remove NFT from locked list
//     function _removeLockedNFT(
//         address user,
//         address nftContract,
//         uint256 tokenId
//     ) internal {
//         uint256[] storage lockedTokens = lockedNFTs[user][nftContract];
//         uint256 length = lockedTokens.length;
//         for (uint256 i = 0; i < length; i++) {
//             if (lockedTokens[i] == tokenId) {
//                 lockedTokens[i] = lockedTokens[length - 1];
//                 lockedTokens.pop();
//                 break;
//             }
//         }
//     }

//     // Function to get the list of locked token IDs for a specific NFT contract
//     function getLockedNFTs(
//         address user,
//         address nftContract
//     ) external view returns (uint256[] memory) {
//         return lockedNFTs[user][nftContract];
//     }

//     function getLockedNFTBalances(
//         address _user
//     )
//         external
//         view
//         returns (
//             uint256 deedNFTCount,
//             uint256 founderNFTCount,
//             uint256 genesisNFTCount
//         )
//     {
//         deedNFTCount = lockedNFTs[_user][deedNFT].length;
//         founderNFTCount = lockedNFTs[_user][founderNFT].length;
//         genesisNFTCount = lockedNFTs[_user][genesisNFT].length;
//     }

//     function getEligibleWithdrawDetails(
//         address _userAddress
//     ) external view returns (uint256[] memory, User[] memory) {
//         uint256 userDepositCount = userDeposits[_userAddress].length;
//         require(userDepositCount > 0, "No deposits found for the user");

//         uint256 eligibleCount = 0;

//         // Calculate how many eligible deposits there are
//         for (uint256 i = 0; i < userDepositCount; i++) {
//             if (
//                 userDeposits[_userAddress][i].treasuryDeposit > 0 &&
//                 block.timestamp >=
//                 userDeposits[_userAddress][i].firstDepositTime +
//                     FULL_TERM_LOCK_PERIOD
//             ) {
//                 eligibleCount++;
//             }
//         }

//         // Create arrays to store eligible indices and User details
//         uint256[] memory eligibleIndices = new uint256[](eligibleCount);
//         User[] memory eligibleUsers = new User[](eligibleCount);
//         uint256 index = 0;

//         // Populate arrays with the eligible indices and User details
//         for (uint256 i = 0; i < userDepositCount; i++) {
//             if (
//                 userDeposits[_userAddress][i].treasuryDeposit > 0 &&
//                 block.timestamp >=
//                 userDeposits[_userAddress][i].firstDepositTime +
//                     FULL_TERM_LOCK_PERIOD
//             ) {
//                 eligibleIndices[index] = i;
//                 eligibleUsers[index] = userDeposits[_userAddress][i];
//                 index++;
//             }
//         }

//         return (eligibleIndices, eligibleUsers);
//     }

//     function deposit_admin(
//         address[] memory users,
//         uint256[] memory daiAmounts // Amounts in smallest units
//     ) external onlyOwnerOrDepositingAddress {
//         require(users.length == daiAmounts.length, "Length mismatch");

//         uint256 totalAmount = calculateTotalDeposit(users, daiAmounts);
//         uint256 daiAmountToSwap = totalAmount;

//         bool success = IERC20(assets[0]).transferFrom(
//             msg.sender,
//             address(this),
//             totalAmount
//         );
//         require(success, "Transfer to treasury failed");

//         //swapping and splitting wiill be done here
//         deposit(daiAmountToSwap);

//         // Loop through each user to update their deposit records
//         uint256 lengthh = users.length;
//         for (uint256 i = 0; i < lengthh; i++) {
//             User memory newUserDeposit = User({
//                 treasuryDeposit: daiAmounts[i],
//                 firstDepositTime: block.timestamp
//             });

//             // Push the new deposit entry into the userDeposits array
//             userDeposits[users[i]].push(newUserDeposit);

//             // Update the overall treasury balance
//             treasuryBalances[users[i]] += daiAmounts[i];
//             // updateTopTreasuryHolders(users[i]);

//         }

//         // Update total treasury points
//         totalTreasuryPoints += totalAmount;
//         emit DepositBatch(lengthh, totalAmount);
//     }

//     function withdraw(uint256[] memory indices) external nonReentrant {
//         uint256 totalAmount;

//         uint256 userDepositCount = userDeposits[msg.sender].length;
//         require(userDepositCount > 0, "No deposits found for the user");

//         // Calculate total amount eligible for withdrawal
//         uint256 cnt = indices.length;
//         for (uint256 i = 0; i < cnt; i++) {
//             require(indices[i] < userDepositCount, "Invalid index");
//             User storage userDeposit = userDeposits[msg.sender][indices[i]];
//             require(
//                 block.timestamp >=
//                     userDeposit.firstDepositTime + FULL_TERM_LOCK_PERIOD,
//                 "Deposit is not eligible for withdrawal"
//             );

//             totalAmount += userDeposit.treasuryDeposit; //in 18 decimals
//             userDeposit.treasuryDeposit = 0;
//             userDeposit.firstDepositTime = 0; // Set deposit to 0 to prevent double withdrawal
//         }
//         require(totalAmount > 0, "No valid deposits to withdraw");

//         // Calculate total user deposit assets in USD after a year
//         uint256 totalAmountInUsd;
//         uint256 len = assets.length;
//         for (uint256 i = 0; i < len; i++) {
//             uint256 treasuryBal = IERC20(assets[i]).balanceOf(address(this));
//             uint256 userShare = (treasuryBal * totalAmount) /
//                 totalTreasuryPoints; //in asset decimals
//             uint256 assetPriceInUsd;

//             if (assets[i] == WETH) {
//                 // Special case for WETH
//                 uint256 wethPriceInDai = getWethToDaiAmount(
//                     userShare,
//                     AggregatorV3Interface(DaiToEthPriceFeed)
//                 );
//                 assetPriceInUsd = fetchAssetPriceInUsd(0, wethPriceInDai);
//             } else {
//                 // Fetch asset price in USD
//                 assetPriceInUsd = fetchAssetPriceInUsd(i, userShare);
//             }
//             totalAmountInUsd += assetPriceInUsd;
//             uint256 assetPriceindai = (assetPriceInUsd * 10 ** 18) / 10 ** 8;
//             uint256 slipageamount = (assetPriceindai * maxslippage) / 100;
//             uint256 minamountout = assetPriceindai - slipageamount;

//             if (assets[i] == assets[0]) {
//                 IERC20(assets[0]).transfer(mainWallet, userShare);
//             } else {
//                 emit swaplog(assets[i], assets[0], userShare);
//                 uint256 usershareInDai = swap(
//                     assets[i],
//                     assets[0],
//                     userShare,
//                     poolFeeTier[i - 1],
//                     minamountout
//                 );
//                 IERC20(assets[0]).transfer(mainWallet, usershareInDai);
//             }
//             // q should transfer only usershare or userShareInDai
//         }

//         uint256 totalamount2 = totalAmount;
//         uint256 totalDepositInUsd = fetchAssetPriceInUsd(0, totalamount2);

//         // // Determine fee percentage
//         uint256 feePercentage = totalAmountInUsd > (totalDepositInUsd * 2)
//             ? 20
//             : 10;
//         uint256 totalAmountInDaiSwap = getUsdToDaiAmount(
//             totalAmountInUsd,
//             AggregatorV3Interface(priceFeed[0])
//         );

//         uint256 feeAmount;
//         uint256 amountAfterFee;
//         uint256 daiAmountToMint;
//         if (totalamount2 < totalAmountInDaiSwap) {
//             feeAmount = (totalAmountInDaiSwap * feePercentage) / 100;

//             amountAfterFee = totalAmountInDaiSwap - feeAmount;

//             daiAmountToMint =
//                 (amountAfterFee * DEED_EMISSION_RATE * 10 ** 8) /
//                 (10 ** 18);
//         } else {
//             feeAmount = (totalamount2 * feePercentage) / 100;

//             amountAfterFee = totalamount2 - feeAmount;

//             daiAmountToMint =
//                 (amountAfterFee * DEED_EMISSION_RATE * 10 ** 8) /
//                 (10 ** 18);
//         }

//         IDeedToken(deedToken).mintForTreasury(msg.sender, daiAmountToMint);

//         totalTreasuryPoints -= totalAmount;
//         // Update treasury points for user
//         treasuryBalances[msg.sender] -= totalAmount;

//         // // Remove withdrawn deposits from userDeposits array
//         removeUserDeposits(msg.sender, indices);
//         emit Withdraw(msg.sender, totalAmount, daiAmountToMint);
//     }

//     function removeUserDeposits(
//         address user,
//         uint256[] memory indices
//     ) internal {
//         require(indices.length > 0, "No indices provided for removal");

//         // Sort the indices in ascending order to avoid shifting issues
//         sortAscending(indices);

//         uint256 originalLength = userDeposits[user].length;
//         bool[] memory skip = new bool[](originalLength); // Skip list to mark removal

//         // Mark the elements that need to be removed by setting skip flags
//         for (uint256 i = 0; i < indices.length; i++) {
//             uint256 index = indices[i];
//             require(index < originalLength, "Index out of bounds");

//             // Mark the index for removal
//             skip[index] = true;
//         }

//         // Count how many elements will remain after removal
//         uint256 remainingCount;
//         for (uint256 i = 0; i < originalLength; i++) {
//             if (!skip[i]) {
//                 remainingCount++;
//             }
//         }

//         // Create a new array to store remaining elements
//         //// uint256[] memory newDeposits = new uint256[](remainingCount);
//         User[] memory newDeposits = new User[](remainingCount);
//         uint256 j;
//         for (uint256 i = 0; i < originalLength; i++) {
//             if (!skip[i]) {
//                 newDeposits[j] = userDeposits[user][i];
//                 j++;
//             }
//         }

//         // Replace the original array with the new one
//         userDeposits[user] = newDeposits;
//     }

//     // Helper function to sort indices in ascending order (for marking purposes)
//     function sortAscending(uint256[] memory data) internal pure {
//         uint256 n = data.length;
//         for (uint256 i = 0; i < n; i++) {
//             for (uint256 j = i + 1; j < n; j++) {
//                 if (data[i] > data[j]) {
//                     // Swap values
//                     (data[i], data[j]) = (data[j], data[i]);
//                 }
//             }
//         }
//     }

//     // during treasury migration, admin need to set old treasury data to new treasury state
//     // two functions for migration
//     // setUserNFTLockData => sets user data when their NFTs were locked in treasury
//     function setUserNFTLockData(
//         address user,
//         uint256 timestamp,
//         address nftContract,
//         uint256 tokenId
//     ) external onlyOwner {
//         lockTimestamps[user][nftContract][tokenId] = timestamp;
//         lockedNFTs[user][nftContract].push(tokenId);
//         contractlockedNFTs[address(this)][nftContract].push(tokenId);
//         emit NFTLocked(user, nftContract, tokenId);
//     }

//     // setUserDepositData => to set user's treasury balance paid in DAI previously
//     function setUserDepositData(
//         address[] memory users,
//         uint256[] memory daiAmounts
//     ) external onlyOwner {
//         require(users.length == daiAmounts.length, "Length mismatch");

//         uint256 totalAmount = calculateTotalDeposit(users, daiAmounts);
//         uint256 lengthh = users.length;
//         for (uint256 i = 0; i < lengthh; i++) {
//             User memory newUserDeposit = User({
//                 treasuryDeposit: daiAmounts[i],
//                 firstDepositTime: block.timestamp
//             });

//             // Push the new deposit entry into the userDeposits array
//             userDeposits[users[i]].push(newUserDeposit);

//             // Update the overall treasury balance
//             treasuryBalances[users[i]] += daiAmounts[i];
//         }

//         // Update total treasury points
//         totalTreasuryPoints += totalAmount;
//         emit DepositBatch(lengthh, totalAmount);
//     }

//     function setDeedEmissionRate(uint256 _deedEmissionRate) external onlyOwner {
//         DEED_EMISSION_RATE = _deedEmissionRate;
//     }

//     function calculateTotalDeposit(
//         address[] memory users,
//         uint256[] memory daiAmounts
//     ) internal pure returns (uint256 totalAmount) {
//         uint256 _totalAmount = 0;
//         uint256 n = daiAmounts.length;
//         for (uint256 i = 0; i < n; i++) {
//             require(daiAmounts[i] > 0, "Zero Amount");
//             require(users[i] != address(0), "Invalid User");

//             _totalAmount += daiAmounts[i];
//         }
//         return _totalAmount;
//     }

//     // Set allocation ratios
//     function setAllocationRatios(
//         uint8[] memory _allocationRatios
//     ) public onlyOwner {
//         calculateSumOfRatios(_allocationRatios);
//         assetAllocationRatio = _allocationRatios;
//     }

//     // Check to ensure sum of ratios equal 100
//     function calculateSumOfRatios(uint8[] memory _ratios) public pure {
//         // require(_ratios.length == 5, "Need ratios for 5 assets");
//         uint8 sum = 0;
//         uint n = _ratios.length;
//         for (uint8 i = 0; i < n; i++) {
//             sum += _ratios[i];
//         }
//         require(sum == 100, "Ratios should equal 100");
//     }

//     // Admin approves the governance to spend funds
//     function approveGovernance() public onlyOwnerOrGovernance {
//         uint256 n = assets.length;
//         for (uint256 i = 0; i < n; i++) {
//             IERC20(assets[i]).approve(
//                 governance,
//                 IERC20(assets[i]).balanceOf(address(this))
//             );
//         }
//     }

//     // Admin revoke approval of old governance
//     function revokeGovernance() public onlyOwner {
//         uint256 n = assets.length;
//         for (uint256 i = 0; i < n; i++) {
//             IERC20(assets[i]).approve(governance, 0);
//         }
//     }

//     // Admin can update the governance address
//     function updateGovernance(address _newGovernance) external onlyOwner {
//         require(_newGovernance != address(0), "Zero Address");
//         // unapprove old governance for treasury funds

//         if (governance != address(0)) {
//             revokeGovernance();
//         }

//         address oldGovernance = governance;
//         governance = _newGovernance;

//         // approve new governance for treasury funds
//         approveGovernance();

//         emit GovernanceUpdated(oldGovernance, _newGovernance);
//     }

//     // update list of top10 treasury holders when new user treasuryBalance is updated
//     function updateTopTreasuryHolders(address user) public onlyOwner {
//         if (treasuryBalances[user] > 0) {
//             if (isTopTreasuryHolder[user]) {
//                 // Update existing top holder entry
//                 uint256 index = treasuryHolderIndex[user];
//                 topTreasuryHolders[index] = user;
//                 // sortTopHolders();
//             } else {
//                 // Add new top holder if there is space
//                 uint len = topTreasuryHolders.length;
//                 if (len < 10) {
//                     topTreasuryHolders.push(user);
//                     isTopTreasuryHolder[user] = true;
//                     treasuryHolderIndex[user] = topTreasuryHolders.length - 1;
//                 } else {
//                     // Replace the smallest holder if there are already 10 entries
//                     _replaceSmallestHolder(user);
//                 }
//             }
//             sortTopHolders();
//         } else {
//             // Remove from top holders if the balance is zero
//             if (isTopTreasuryHolder[user]) {
//                 uint256 index = treasuryHolderIndex[user];
//                 _removeTopHolder(user, index);
//             }
//         }
//     }

//     function _replaceSmallestHolder(address newUser) internal {
//         // Get the smallest holder and their balance
//         address smallestHolder = topTreasuryHolders[0];
//         uint256 smallestBalance = treasuryBalances[smallestHolder];
//         uint256 indexToReplace = 0;

//         // Loop through the top treasury holders to find the smallest balance
//         uint256 len = topTreasuryHolders.length;
//         for (uint256 i = 1; i < len; i++) {
//             address holder = topTreasuryHolders[i];
//             if (treasuryBalances[holder] < smallestBalance) {
//                 smallestHolder = holder;
//                 smallestBalance = treasuryBalances[holder];
//                 indexToReplace = i;
//             }
//         }

//         // Only replace if the newUser's balance is larger than the smallest holder's balance
//         uint256 newUserBalance = treasuryBalances[newUser];
//         if (newUserBalance > smallestBalance) {
//             _removeTopHolder(smallestHolder, indexToReplace);
//             topTreasuryHolders[indexToReplace] = newUser;
//             treasuryHolderIndex[newUser] = indexToReplace;
//             isTopTreasuryHolder[newUser] = true;
//         }
//     }

//     function _removeTopHolder(address user, uint256 index) internal {
//         require(isTopTreasuryHolder[user], "User not in top holders");

//         uint256 lastIndex = topTreasuryHolders.length - 1;
//         if (index < lastIndex) {
//             address lastHolder = topTreasuryHolders[lastIndex];
//             topTreasuryHolders[index] = lastHolder;
//             treasuryHolderIndex[lastHolder] = index;
//         }

//         topTreasuryHolders.pop();
//         isTopTreasuryHolder[user] = false;
//         delete treasuryHolderIndex[user];
//     }

//     function sortTopHolders() internal {
//         uint256 n = topTreasuryHolders.length;
//         if (n <= 1) {
//             return; // No need to sort if there is only one or no holder
//         }

//         // Bubble Sort Algorithm to sort topTreasuryHolders by their balances in descending order
//         for (uint256 i = 0; i < n - 1; i++) {
//             for (uint256 j = 0; j < n - i - 1; j++) {
//                 address holder1 = topTreasuryHolders[j];
//                 address holder2 = topTreasuryHolders[j + 1];

//                 // Compare balances of holder1 and holder2
//                 if (treasuryBalances[holder1] < treasuryBalances[holder2]) {
//                     // Swap the positions
//                     (topTreasuryHolders[j], topTreasuryHolders[j + 1]) = (
//                         topTreasuryHolders[j + 1],
//                         topTreasuryHolders[j]
//                     );

//                     // Update the treasuryHolderIndex mapping
//                     treasuryHolderIndex[holder1] = j + 1;
//                     treasuryHolderIndex[holder2] = j;
//                 }
//             }
//         }
//     }

//     function getTreasuryBalance(
//         address _user
//     ) public view returns (uint256 treasuryBal) {
//         return treasuryBalances[_user];
//     }

//     function getTopTreasuryHolders() public view returns (address[] memory) {
//         return topTreasuryHolders;
//     }

//     function fetchAssetPriceInUsd(
//         uint256 assetIndex,
//         uint256 assetAmount
//     ) public view returns (uint256) {
//         require(assetIndex < assets.length, "Invalid asset index");
//         AggregatorV3Interface pricefeed = AggregatorV3Interface(
//             priceFeed[assetIndex]
//         );
//         uint8 decimals = uint8(assetsdecimals[assetIndex]);
//         return getAmountInUsd(assetAmount, pricefeed, decimals);
//     }

//     function getUserDeposits() external view returns (User[] memory) {
//         return userDeposits[msg.sender];
//     }

//     function drainTreasury(address _wallet) external onlyOwner {
//         // Drain all ERC20 tokens to the admin wallet
//         uint256 n = assets.length;
//         for (uint256 i = 0; i < n; i++) {
//             IERC20 token = IERC20(assets[i]);
//             uint256 balance = token.balanceOf(address(this));
//             if (balance > 0) {
//                 token.transfer(_wallet, balance);
//             }
//         }
//         uint256 tokenBalance = IERC20(deedToken).balanceOf(address(this));
//         // bool success = IERC20(deedToken).transferFrom(address(this),_wallet, tokenBalance);
//         // require(success, "Token transfer failed");
//         IERC20(deedToken).transfer(_wallet, tokenBalance);

//         // // Transfer all NFTs
//         _transferAllNFTs(deedNFT);
//         _transferAllNFTs(founderNFT);
//         _transferAllNFTs(genesisNFT);

//         emit TreasuryIsDrained();
//     }

//     function _transferAllNFTs(address nftContract) internal {
//         IERC721 nft = IERC721(nftContract);
//         uint256 totalLocked = contractlockedNFTs[address(this)][nftContract]
//             .length;

//         for (uint256 i = 0; i < totalLocked; i++) {
//             uint256 tokenId = contractlockedNFTs[address(this)][nftContract][i];
//             nft.transferFrom(address(this), mainWallet, tokenId);
//         }

//         // Clear the locked NFTs list
//         // delete contractlockedNFTs[address(this)][nftContract];
//     }

//     // implement fn to set user locked NFTs

//     function setSwapRouter(address _router) public onlyOwner {
//         SWAP_ROUTER_02 = _router;
//     }

//     function approveAddress(address _token, uint _amount) public onlyOwner {
//         TransferHelper.safeApprove(_token, SWAP_ROUTER_02, _amount);
//     }

//     function changeAssetAllocations(address[] memory _assets, uint256[] memory _assetsdecimals, uint8[] memory _assetAllocationRatio, uint24[] memory _poolFeeTier, address[] memory _priceFeed) external onlyOwner {
//         assets = _assets;
//         assetsdecimals = _assetsdecimals;
//         assetAllocationRatio = _assetAllocationRatio;
//         poolFeeTier = _poolFeeTier;
//         priceFeed = _priceFeed;
//     }

//     function deposit(uint256 daiAmount) internal {
//         // Approve DAI for the swap router
//         TransferHelper.safeApprove(assets[0], SWAP_ROUTER_02, daiAmount);

//         // Calculate the amount of DAI to be swapped for each asset
//         uint256 n = assets.length;
//         for (uint256 i = 1; i < n; i++) {
//             uint256 amountIn = (daiAmount * assetAllocationRatio[i]) / 100;
//             // uint8 decimals = uint8(assetsdecimals[i];)
//             uint256 amountinusd = (amountIn * 10 ** 8) / (10 ** 18);
//             uint256 examountout = fetchUsdIntoAssetsPrice(i, amountinusd);
//             // uint256 slipage = 5;
//             uint256 slipageamount = (examountout * maxslippage) / 100;
//             uint256 minamountout = examountout - slipageamount;

//             require(minamountout > 0, "Slippage too high");

//             // Adjust for decimals of the asset
//             swapExactInputSingle(
//                 assets[0],
//                 assets[i],
//                 amountIn,
//                 poolFeeTier[i - 1],
//                 minamountout
//             );
//         }
//     }

//     function swapExactInputSingle(
//         address tokenIn,
//         address tokenOut,
//         uint256 amountIn,
//         uint24 feeTier,
//         uint256 minamountout
//     ) public returns (uint256 amountOut) {
//         IV3SwapRouter.ExactInputSingleParams memory params = IV3SwapRouter
//             .ExactInputSingleParams({
//                 tokenIn: tokenIn,
//                 tokenOut: tokenOut,
//                 fee: feeTier, // Assuming a 0.05% fee tier
//                 recipient: address(this), // You may want to send it to the treasury instead
//                 amountIn: amountIn,
//                 amountOutMinimum: minamountout, // Set to 0 for simplicity, but you can adjust for slippage
//                 sqrtPriceLimitX96: 0 // No price limit
//             });

//         IV3SwapRouter swapRouter02 = IV3SwapRouter(SWAP_ROUTER_02);
//         amountOut = swapRouter02.exactInputSingle(params);
//     }

//     function swapAndTransferToGovernance(
//         uint256 amount,
//         address receiver
//     ) external onlyGovernanace {
//         require(amount > 0, "amount should be greater than 0");
//         require(receiver != address(0), "should be valid address");
//         uint256 totalamountinDai;

//         uint256 n = assets.length;
//         for (uint256 i = 0; i < n; i++) {
//             //in asset decimals
//             uint256 usdInassetprice;
//             uint256 splitAmount = ((amount *
//                 10 ** 8 *
//                 (assetAllocationRatio[i])) / (100 * 10 ** 18));
//             //emit splitamount(splitAmount);

//             usdInassetprice = fetchUsdIntoAssetsPrice(i, splitAmount);
//             require(getAssetbalance(assets[i]) >= usdInassetprice);
//             uint256 assetPriceInUsd;
//             if (assets[i] == WETH) {
//                 // Special case for WETH
//                 uint256 wethPriceInDai = getWethToDaiAmount(
//                     usdInassetprice,
//                     AggregatorV3Interface(DaiToEthPriceFeed)
//                 );
//                 assetPriceInUsd = fetchAssetPriceInUsd(0, wethPriceInDai);
//             } else {
//                 // Fetch asset price in USD
//                 assetPriceInUsd = fetchAssetPriceInUsd(i, usdInassetprice);
//             }
//             //swap functionality
//             // Transfer user share to company wallet
//             uint256 assetPriceindai = (assetPriceInUsd * 10 ** 18) / 10 ** 8;
//             uint256 slipageamount = (assetPriceindai * maxslippage) / 100;
//             uint256 minamountout = assetPriceindai - slipageamount;
//             //emit splitamount(splitAmount);
//             // emit usdinassetprice(usdInassetprice);
//             // emit assetpriceind(assetPriceindai);
//             // emit slipageamt(slipageamount);
//             // emit minamt(minamountout);
//             // emit swaplog2(assets[i],assets[0],usdInassetprice);
//             if (assets[i] == assets[0]) {
//                 totalamountinDai += usdInassetprice;
//             } else {
//                 //emit swaplog2(assets[i],assets[0],usdInassetprice);
//                 uint256 usershareInDai = swap(
//                     assets[i],
//                     assets[0],
//                     usdInassetprice,
//                     poolFeeTier[i - 1],
//                     minamountout
//                 );
//                 totalamountinDai += usershareInDai;
//             }
//             // require(totalamountinDai <= totalTreasuryPoints,"treasury does not have enough balance");

//             //IERC20(assets[0]).transfer(receiver, totalamountinDai);
//         }
//         IERC20(assets[0]).transfer(payable(receiver), totalamountinDai);

//         emit fundsTransferred(receiver, totalamountinDai);
//     }

//     function fetchUsdIntoAssetsPrice(
//         uint256 assetIndex,
//         uint256 usdAmount
//     ) internal view returns (uint256) {
//         require(assetIndex < assets.length, "Invalid asset index");
//         AggregatorV3Interface pricefeed = AggregatorV3Interface(
//             priceFeed[assetIndex]
//         );
//         //uint8 decimals = uint8(assetsdecimals[assetIndex]);
//         uint256 assetAmount;

//         if (assets[assetIndex] == WETH) {
//             // Convert USD to DAI first, then DAI to WETH
//             uint256 usdToDaiAmount = getUsdToDaiAmount(
//                 usdAmount,
//                 AggregatorV3Interface(priceFeed[0])
//             ); // DAI/USD feed
//             uint256 daiToWethAmount = getDaitoWethAmount(
//                 usdToDaiAmount,
//                 pricefeed
//             ); // DAI/ETH feed
//             assetAmount = daiToWethAmount;
//         } else {
//             uint8 decimal = uint8(assetsdecimals[assetIndex]);
//             assetAmount = getusdAmountInassets(usdAmount, pricefeed, decimal);
//         }

//         return assetAmount;
//     }

//     function swap(
//         address tokenIn,
//         address tokenOut,
//         uint256 amountIn,
//         uint24 feeTier,
//         uint256 minamountout
//     ) public returns (uint256 amountOut) {
//         TransferHelper.safeApprove(tokenIn, SWAP_ROUTER_02, amountIn);
//         IV3SwapRouter.ExactInputSingleParams memory params = IV3SwapRouter
//             .ExactInputSingleParams({
//                 tokenIn: tokenIn,
//                 tokenOut: tokenOut,
//                 fee: feeTier, // Assuming a 0.05% fee tier
//                 recipient: address(this), // You may want to send it to the treasury instead
//                 amountIn: amountIn,
//                 amountOutMinimum: minamountout, // Set to 0 for simplicity, but you can adjust for slippage
//                 sqrtPriceLimitX96: 0 // No price limit
//             });

//         IV3SwapRouter swapRouter02 = IV3SwapRouter(SWAP_ROUTER_02);
//         amountOut = swapRouter02.exactInputSingle(params);
//     }

//     function getAssetbalance(address asset) public view returns (uint256) {
//         uint amount = IERC20(asset).balanceOf(address(this));
//         return amount;
//     }
//     function setmaxslippage(uint256 slippage) public onlyOwner {
//         maxslippage = slippage;
//     }
//     function onERC721Received(
//         address operator,
//         address from,
//         uint256 tokenId,
//         bytes calldata data
//     ) external pure override returns (bytes4) {
//         return this.onERC721Received.selector; // This ensures the contract accepts safe transfers
//     }

//     function setForceUnlock(bool _forceUnlock) external onlyOwner {
//         forceUnlock = _forceUnlock;
//     }

//     function updateDepositingAddress(address _newAddress) external onlyOwner {
//         depositingAddress = _newAddress;
//     }

//     function setLockPeriod(uint _lockupPeriod) external onlyOwner {
//         FULL_TERM_LOCK_PERIOD = _lockupPeriod;
//     }
// }
// //for eth priceffed dai/eth pricefeed