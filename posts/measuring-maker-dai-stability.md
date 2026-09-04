---
title: Measuring Maker-Dai stability
subtitle: A data-driven exploration into how the Maker-Dai stablecoin system handles a large CDP liquidation event
description: One anomalous bar in MKR transfer data led to CDP #614 — a forensic walk through how the Maker-Dai system absorbed a large liquidation event in March 2018.
date: 2018-03-28
tags: [ethereum, defi, stablecoins, on-chain data]
era: tokenanalyst
original_url: https://medium.com/tokenanalyst/measuring-maker-dai-stability-f74c23108128
original_name: the TokenAnalyst blog on Medium
---

![MKR on-chain token transfers, with an anomalous spike on 18 March 2018](/images/writing/measuring-maker-dai-stability/01-1-6b8xrjd0xj6s7hvognjpvw.png "Data via TokenAnalyst")

At first glance, what sticks out to you in the chart above?

Yes — that solitary purple bar on the right hand side, looming over it's peers, conspicuous as can be. That bar in particular represents the number of *on-chain* token transfers of the [MKR](https://coinmarketcap.com/currencies/maker/) token on 18/03/2018. What this bar is telling us is that on the 18th of March (a little over a week ago), something significant happened in the world of Maker.

Curious — we decided to dig a little deeper into the data to see what we could find.

## Why should anyone care?

First off, you may be wondering, why should one care about the MKR token, let alone it's on-chain transaction patterns?

MKR is a core component of the Dai *stablecoin* ecosystem.

The concept of a "stable" coin is used to describe any cryptocurrency that does not have price volatility relative to a fiat currency. The majority of the cryptocurrencies available today — even the largest such as Bitcoin and Ethereum — exhibit significant price volatility. A cryptocurrency with price stability — one that can be used in a variety of decentralized applications as a unit of account — is sorely needed to enable the growth and maturity of the decentralized economy.

