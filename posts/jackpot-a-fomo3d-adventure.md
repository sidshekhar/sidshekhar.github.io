---
title: "Jackpot — A Fomo3D adventure"
subtitle: Examining the data behind the game's first big winner
description: On-chain forensics on the address that won 10,469 ETH from Fomo3D — was it a bot, a coordinated scheme, or just very well prepared?
date: 2018-08-23
tags: [ethereum, on-chain data, forensics]
era: tokenanalyst
original_url: https://medium.com/tokenanalyst/jackpot-a-fomo3d-adventure-793f6e94dc75
original_name: the TokenAnalyst blog on Medium
---

![Fomo3D](/images/writing/jackpot-a-fomo3d-adventure/01-0-vq-syf6om2nquhoe.png)

On August 22nd, at 7:04:12 AM UTC, some person or set of people, somewhere in the world, received a sudden windfall of just under $3 million (or 10,469.66 ETH to be specific) by winning the jackpot of a game that is perhaps one of the most intriguing sociological experiments in Ethereum's history.

Questions abound as to the methodology utilized to arrive at the hotly contested victory and to the legitimacy of the winner. Did he/she "cheat" the system in some way? Is the PoWH3D team somehow connected to the winner? Were the blocks artificially stuffed with extraneous transactions in order to ensure no one else had a chance of winning? Was there a bot used to control the flow of the game?

We decided to take a slightly deeper look into the on-chain data to help make more sense of the event.

## What is Fomo3D?

Described by its creators as a parody of the crypto/ICO industry, Fomo3D is an intricate lottery game run by smart contracts on Ethereum that has grown to become one of the most popular decentralized applications in the industry today.

The primary game mechanics for the 'long' running version of the game are as follows:

- To play, one buys a 'key' from the Fomo3D smart contract in exchange for ETH, which goes into a central pot.
- There exists a countdown clock which is constantly ticking down but is increased every time a new key is bought.
- Each time a new key is bought, all existing holders of keys get a portion of the new key sale's funds, proportionate to the number of keys they hold.
- The round ends when the clock ticks to zero. The last person who bought a key before the clock winds down is the winner of the round.
- Every key buyer can also choose a 'team', which is effectively a choice as to how the central pot will be split (amongst the winner and other sectors of the Fomo3D ecosystem), should they be the last person to buy a key.
- All the ETH earned from the game is stored in a user's 'vault', from where withdrawals can be made at any point.

