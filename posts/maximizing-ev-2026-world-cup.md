---
title: "104 matches. 48 teams. 39 days. How to maximize EV from the 2026 World Cup."
description: The 2026 World Cup is a closed system — 48 teams, 104 matches, ~9,500 correlated Polymarket markets and a hard resolution date. What the Champions League data says about how to trade it.
date: 2026-06-12
tags: [prediction markets, polymarket, football, gina]
era: gina
original_url: https://x.com/sidshekhar24/status/2065496287823220997
original_name: X
---

![Graph of connected World Cup markets](/images/writing/maximizing-ev-2026-world-cup/01-header.jpg)

Last night we had a banger of an opening for the 2026 World Cup - with Mexico scoring first against South Africa. Immediately, the game market for Mexico vs South Africa on Polymarket jumped over 20%+.

That's expected - a goal is the most information-dense event in football.

What's more interesting is what else moved:

- "Mexico to win Group A" repriced by 10%+ (a few minutes later)
- Mexico's odds to win the whole tournament went from 1.5% to 1.9%. A 27% relative move in a tournament-long market, from one goal in a group game.

![The Mexico vs South Africa match market repricing on Polymarket](/images/writing/maximizing-ev-2026-world-cup/02-mexico-market.png)

![The "Mexico to win Group A" market repricing](/images/writing/maximizing-ev-2026-world-cup/03-group-a.jpg)