Of the available stablecoin options, Dai and others like it offer one of the most interesting and promising avenues forward as they are **decentralized**. As opposed to a token like [Tether](https://tether.to/), where trust in the token is based on a centralized company holding in reserve the requisite amount of USD to back up the circulating Tether, the Dai stablecoin system is run completely on the blockchain — with its stability in the hands of carefully designed crypto-economic incentives and rigorous smart-contracts.

## Digging into the data

Let's come back to our original question at the beginning of this piece: what caused the number of on-chain transactions for the MKR token shoot up so dramatically on the 18th of March? Let's see some summary stats for the day before, the day of the 18th, and the day after (to provide some context):

![Summary statistics for MKR token transfers across three days](/images/writing/measuring-maker-dai-stability/02-1-lpfh76lnn1-wef2lgpg2qg.png "Token transfer refers to a token being transferred from one address to another")

One can notice that the number of token transfers spikes on 18/03/2018, while the mean transfer amount and the maximum amount transferred on a given transaction shows a huge increase on 19/03/2018.

We thought of two different hypotheses to explain these different on-chain transaction patterns:

1. One hypothesis for the 18/03/18 rise in the sheer number of MKR transfers is that there was an internal Dai-related phenomena that triggered smart contracts to increase the number of MKR transfers.
2. A possible explanation for the 19/03/18 spike in mean and max transfer amount is a few "whales" making big token transactions on-chain.

To explore further — we decided it might be useful to see the split of token transfers in terms of frequency of transfers into and out of specific addresses:

![Most frequent MKR recipient addresses on 17 March](/images/writing/measuring-maker-dai-stability/03-1-8ce1gez37ajtl5qs9a1cya.png)

![Most frequent MKR recipient addresses on 18 March](/images/writing/measuring-maker-dai-stability/04-1-zfnvmfu-mxeo11chayw91w.png)

![Most frequent MKR recipient addresses on 19 March](/images/writing/measuring-maker-dai-stability/05-1-eb6pkuuycwirshnldsj6tq.png)

The above three charts visualize the addresses most often listed as the recipient in MKR on-chain token transfers for the three dates mentioned (taking the days around 3/18 to see if any continuous patterns occur).

One aspect that stands out immediately is a more diversified distribution of addresses on 19/03/18. Diving deeper into each party that transacted — we can confirm our "whale" hypothesis (#2 above) — by discovering that the following non-contract addresses were responsible for the largest portion of token volume transferred on 19/03/18:

![The largest non-contract addresses by MKR volume transferred](/images/writing/measuring-maker-dai-stability/06-1-icui3v1fdvgdz6inq8pcw.png)

While it is impossible to know exactly who these addresses represent — our initial classification algorithms offer a heuristic as to what type of entity they could be representing.

This evidence gives us a plausible explanation for the 19/03/18 increase in mean and max transfer amount — large "whale" addresses, most probably owned by the token team members themselves, making large MKR transactions.

We still don't have an answer for the 18/03/18 spike in the number of on-chain transfers.

Since the 18/03/18 distribution of addresses is more concentrated, it is useful to look at which ones are most frequently sent to. The largest (in terms of frequency) is a helper 'bot' address (0x0016BD4cb70Bd98CA07A341DA66450b5d22A55aa) that interacts with the primary Maker smart-contracts. The second and third most frequent addresses on average were the smart-contracts themselves.

To be specific — these two Maker smart-contracts are interchangeably most often the recipients of MKR token transfers in all three days (shown with contract address and name):

- 0x14fbca95be7e99c15cc2996c6c9d841e54b79425 (MatchingMarket)
- 0x69076e44a9c70a67d5b79d95795aba299083c275 (GemPit)

The MatchingMarket contract provides liquidity to users wanting to trade in and out of MKR — especially from the decentralized exchange OasisDex. Meanwhile, the GemPit contract serves as the contract that effectively burns the MKR used to pay for stability fees.

Exploring the address distributions of the addresses most often listed as the sender in MKR on-chain token transfers shows a similar pattern to the charts above.

Since the largest frequency (and volume) of token transfers occurred among these specific Maker smart contracts, it makes sense to test hypothesis #1 and check the status of the Maker-Dai ecosystem itself to see if any internal phenomena are occurring.

## Mechanisms that keep Dai stable

It is useful to get a little bit of context on the Maker-Dai stablecoin system as it has a lot of moving parts. For the purposes of this piece, we will take a slightly simplistic view of the ecosystem in order to cover the major components that we will observe in action.

The Dai stablecoin system consists of two different tokens:

- **Dai**: The stable coin that is soft-pegged to the US Dollar
- **MKR**: A utility token used for payment of fees, recapitalization of resources, and governance of the Maker-Dai system

### Collateralized Debt Positions (CDPs)

The fundamental construct at the heart of the Maker-Dai system are special smart contracts called Collateralized Debt Positions (or CDP's for short).

CDPs receive ether in a pooled form (called PETH) from users and in exchange give the user Dai tokens.

![How a CDP issues Dai against pooled ether collateral](/images/writing/measuring-maker-dai-stability/07-1-fhc3f0hoep1pinuc5hqseg.png "Icons made by Freepik from Flaticon")

The CDP then stores this PETH as *collateral* for the Dai that has been issued. What this means is that the CDP essentially treats the Dai issued as a loan — creating a debt with the PETH given by the user taken as collateral, should the Dai not be returned. This PETH collateral is locked out of the user's access until the outstanding debt (the issued Dai) is paid back.

When the user wants to get their collateral back — they pay down the debt by sending back the borrowed Dai and also pay interest on their loan in the form of a 'stability fee'. This fee can only be paid in the MKR token.

![Paying down CDP debt and the stability fee in MKR](/images/writing/measuring-maker-dai-stability/08-1-lq0zxfazl2a-c7mylsrslw.png)

Why does there need to be this system of collateral and stability fees in order to maintain a stable coin? Well, in the situation above, the Dai that is issued is essentially tied to a multiple of the value of Ether that was put up as collateral for it.

To keep the Dai price stable *in relation to USD*, when the price of the collateral (USD value of ETH) decreases, there has to be a larger amount of collateral taken per Dai token issued and vice versa when the price of the underlying collateral decreases.

### Dealing with Dai price volatility

Dai has a concept known as 'Target Price'. It represents what the price of Dai "should" strive to reach at any given time and is used to calculate the amount of collateral needed per Dai issued for a CDP. Since Dai is pegged to USD at a 1:1 rate, the Target Price (in USD) starts at 1.

While the *target* price is set by the Maker system, the *market* price of Dai (what it is actually traded for) is decided by the market.

At 17:19 UTC on 18/03/18, the *market* price of DAI was driven to a local maxima of $1.11. Over the course of 18/03/18 we see it dramatically dip to $0.96 before stabilizing again near $1.00 on 19/03/18.

![Dai market price over 18-19 March 2018](/images/writing/measuring-maker-dai-stability/09-1-iwjrp5dgzvhst7pfyddphq.png "Source: Coinmarketcap")

We can assume that with this price spike, the market price of Dai went above the target price. According to the Maker-Dai whitepaper, when this situation occurs, Maker engages a mechanism known as the Target Rate Feedback Mechanism (edit: although this mechanism may have never been triggered in this case).

![The Target Rate Feedback Mechanism](/images/writing/measuring-maker-dai-stability/10-1-5n7isfxu4fjkjkwfmbairq.png)

This mechanism makes it less expensive to create Dai (fewer Ether needs to be given as collateral for one Dai). This incentivizes more Dai creation (increased supply), and disincentivizes users from holding Dai — leading to a dampening of the market price to match the target price.

Seeing as the price immediately dropped after reaching it's local maxima, we can assume that the Maker-specific arbitrage seeking bots — called '[Keepers](https://github.com/makerdao/arbitrage-keeper)' — promptly snapped into action to rebalance the Dai price.

Regardless, we still haven't found an adequate explanation for the tremendous increase in MKR token transfers on the 18th however.

We also don't know *why* the price of Dai suddenly rose on the 18th.

Let's have a look at circulating Dai supply levels:

![Circulating Dai supply dropping on 18 March](/images/writing/measuring-maker-dai-stability/11-1-ubjbvyyjrcjgcmtz17rha.png "Source: mkr.tools")

Herein we see a distinct pattern. From between 11:00–17:00 UTC on the 18th of March we see a reduction in DAI supply from approximately 21 million to 16 million!

During the same timeframe, we also see that the total locked up collateral (in CDPs in the form of WETH/PETH) in the Maker-Dai ecosystem declined dramatically:

![Locked WETH/PETH collateral declining over the same window](/images/writing/measuring-maker-dai-stability/12-1-vz7g8qele-lha0jg5hnhoa.png "Source: mkr.tools")

Digging deeper, we finally discover that one of the largest CDP's in the Maker-Dai ecosystem, CDP #614, was actually **liquidated** at 10:52:37 AM UTC — approximately the time when the dip for both Dai and WETH/PETH supply began in earnest.

What do we mean when we say that the CDP was liquidated?

### Liquidation

While the TFRM is designed to keep the Dai price stable, there remains the possibility of the incentive structures not working as expected — especially when the price of ETH keeps dipping and its value is worth less than the amount of Dai that it is supposed to be backing.

This is what happened to CDP #614.

> The Dai issued by the CDP became ***undercollateralized*** due to the ETH market price dipping and the user not paying back his/her "debt" by re-exchanging their Dai for their collateral.

In this situation, the Maker system triggers a liquidation of the CDP's collateral, automatically selling it off to the highest bidders for Dai as fast as possible to recapitalize and ensure that the Dai that it issued to the original user is fully collateralized.

![The liquidation flow for an undercollateralized CDP](/images/writing/measuring-maker-dai-stability/13-1-hlw1y3cteeyvacy83zxsuw.png)

## Domino effect

This liquidation event on the morning of 18th March appears to be the foundational event that then starts off the domino sequence of smart-contract actions that eventually lead to the number of MKR token transfers shooting up on that day.

- Dai that is received in the sale of the CDP's collateral in the liquidation event is burned and removed from the total supply. This explains the dip in the Dai supply and the rapid rise in Dai price.
- It appears that Dai in excess of the debt shortfall was paid in return for the collateral during this liquidation event. In accordance with the Maker-Dai system mechanics, this Dai was then used to buy up more PETH and burn it — explaining the dip in PETH supply.
- To coordinate the liquidity of PETH and Dai during this liquidation event, the liquidity providing contract for Dai appears to have called the helper address 0x0016BD4cb70Bd98CA07A341DA66450b5d22A55aa as identified in our pie charts above. This address then appears to repeatedly call the Maker "MatchingMarket" smart contract (0x14fbca95be7e99c15cc2996c6c9d841e54b79425) in order to use MKR tokens as a form of facilitating intra-system liquidity between Dai holders and the collateral that needed to be liquidated.

This utilization of the MKR token as a form of liquidity provision by the internal Maker smart contracts gives us an answer for the question that began our data dive — why there so many MKR token transfers on 18/03/18.

As a result of the higher MKR **token velocity** on that day, the MKR token price also appears to dip slightly during the exact timeframe that the liquidity event took place:

![MKR price dipping during the liquidation window](/images/writing/measuring-maker-dai-stability/14-1-7zexygnkpsshvzcyy0t8za.png "Source: Coinmarketcap")

The data points and observations above, combined with what we know about the Maker-Dai system leads us to some interesting higher level takeaways.

## High level takeaways

If we can take anything away from this data exploration — it is that the mechanisms in place to keep Dai stable and collateralized are in fact working.

Further inferences we can make from this analysis include:

- The **strength** of the Dai stablecoin system can heuristically be judged by the *speed* with which price stability is restored after a liquidation event or a market-to-target price adjustment. Dai stability, in this case, was restored within a few hours — which bodes as a good sign for the resilience of the system.
- A significant percentage of MKR holders are large "whale" addresses that could easily shift the price based on a few large token transfers.
- The utilization of the MKR token as a means for providing liquidity during a CDP liquidation event adds another element to consider when *valuing* the MKR token. This use case is in addition to MKR's use for paying stability fees (after which MKR is burned, reducing it's supply) as well as governance (key voting rights only offered to MKR holders).

*Note: This piece simplifies several aspects of the Maker-Dai stablecoin system. Refer to the [whitepaper](https://makerdao.com/whitepaper/DaiDec17WP.pdf) for in-depth details. The mechanics of how MKR is used will also change when multi-collateral Dai is introduced.*
