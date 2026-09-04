---
title: Dissecting Blocks
subtitle: A look into the fascinating world of on-chain data
description: The case for why examining who is transacting on-chain — not just how much — is the key to fundamentally understanding and valuing cryptoassets.
date: 2018-03-08
tags: [ethereum, on-chain data, valuation]
era: tokenanalyst
original_url: https://medium.com/tokenanalyst/dissecting-blocks-bf218cdff39d
original_name: the TokenAnalyst blog on Medium
---

![The ubiquitous cryptocurrency price chart](/images/writing/dissecting-blocks/01-1-rtdseler-gwmemhjsbyp5a.png "Source: TradingView")

The ubiquitous price chart. Over the past year, variations of the image above have become a mainstay on the screens of millions of rabid cryptocurrency investors. Price is the guiding beacon that the majority of investors in crypto live and die by today.

When wild upswings or downswings in price occur, as happens quite frequently, it is often simply chalked up to market sentiment or periodic swings in demand.

In this piece, we will make the case for why examining *who* is transacting on-chain is the key to fundamentally understanding and valuing cryptoassets. We will focus on the Ethereum blockchain and go over some of the nuances involved in interpreting on-chain data.

## On-chain data?

First off, what do we mean by **on-chain** data? To put it succinctly: all data that is natively stored on the blockchain. This data includes (but is not limited to):

- Details of every block (timestamp, gas price, miner, block size etc.)
- Details of every transaction (the 'from' and 'to' addresses, the amount transferred in the transaction etc.)
- Smart contract invocation and usage

### Why is this information interesting?