![Mexico's outright tournament odds moving from 1.5% to 1.9%](/images/writing/maximizing-ev-2026-world-cup/04-outright.png)

One goal, three repricings, at three different time horizons. And this was about the simplest cascade possible.

I want to lay out why I think this structure makes the World Cup one of the more interesting trading setups of the year, and what the data from a comparable tournament suggests about how to play it.

## The setup

Most markets are open-ended. Crypto doesn't close. Equities don't resolve. The World Cup has properties you almost never get all at once:

- It lasts one month, with a fixed start and end.
- The environment is fully specified in advance: 104 matches, known teams, known schedule, known format.
- Every market has a defined resolution time.

On Polymarket right now there are roughly 9,500 markets tied to the World Cup - match winners, group winners, outright winner, top scorers, exact scores, stage of elimination, and a very long tail of markets beyond that.

So you have a large but *finite and enumerable* universe of instruments, all driven by the same underlying state (what happens on the pitch), all expiring within 39 days. That's unusual. It's closer to a well-defined game than most things people trade.

## The markets are correlated, and the correlations are legible

The 9,500 markets aren't independent. They form a graph. A match result propagates: match → group standing → bracket path → outright odds. The Mexico example was three hops.

Harder cases are more interesting: when a group's final matchday flips who finishes first, every team on that side of the bracket reprices, including teams that didn't play that day.

In principle none of this is hidden. The tournament structure is public; the conditional paths are computable.

In practice though, no human can hold a 9,500-node graph in their head while prices are moving, and generally we've seen that cross-market repricing tends to be slow and uneven. Match markets adjust fast while the downstream group and outright markets lag, by minutes or sometimes longer.

This is the part that's now genuinely tractable using AI - tracing the cascade and computing related repricing of odds is the kind of thing a model does well and is tough for a human to do.

![The graph of related World Cup markets](/images/writing/maximizing-ev-2026-world-cup/05-market-graph.jpg)

We built a World Cup interface at [**askgina.ai/worldcup**](https://askgina.ai/worldcup) that lays out this universe of markets along w/ what's related. Scan + search across all relevant markets, or pick a market and then ask gina directly for related markets impacted by it.

## What a comparable tournament actually did

The 2025–26 Champions League is a good recent reference: a fixed field of ~40 teams, one outright market per team, a defined window. We tracked every team's outright odds from August through the final on Polymarket.

![Table of every Champions League team's outright odds across the 2025-26 season](/images/writing/maximizing-ev-2026-world-cup/06-ucl-table.png)

Some observations from that data:

- **11 of the 39** listed teams hit a peak multiple gain of at least +29% or more at some point (and several 3x to 4x returns). This is for the Winner market. Roughly a quarter of the field gave you a meaningful exit above any reasonable entry.
- The league phase - not the knockouts - produced the largest repricings. Arsenal +105%, Tottenham +109%, Sporting +111%, Bayern +153%. These weren't lottery tickets. They were good teams the market was slow to mark up as form became observable.
- The largest single-round move: Atletico Madrid went from 3.65% at the start of the quarter-finals to 11.55% by the start of the semis. One round resulting in a 3.16x.

The other thing the table shows, which matters just as much: most of those peaks went to zero. Bodø/Glimt peaked at +338% and resolved worthless.

The repricings were real, but they were only profitable for whoever actually exited into them. Worth keeping in mind for later.

## Why this World Cup specifically

This is the first 48-team World Cup. Compared to Qatar 2022 which had 32 teams, we have 50% more teams and 40 more matches.

| | 2022 | 2026 | Change |
| --- | --- | --- | --- |
| Teams | 32 | 48 | +50% |
| Total matches | 64 | 104 | +62.5% |
| Knockout matches | 16 | 32 | +100% |

The structural change that matters most is the new Round of 32: *sixteen* additional single-elimination matches that didn't exist before.

A knockout match is roughly a high-variance coin flip with a skewed payoff - favorites win most of them, but each one carries some probability of an exit on a stray goal or a penalty shootout that swung the other way.

Doubling the number of knockout matches doesn't change any individual match's upset probability, but it materially raises the probability that *some* favorites exit early. And each early exit of a "favorite" is a large repricing event across every market downstream of their bracket position.

So relative to any previous World Cup: same list of usual favorites, similar prices, meaningfully more variance. The favorites' odds don't seem to have gotten cheaper to compensate.

## Maximizing EV

Given all that, the approach that seems interesting to me:

**Skip the favorites.** Not because they won't win - one of them may well win - but because their prices already assume a smooth path through the most knockout rounds in World Cup history. You're paying full price for an asset whose variance just went up.

**Hold a basket of teams below the favorites with realistic deep-run paths.** The UCL data is the argument: a quarter of the field repriced 29%+ at some point, and the big multiples came from the Arsenal/Sporting tier, not the consensus favorite. The bet isn't that any one of them wins. It's that the market re-marks several of them upward as the tournament reveals information, and you only need a few to pay for the basket. Getting into positions before the group stage finishes is a good strat here.

**Utilize AI to scan for related markets.** If you're watching a game out with friends and see a goal happen, you're one [Gina](https://www.askgina.ai/) prompt away from pulling up all related markets in a neat table for you to see which ones haven't repriced yet and taking advantage.

**Decide your exits in advance, then automate them.** We can see this from the Champions League data. The peaks for each team existed; but it's hard to sell them then and there, because in the moment a position that's up 200% during a good run feels like it's going higher. Two mechanical triggers cover most of it:

- Date-based: trim after specific matchdays, when the result is priced in;
- Threshold-based: sell a portion automatically if a position crosses a level you chose when you were thinking clearly.

![Setting an automated exit trigger in Gina](/images/writing/maximizing-ev-2026-world-cup/07-automation.png)

We built this into [Gina](https://www.askgina.ai/) - "sell half my Mexico position if it crosses 4%" works by just typing a sentence, but the principle holds with whatever tooling you use. The edge in tournament markets seems to come less from picking winners and more from systematically harvesting repricings that other holders ride round-trip.

## The month ahead

For one month there's a closed system: a known set of teams, a known schedule, ~9,500 connected markets, and a hard resolution date. The information arrives on a public schedule and the repricings are structural, not narrative. Setups this clean don't come around often.

The interface we built to take advantage of this is at [**askgina.ai/worldcup**](https://askgina.ai/worldcup)

You can scan all relevant world cup markets in one glance + related relationships that are searchable. For any market, you can ask the agent to parse related relationships + how to act on it.

![The Ask Gina World Cup interface](/images/writing/maximizing-ev-2026-world-cup/08-worldcup-ui.jpg)