Have a look at the detailed rules [here](https://fomo3d.hostedwiki.co/pages/Fomo3D%20Explained#pot-distribution).

## Examining the jackpot winner

It is a significant event that someone actually won the round in Fomo3D because firstly, there were several thousand users (with vast war chests) competing for the chance to be the last key in.

Adding to this, the pyramid-scheme-like nature of the game had many convinced that there would always be another key buyer (seeing as keys are relatively inexpensive) that would be drawn to the game as it had such a tantalizing possibility of victory.

Examining the data for the winning address for this round of Fomo3D, we will refer to the winner as *JackpotWinner*. It appears like *JackpotWinner* has only been truly active for a little over a week, receiving his/her initial ETH funds in chunks from Shapeshift transactions. It's important to realize here that we cannot know for sure whether there is one or multiple human beings behind *JackpotWinner* or if it's an automated bot entity whose aim is to systematically win the game.

![The transfer of the spoils between the Fomo3D smart contract and the winner](/images/writing/jackpot-a-fomo3d-adventure/02-1-hna5jhg2sebogflndkxcsq.png "The transfer of the spoils between the Fomo3D smart contract and the winner. Source: Etherscan")

First we examine the possibility that *JackpotWinner* somehow managed to bombard the blockchain with transactions such that the miners had no choice but to include his/her transactions above others. The payout of the winnings happened in block number 6191962. Looking closer at the block, it appears to have been mined by an established, operating, mining pool and contains many seemingly independent addresses that also have had interactions with Fomo3D at a very similar time as *JackpotWinner*. The gas pricing is also well within normal bounds. Additionally, on a surface-level network analysis, there appear to be no material connection between *JackpotWinner* and the mining entity.

Over the course of 5 hours on August 22nd however, we notice *JackpotWinner* making a series of calls to the Fomo3D smart contract — 46 to be exact.

We see *JackpotWinner* successively hitting the FOMO3D:Long contract, calling the `buyXid(uint256 _affCode, uint256 _team)` function — to effectively buy a key with each transaction during this time period of intense competition with other players.

> He/she only directly paid around 2.76 ETH (1.96 ETH in transaction fees and 0.8 ETH to purchase keys) to win a whopping 10,469.66 ETH.

Taking this into consideration, another, more insidious possibility to explore through the data is to see whether *JackpotWinner* is in any way related to a bigger entity (such as the [PoWH3D](https://twitter.com/PoWH3D) team themselves). The first place to look is the distribution of addresses that *JackpotWinner* transacts with and sends ETH to.

![Jackpot Winner ETH transaction recipients](/images/writing/jackpot-a-fomo3d-adventure/03-1-bcc39wpz82eqemg4sx7dfw.png "Jackpot Winner ETH transaction recipients")

What is striking about this distribution is the there exist 46.6% of transactions where the address 0x18e1B664C6a2E88b93C1b71F61Cbf76a726B7801 is the recipient of funds from the *JackpotWinner*. Looking into this address, we see that it is in fact a contract that was created by *JackpotWinner* on Aug 18th, 2018 at 10:49:31 PM UTC. The vast majority of transactions to this address are merely calls to the Fomo3D:Long contract (or to related auxiliary contracts for the game) that are effectively routed through this 'routing' address (see below).

![Transactions routed through the winner's helper contract](/images/writing/jackpot-a-fomo3d-adventure/04-1-dlexlbhba5b5s7xlreu8tg.png "Source: Etherscan")

The other addresses that make up a large percentage of the recipient base for *JackpotWinner* are also either Fomo3D contracts or auxiliary supporting addresses. This fact indicates that *JackpotWinner* is either a component of an automated botnet that systematically interacts with the Fomo3D contract ecosystem and/or a part of an elaborate scheme by the [PoWH3D](https://twitter.com/PoWH3D) team themselves to funnel money through their own creation.

Another data point that serves as a clue is the Fomo3D leaderboard, which states the number of keys owned by *JackpotWinner* and the teams he/she has chosen. It is intriguing that the 'bear' team is one of the choices as it is the option that is meant to be chosen by those that want [0% of a round's winnings to go to P3D token holders](https://fomo3d.hostedwiki.co/pages/Fomo3D%20Explained#pot-distribution) (PoWH3D's own token).

![The Fomo3D leaderboard showing the winner's keys and team choices](/images/writing/jackpot-a-fomo3d-adventure/05-1-lz0hhngiuxp4cjxwf88e4q.png "Source: fomo3d.eu")

If *JackpotWinner* was in fact connected to PoWH3D, it would not make rational sense for the organization to devalue the contribution of their own P3D token (albeit it being outside the scope of the game) merely for the sake of leading us all on a wild goose chase.

## Takeaways

- While a closer examination of the winning address and the corresponding transactional relationships does shed some light into what could be going on, to truly uncover any substantial pattern-recognition in the game, we need to go through more rounds and cycles of winnings.
- *JackpotWinner*, with its systematic interactions with the Fomo3D infrastructure **and** `0x2c389A86A686AC7Ee98Ac2606802b5bB4a2186C1`, which is the recipient of a [large chunk](https://etherscan.io/address/0x2c389A86A686AC7Ee98Ac2606802b5bB4a2186C1) of *JackpotWinner's* funds, appear to have been expressly set up in the past week and a half to prepare for this moment in time, when they could claim the winnings for round 1.
- As always, it is easier to rationalize a logical sequence of steps after the fact but much harder to predict the same before the occurrence itself (especially in such an early, developing game ecosystem).
