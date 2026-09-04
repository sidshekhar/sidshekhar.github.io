---
title: Lessons from 18 months of building agents that handle real money (at scale)
description: What $5M+ in volume and 100K+ transactions taught us about building AI agents that execute with real capital — code for math, prompts for judgment, plans before code, and memory as plain files.
date: 2026-03-30
tags: [ai, agents, gina, crypto]
era: gina
original_url: https://x.com/sidshekhar24/status/2038651145841684811
original_name: X
---

We launched Ask Gina in early 2024 as one of the first AI agents that could execute transactions with real capital.

Since then: $5M+ in volume and 100K+ transactions, across Polymarket, Hyperliquid perps, and 12+ blockchains. We've seen hundreds of strategies, edge cases, and prompt variations - all with real money on the line.

Experiencing this first hand has changed how we think about using AI in finance: from how to structure prompts, how to handle memory, and how to represent complex strategy logic within a robust harness that works consistently.

Here's what 18 months of building agents that handle real money taught us.

## Financial automations: prompts vs code

In mid 2025, we launched "Recipes". The concept was simple: a natural language prompt, scheduled to execute autonomously at any time interval or through a trigger:

- Every day at 9am.
- Every 5 minutes.
- Every time BTC drops 10%.

This enables everything from very simple atomic tasks like "get me a morning report" to advanced multi-step trading strategies.

For a surprisingly long time, this was enough. If you can break a strategy into steps simple enough that a sharp 15-year-old could read each one and execute it reliably, you can build robust multi-prompt workflows. Especially when each step stays within what a language model handles well: clear input, clear output, zero ambiguity.

The cracks appeared when we started running strategies that required exact math.

Position sizing to basis points. Multi-condition filters with deterministic sequencing. A language model predicts the next token - fundamentally, it's just a really good *guess*.

When you're scaling into a Hyperliquid perp position with leverage, you don't want to be doing really good guesses on exact math.

## Code-based execution for complex mathematical logic

In early 2026, something clicked. We've seen coding agents like Claude Code and Codex see a step change in quality improvement. And the broader evolution in agentic harnesses - has made it obvious: what frontier models are genuinely exceptional at is generating reliable, testable *code*.

So instead of asking a LLM model to *do* the math for a financial automation, we instead changed our approach to ask it to *write code* that does the math. That code is then run as the automation logic.

We built `/create` around this. It's an opinionated harness that enables you to build your own agent with an automation. Where each automation is a sequence of discrete, executable steps. For example, you can have within one workflow:

- **Step 1: Scanner** — find markets, assets, or conditions matching your criteria
- **Step 2: Filter** — apply logic, rank by signal, remove noise
- **Step 3: Executor** — take the action
- **Step 4: Monitor** — track outcome, log results, adjust

Each step is isolated. Each step has an associated piece of code which runs. This allows each step to be tested independently before it touches live capital.

Because it's code, it's deterministic — it does exactly what you told it, every time, whether the venue is Polymarket, Hyperliquid, or a spot swap on Base.

![An automation broken into discrete scanner, filter, executor and monitor steps](/images/writing/18-months-building-agents-with-real-money/01-create-steps.png)

## If you use prompts, make each one atomic then combine together

Prompts aren't going away. For strategies that need genuine interpretation, reading a news event, assessing sentiment, deciding whether a situation is anomalous, language models are the right tool.

The mistake is packing too much into one prompt.

One prompt should do one job. Runnable in isolation, independently testable, and able to be understood by the smallest LLM. If your prompt handles five different things and one fails, you just due to the nature of LLM reasoning hops, you have no idea why one aspect of it broke, how often it breaks, or under what conditions.

Split every prompt-based strategy into atomic units. One input, one output, one purpose. Built out separately and then chain together as one overarching "strategy".

Same principle as good software engineering. Functions, not monoliths.

![Atomic prompts chained together into a single strategy](/images/writing/18-months-building-agents-with-real-money/02-atomic-prompts.png)

## Plan before code (always)

The vast majority of humans don't read code in 2026. At best you may get a skim through, but more likely than not, code that is generated is being delegated to an AI to review.

When you're building financial automations that rely on code as execution logic, it's incredibly important to have a "plan" that actually *gets read by humans* before implementing any code.

Before writing a single line of code, Gina generates a plan: goal, scope, steps, risks, open questions - all in plain English. The user reads it and approves it before anything gets built.

This does two things. It catches bad assumptions before they are baked into working code that is hard to unwind. And it gives the person running the strategy a moment to actually understand what is about to execute with their capital.

One example: one strategy plan called for "buy if funding rate is negative." Reading the plan, the user caught that it didn't specify *how* negative - meaning it would trigger on -0.001% the same as -2%. Two seconds of reading saved countless bad entries and wasted AI credits.

The plan step has caught more problems than any other guardrail we have built. Bad logic is obvious in plain bullet point English. Much harder when its just pure code.

![A generated plan showing goal, scope, steps, risks and open questions in plain English](/images/writing/18-months-building-agents-with-real-money/03-plan-step.jpg)

## Memory is just files. Stop overcomplicating it.

Agents don't have persistent memory by default. Every session starts fresh. Most teams try to solve this with vector databases, RAG pipelines, or elaborate context injection schemes.

Here's what actually works: treat your agent like a computer user. Because that's what it is. Agents can read and write files natively. That's your memory layer. Simple, durable, no context window dependency.

The workflow we've seen work consistently for researching unfamiliar markets or evaluating strategies:

1. Search for the relevant market (HYPE, BTC 15 minute market, NBA games etc)
2. Ask your agent to record key details to a file. Liquidity, volatility, historical price action, notable events.
3. Come back a few days later.
4. Ask it to open the file and analyze what it logged. What's the volatility profile? Where's the liquidity? Does a pattern emerge? Can we create a repeatable strategy to trade this?

You've done a lightweight backtest without a data pipeline or a quant team. Just an agent, a filesystem, and time.

Every Gina user gets their own personal agent filesystem with 250 MB of free file storage.

The strategies that improve over time are the ones that record key details in a file and keep learning from them.

![An agent's personal filesystem holding market research notes](/images/writing/18-months-building-agents-with-real-money/04-agent-filesystem.png)

## The model is table stakes. The harness around it is the edge.

Every team in this space has access to the same frontier models. Same API. Same capabilities. Best in class models are table stakes.

The edge is the infrastructure built around it: the data it can access, the structure you give its execution, the memory it accumulates over time, and the guardrails that keep it from doing something expensive when conditions shift.

We learned every one of these lessons by having real money on the line with Gina moving several hundred thousand dollars a day in value.

The playbook is simple but hard-won: use code for math, prompts for judgment. Keep each unit atomic. Plan before you build. Give your agent a filesystem and let memory compound.

None of this requires our platform. These are patterns that work across different sectors of agent-led work regardless of what you're building with.

That said - `/create` is where we've encoded all of it. If you want a harness that just works out of the box without the scar tissue: [askgina.ai/create](https://askgina.ai/create)

![The /create harness in Ask Gina](/images/writing/18-months-building-agents-with-real-money/05-create-harness.jpg)
