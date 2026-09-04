---
title: Under the hood of the world computer
description: Most blockchain analysis stops at transactions. A look at Ethereum through traces, sub-traces and decoded function calls — and what it takes to gather that data at scale.
date: 2019-02-06
tags: [ethereum, on-chain data, smart contracts]
era: tokenanalyst
original_url: https://medium.com/tokenanalyst/under-the-hood-of-the-world-computer-caf957fb8a4c
original_name: the TokenAnalyst blog on Medium
---

![Function calls made on the Ethereum blockchain on Jan 1st, 2019](/images/writing/under-the-hood-of-the-world-computer/01-1-qkp0af7goesgycdyqdqltw.jpg "Function calls made on the Ethereum blockchain on Jan 1st, 2019. Data collected via TokenAnalyst")

The image above isn't modern art. It's a visualization of real data from the Ethereum blockchain showing all the function calls invoked within smart contracts during the course of one day (Jan 1st, 2019). Each node represents an address and the colors of the edges connecting them represent different function calls. There were 575,372 function calls made that day with 1654 different functions being invoked across the blockchain. A large portion (32%) of these were transfer function calls to and from specific contracts (represented by the huge purple cluster in the middle and others in the periphery).

## Why does this matter?

When most people analyze and compare blockchain data, they think in terms of transactions. And you can't fault them for it. Bitcoin, the original blockchain, is a transaction-based ledger that tracks currency ownership.

Ethereum, on the other hand, doesn't just track currency ownership but instead aims to be a decentralized computing infrastructure that tracks the state transitions of a general purpose data store (any data expressible as a key-value pair). It uses a blockchain to synchronize and store the system's state changes, along with a cryptocurrency called ether to meter and control the costs of executing arbitrary programs.

> Ether, the native currency of the blockchain, is intended as a utility currency to pay for use of the 'world computer' that is Ethereum.

## The journey of an Ethereum transaction

For those not intimately familiar with the Ethereum ecosystem, it might be helpful to follow the path of a particularly interesting transaction as it interacts with this 'world computer'. We will simplify for explanatory purposes.

Take the scenario of Jack — a smart contract developer who sends an ETH transaction to a contract that he owns. Although he doesn't send any ether in this transaction, he sends along extra data in the transaction that tells the smart contract that he is interacting with to execute the distribute function in its code. He pays a significant amount of gas to account for the computational execution costs of running the function on the blockchain.

![Jack sends a transaction invoking the distribute function](/images/writing/under-the-hood-of-the-world-computer/02-1-kfk975ej-nq8vastuo-ptq.png)

This contract receives Jacks' instructions and executes the code that is specified for the distribute function. Turns out, this distribute function (with the '5' parameter passed in) instructs this first contract to call functions in 3 other related contracts to distribute their tokens to the top 5 holders (as recorded on each contract's internal storage).

![The first contract calls functions in three other contracts](/images/writing/under-the-hood-of-the-world-computer/03-1-6cz0b9uo8vttfm-y4mgc1w.png)

These 3 other contracts have to call (execute) an additional internal function (getTop5) to check for the top 5 token holders within their internal storage. After getting this list of 5 addresses each, the three contracts finally initiate token transfer functions to transfer tokens from their own balance of tokens to the specified addresses (some of which are other related contracts themselves).

![The three contracts transfer tokens to the top holders](/images/writing/under-the-hood-of-the-world-computer/04-1-wvlz278dw8s2vpk3ds0jiw.png)

While this is just an example scenario, one can begin to grasp the complexity inherent in such an ecosystem of contracts and the domino effect a single transaction can trigger — starting a series of contract-to-contract code executions and value transfers among addresses (as seen above).

## A blockchain for the machines

Although only external accounts (non-contract, 'normal' addresses) can initiate transactions, smart contracts can react to these transactions and the data contained within them, starting a potential chain effect.

> In fact, we see that out of all smart contract interactions (transactions, token transfers, and other function calls), contract-to-contract interactions outnumber account-to-contract interactions on Ethereum.

![Contract-to-contract interactions compared with account-to-contract interactions](/images/writing/under-the-hood-of-the-world-computer/05-1-dlrgyl5jtvt78ehzdz1fq.png "Data via TokenAnalyst")

Not only do smart contracts (and their programmatic interactions) make up a large (and growing) part of Ethereum blockchain activity today, they are also increasingly responsible for the creation of new smart contracts on-chain.

> This is essentially pieces of code **creating** other pieces of code on the blockchain.