Of late, many thinkers in the burgeoning field of *cryptoeconomics* have proposed theoretical frameworks to fundamentally value cryptoassets — whether it is the application of the equation of exchange [(MV = PQ)](https://medium.com/@cburniske/cryptoasset-valuations-ac83479ffca7) to cryptoassets by Chris Burniske, an [alternative interpretation](https://medium.com/blockchannel/on-value-velocity-and-monetary-theory-a-new-approach-to-cryptoasset-valuations-32c9b22e3b6f) of token velocity by Alex Evans and the [levers that influence it](https://medium.com/newtown-partners/velocity-of-tokens-26b313303b77) by James Kilroe, or the popular [Network Value to Transactions](https://coinmetrics.io/nvt/) (NVT) ratio championed by the excellent [coinmetrics](https://coinmetrics.io/) team and by [Woobull](http://charts.woobull.com/bitcoin-nvt-ratio/).

> Many of these different valuation methodologies use on-chain transaction volume as a proxy for the network utility of a given cryptoasset.

In other words, the on-chain transaction volume is being used to judge whether a given cryptoasset is actually being used.

> We believe we can go one level deeper.

Instead of just crudely measuring the overall usage of a cryptoasset network, we think we can use on-chain transaction data to figure out *who* are the entities that are actually using a given cryptoasset.

This allows us to examine and learn from their on-chain transaction patterns — leading to deeper and more nuanced insights to fundamentally value the cryptoasset in question.

## Classifying addresses

Wait a minute… isn't information about "who" is transacting hidden on the blockchain? Isn't that the whole point of [public-key](https://en.wikipedia.org/wiki/Public-key_cryptography) cryptography?

Yes and yes.

> We found a little quirk though.

When one steps back and examines every Ethereum address (unique user account) and their respective on-chain transactions in aggregate — one begins to see distinct clusters of addresses that exhibit remarkably similar transaction patterns and on-chain behavior.

Our intuition tells us that each of these clusters of addresses generally belongs to certain types of entities.

![Classifying addresses into entity types](/images/writing/dissecting-blocks/02-1-dog0fgm5pyrlpuomwkfixg.png "Classifying addresses (icons made by Eucalyp from flaticon.com)")

Based on the patterns we saw, we made some inferences of specific entities that could be represented by these clusterings:

- **Exchange-related addresses**: Centralized cryptocurrency exchanges that generally have thousands of "hot wallets" that are used interchangeably to manage exchange operations and customer transactions.
- **"Bot" and "burner" addresses**: Addresses that either display an "automated" transaction pattern — such as repetitive, similar transactions to and from the same recipient — or are clearly one-time-use "burner" addresses that only ever have one incoming and outgoing transaction.
- **Human-operated or "other" addresses**: A catch-all bucket of addresses that generally display more irregular transaction patterns and show more variance in on-chain transactional relationships — hinting at an actual human being behind the address in question.

## What does this enable?

Typically, the performance of traditional internet companies is measured by web analytics and user demographics that serve as benchmarks for how well a website is doing compared to its peers.

When it comes to the world of crypto, aggregating addresses and classifying them into distinct entity types enables similarly nuanced analysis into the makeup of a given cryptoasset's ecosystem.

For example, we can get a better picture of **network strength** by analyzing whether a given token is actually being utilized for its intended use-case by *humans* or simply being speculated on by a large [botnet](https://blog.cyber.fund/huge-ethereum-mixer-6cf98680ee6c).

![Breakdown of address types transacting with a token](/images/writing/dissecting-blocks/03-1-yeqpfebw71t6etqyaf6-wq.jpg)

This could prove especially useful for "apples-to-apples" comparisons between decentralized applications (dApps) within the same "category". For example, one could make a comparison between prediction market tokens [Gnosis](https://gnosis.pm/) and [Augur](http://www.augur.net/), or on a lighter note, between 'digital collectible' games such as [CryptoKitties](https://www.cryptokitties.co/) and [CryptoFighters](https://cryptofighters.io/).

When we drill down into address transaction patterns and are able to loosely (or specifically) identify distinct entities like the token team, exchanges, or "whales" (individual entities transacting with large sums of money on-chain), we are also able to get a view of how centralized a token's ownership is.

![Token ownership split between team, whales and other holders](/images/writing/dissecting-blocks/04-1-ct9aqikfdhy7zo7g-whifg.png "Data via TokenAnalyst")

You can see above that the token team and "whale" addresses hold significant amounts of the token in question. This could potentially mean significant price volatility if a few key players decided to liquidate their position.

## Nuanced interpretation required

While diving deeper into on-chain data to better understand cryptoasset usage is surely an exciting challenge, it is useful to caveat a few of the points made above to illustrate the nuances involved with accurately interpreting and analyzing this data:

- Currently, it is unfeasible to know *for certain* whether a given address is a specific type of entity or not. The best we can do right now is arrive at a reasonable heuristic. However, even general estimates of usership can lead to useful insights that allow you better evaluate and compare cryptoassets.
- On-chain transaction volumes and counts can sometimes be [misleading](https://coinmetrics.io/difficulty-estimating-chain-transaction-volume/) when taken at face value as any individual entity (a human, an exchange, etc) can own multiple addresses. Thus a lot of on-chain activity may simply be the shuffling of tokens within a given individual's own set of addresses.
- A lot of exchange trading volume is often not reflected on-chain. Many exchanges, for example, internally debit or credit client wallets without actually invoking a transaction on the blockchain.
- We believe on-chain data is a main dish that's part of a bigger data buffet that one should consume when fundamentally evaluating cryptoassets. Off-chain data on protocol differences ([PoW](https://en.wikipedia.org/wiki/Proof-of-work_system) or [PoS](https://en.wikipedia.org/wiki/Proof-of-stake)), token supply structures, [token types](https://medium.com/startup-grind/understanding-the-difference-between-coins-utility-tokens-and-tokenized-securities-a6522655fb91), and [token category](https://thecontrol.co/digital-collectibles-a-new-category-of-tokens-emerging-fb991c1dff6a) should be taken into account to provide context to on-chain data on a given cryptoasset.

## About us

In an industry filled with scammy ICOs and rampant pump and dump schemes, Jai and I came together to work on **TokenAnalyst** with the goal of bringing more transparency into what's happening on the blockchain itself.

We are actively working on parsing and analyzing every block on Ethereum (with plans to add more blockchains).

In future posts, we will walk through our on-chain data analysis process and do deep-dives into specific transactional patterns and insights we uncover.