When we look into smart contract creation over the history of Ethereum, we see that even as overall smart contract creation has gone up, the number of new contracts created by non-contract, 'externally-owned' accounts (or EOAs) is dwarfed by the number of contracts created by other smart contracts.

As you can see in the chart below, this number has especially started to spike during the start of this year — as more sophisticated [contract programming](https://openzeppelin.org/) and deployment patterns begin to gain adoption.

![Smart contracts created by EOAs versus by other contracts over time](/images/writing/under-the-hood-of-the-world-computer/06-1-5x0j-bm8qnlnu061ubsvza.jpg)

## Beyond just transactions

The core of the Ethereum 'world computer' today is the Ethereum Virtual Machine (EVM). This is essentially a CPU that all of the full nodes in the network run in order to process blocks and transactions. As seen above, a single Ethereum transaction can trigger a host of different computational steps and sub-interactions that need to be processed by the EVM.

It's important to note that what is often observed at the surface level while examining blockchain data is just the initial transaction. The subsequent activities triggered by this original transaction are somewhat hidden under the surface and are not revealed in most common queries for blocks and transactions.

While it's possible to piece together clues by looking at '[internal transactions](https://etherscan.io/txsInternal)' on a block explorer like etherscan, in order to get trustworthy and comprehensive access to the series of computations triggered by a transaction, one needs a full record of the *state* of the EVM upon the execution of every transaction. You can think of the state as essentially a snapshot in time capturing all the downstream effects of a transaction.

The most granular record of the state of the EVM at any moment in time consists of the series of EVM opcodes that were executed as a result of a transaction. These are machine instructions similar to assembly code for a traditional computer. For example — 0x01 for ADD (or addition) or 0x60 for PUSH1 (to push 1 byte onto the stack).

For our purposes however, we will look at the state from a slightly higher level of abstraction — through the lens of a construct known as a **trace** — as provided by the [Parity node implementation](https://wiki.parity.io/JSONRPC-trace-module). Broadly speaking, each trace represents an action that changed the state of the EVM in some way (typically as a reaction to a transaction). Parity provides us with three main types of traces:

- **Create trace**: Represents the creation of a smart contract and the transfer of ether to the newly created smart contract.
- **Suicide trace**: A smart contract's code can never be changed. However, the contract itself can be "deleted". A suicide trace represents the "deletion" of a smart contract, removing the code and the internal state and storage from the contract address — leaving a blank account that will not execute any code if transactions with function calls are sent to it.
- **Call trace**: Primarily represents the calling of smart contract functions and the transfer of ether from one account to another.

![Breakdown of Parity trace types](/images/writing/under-the-hood-of-the-world-computer/07-1-o3vzhma4cp8gt9jlrpi3pg.png)

In its entirety, the Ethereum blockchain has almost a *billion* traces. A subset of these traces represent function calls that constitute any ERC20 token transfer, or any CryptoKitty transaction for example.

Each of these traces can have any number of *sub-*traces, which are essentially further calls to other contracts (or itself) made as a result of the original trace — essentially a representation of the domino effect covered above.

> As of this writing, there are 4,749,778 traces that have more than 10 sub-traces.

This brings up an noteworthy point: One can't calculate the balance of an Ethereum account by just summing up the ether transactions to and from an address because ether can change hands during any of the sub-traces and function calls that result as a reaction to the transaction itself.

Tracking the flow of activities via traces and sub-traces is very informative, but we can go one level higher in abstraction, to better comprehend what is really going on.

Solidity is the higher level imperative programming language that is used to program a majority of the smart contracts on Ethereum today. Using a standard maintained by the Solidity project known as the [Application Binary Interface](https://solidity.readthedocs.io/en/develop/abi-spec.html) (or ABI), we can decode the raw hex data that we get from a trace into the specific *function call* (written in Solidity) that it represents. Each contract has its own ABI, and by decoding the function calls for the contract via its ABI, we are able to meticulously track each and every minute 'action' that the contract performs during its lifetime.

Below is a look at a subset of all parsed function calls, arranged by number of times each function was called over the course of history. You will notice certain functions — such as the *transfer* and *transferFrom* are some of the most often executed by a large majority. This is due to the fact that these functions are a part of the [ERC20 standard](https://theethereum.wiki/w/index.php/ERC20_Token_Standard), which a majority of the tokens built on top of Ethereum follow.

![Parsed function calls ordered by frequency of appearance on-chain](/images/writing/under-the-hood-of-the-world-computer/08-1-xizs7r5rgtj8m5kqskdnbq.jpg "Parsed function calls ordered by frequency of appearance on-chain. Data via TokenAnalyst")

During the course of executing these functions, developers can choose to emit Events. Events are high level Solidity constructs that reside in a transaction's log and signal that certain actions have been executed by a smart contract. One can think of it as a program's 'output'. Although not every contract has Events, they are often used by light clients and dApp developers to "watch" for specific actions occurring on the smart contract and react to them on a front-end interface. Below is a similar chart showing a subset of parsed events, arranged by the number of times each type of event ever appeared. Again we see the prevalence of the Transfer event, which essentially serves as a signalling mechanism to indicate that an ERC20 token transfer has occurred.

![Parsed events ordered by frequency of appearance on-chain](/images/writing/under-the-hood-of-the-world-computer/09-1-ytkh4ulmhzjvwyjhhmntjw.jpg "Parsed events ordered by frequency of appearance on-chain. Data via TokenAnalyst")

## Getting (and trusting) this data, at scale, is no joke

As a team, we have had to deal with scale from day 1 when approaching Ethereum data. While we can definitively say that the size of an Ethereum '[full node](https://www.theblockcrypto.com/2019/01/23/ethereum-essentials-node-nuances/)' is [not](http://didtheethereumblockchainreach1tbyet.5chdn.co/) over 1TB, we also experienced first-hand, the bumps and dips in the terrain while gathering this data directly from the blockchain.

While the average user can make do with checking [Etherscan](https://etherscan.io/) to see whether his/her transaction went through, at TokenAnalyst we strive to build a fault-tolerant, enterprise-grade infrastructure to efficiently gather and parse data across blockchains. Part of this effort involved constructing an Ethereum data pipeline to get full access to every granular data point from *every* historical state that has ever occurred on the blockchain. This allows us to have both the entire historical dataset as well as an ongoing low-latency data stream at the tip of the chain to alert for interesting occurrences.

In order to trust the quality of our data we ran Geth and Parity nodes, through the process discovering some [weird quirks](https://medium.com/tokenanalyst/weird-quirks-we-found-in-ethereum-nodes-d5dcbad0c86) with [several](https://www.parity.io/security-alert-parity-ethereum-03-02/) [aspects](https://medium.com/tokenanalyst/towards-production-grade-open-source-ethereum-nodes-6ef2e9458fb4) of the client implementations. We quickly discovered that, with granular trace-level data, speed of retrieval from the node via RPC calls quickly became a bottleneck, especially as we ran into the data-stuffed range of blocks when Ethereum experienced a DDOS attack (from block 2.3m — block 2.8m).

![One hour waiting times per block at one point of the data gathering process](/images/writing/under-the-hood-of-the-world-computer/10-1-ay1xs7v6zrispoczuiwuug.png "One hour waiting times per block at one point of the data gathering process")

As we were parsing the data from this range, we started to experience one hour+ waiting times to retrieve and process a single block. This necessitated us essentially [killing the problem with hardware](https://twitter.com/sidshekhar24/status/1075463374308294657) — at one point running 95 full sync, archive parity nodes in order to parallely distribute the data gathering and processing across multiple instances to speed it up.

Yes, these are the type of nodes that **are** 1.9+TB in size and require some pretty hefty hardware that we had to optimize to run efficiently (a story for another day).

## Takeaways

When analyzing on-chain data, especially data from Ethereum, looking at transactions alone is not nearly enough. As a team tasked with noticing significant events on-chain, we have become far more cognizant of the large ecosystem of contract to contract value transfer and interaction occurring and the huge downstream effects these interactions have on several aspects of the ecosystem.

With the ongoing community work on Ethereum 2.0, and [discussions](https://docs.google.com/document/d/1PS0k9MaKPdPwEw3Uh9rq7USjq7LcSpT6ICQUXRij4YE/edit?usp=drivesdk) between the implementers and the researchers in full swing, we must keep in mind that in the not too distant future, the primary users of Ethereum as a blockchain may not neccesarily even be *human beings*, but instead lively (and perhaps even sentient) pieces of code. As seen above, we are already seeing signs of this transition taking place today on-chain.

Today, every DEX, DAO, dApp, and DeFi project has an assortment of different smart contracts, each with their own functions and events, all semantically representing different things for each project and ecosystem. This is part of the challenge. Although great standards for smart contract programming exist, the task of interpreting each of these different function calls in relation to the contract it belongs to is still one that requires a human touch.

Now, does everyone need to run archive nodes and look into granular trace data to gather insights on what's occurring on-chain? Of course not.

My hope from this piece is simply that you, the reader, got a little bit more knowledgeable about the fascinating layers of complexity underneath mere transactions on Ethereum and some insight into what the future may hold.
