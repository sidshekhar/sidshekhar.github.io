---
title: "From conversation to execution: lessons learned evaluating 6+ LLMs for Gina"
description: We evaluated six-plus LLMs on real user tasks in Gina — market data lookups, chart generation and on-chain swaps — measuring speed, tool-calling accuracy, transaction success and UX.
date: 2025-02-14
tags: [ai, llms, tool-calling, gina]
era: gina
original_url: https://paragraph.com/@askgina/from-conversation-to-execution-lessons-learned-evaluating-6-llms-for-gina
original_name: the Ask Gina blog
---

## Context

Every day, there's a [shiny](https://www.bbc.co.uk/news/articles/c5yv5976z9po) new large language model (LLM) claiming to outperform the rest. For users, choosing the right model for a specific use case can feel like flying blind in a storm of hype around the latest new thing. The state of things is such that even the model drop down list in the base ChatGPT app now has *7* different models to choose from.

![The ChatGPT model picker showing seven different models](/images/writing/evaluating-6-llms-for-gina/01-603034ec8a9446fe02403455794df671.png)

The stakes are even higher when you move beyond mere text generation and want your AI to perform useful tasks - especially on the blockchain. At **[Ask Gina](https://www.askgina.ai/)**, we're building a new kind of wallet interface that has a personal AI agent (Gina) built in. Our users can simply ask, *"What's hot today?"* or *"Swap 10% of my USDC into AERO on Base."* and in seconds, Gina fetches the right information and handles all aspects of the on-chain transaction.

But going from an LLM to a crypto-savvy agent embedded in a wallet (with the ability to call web APIs, fetch market data, and execute transactions) isn't trivial. Through the process of building Gina, we tested multiple models, integrated them with various crypto tools, measured performance, and documented our findings. Below, we'll share some findings from real-world data - and a few key takeaways we've learned about picking a model that can do more than just chat.

## Tool-calling and why it matters

First a bit of context on "tool-calling". When large language models are restricted to just generating text, they're limited in how "agentic" they can be. For an agent to perform *actions* - like pulling real-time data, booking tickets, or facilitating payments - it needs to leverage **tool calling**. Think of tools as extensions of the LLM's capabilities, allowing it to interface with APIs or blockchain smart contracts.

A great metaphor we've heard in the wild is to think of tools like giving an extra pair of "hands" for an agent to do more things. The more hands we have the more tasks we can handle with them.

Not [all models](https://api-docs.deepseek.com/guides/function_calling) have native support for tool calling (for ex: the Deepseek API doesn't yet), and even among those that do, performance can vary wildly. This is why it's crucial to test both:

1. how well the model recognizes the right tool to call for the job at hand, and
2. the quality and accuracy of the output or transaction it produces.

## Our setup: Gina in action

We ran trials for each model on Gina and their performance on tasks that utilize tool-calling like:

- Fetching market data (using a market data API call),
- Generating charts (using a charting API call), and
- Executing on-chain swaps (using RPCs to execute transaction calldata).

### Data collection

We built a testing suite that records:

- The **task** (e.g., "What's hot?", "Chart me PEPE", "Swap 1 USDC into AERO"),
- The **model used** (e.g., GPT 4o, Claude 3.5 Sonnet, Gemini 2.0 Flash Beta, o3-mini),
- The **time taken** to produce a final output,
- And a rating of **accuracy/relevance.** This rating is an interpretation of sometimes subjective results for a given task but it is a preliminary indication of where we're at currently.

Below are the results from an average of multiple trials we ran this past week:

![Results table comparing models on speed, accuracy and transaction success](/images/writing/evaluating-6-llms-for-gina/02-52da0aaf7ce02db5e3e111bb0f0f9b38.png)

## Observations & takeaways

Our testing revealed insights across multiple categories — *speed, accuracy, transaction success, tool compatibility, and user experience*.

Below are some takeaways we had from a subjective lens:

### 1. Speed vs. completeness

**Gemini 2.0 Flash** often provides the fastest "time to first token (letter or word shown)" and renders visual results quickly, a clear advantage for impatient users. However, due to minimal text exposition, there's sometimes less clarity about *how* it chose to solve a task.

**Claude 3.5 Sonnet** can be slower overall but is also more comprehensive - it often makes multiple tool calls, fetches additional context, and tends toward robust explanations. This is an example of *tool ordering and handover* done well, but at the cost of added latency.

### 2. Accuracy & relevance

Wrapped tokens remain a recurring confusion for certain models, highlighting how tool optimization with correct prompt scaffolding and correct token metadata selection matter. If a model doesn't hand over the right query to fetch market data for (e.g., mixing up WETH vs. ETH), it can produce inaccurate results for metrics like TVL, volume etc.

**GPT 4o** tends to be especially thorough in checking user balances before execution — boosting its average success rate on transaction execution in general. This thoroughness reflects better **tool ordering** (e.g., *first check portfolio, then proceed*) and is part of why it excels at more complicated transactions.

### 3. Transaction success consistency

For simple swaps, nearly all models that properly invoked our "execute transaction" tool succeeded — except **Gemini 2.0 Flash**, which stumbled when multiple tool calls were needed. This suggests potential gaps in *tool handover* (switching from quote fetching to swap execution).

**Claude 3.5 Sonnet** occasionally saw transactions revert for multi-step operations (like a swap + bridging). Meanwhile, **GPT 4o** and **o3-mini** properly sequenced their calls and completed these tasks, demonstrating stronger *tool ordering & handover* capabilities and higher average success rates for complex operations.

### 4. Chaining tools & observability

Many of the tasks in our tests require chaining multiple calls (e.g., figuring out the right asset/token contract, retrieving market data for the right pair, generating a chart, then placing a swap). If the model doesn't optimize or observe tool outputs properly — for instance, if it overlooks an error or fails to confirm available balances — it can lead to timeouts or failed transactions.

Observability is key: a model that clearly displays or logs each call's outcome (like "Balance check: success") is easier to debug and improve. Reasoning models like **o3-mini** and good old **Claude 3.5 Sonnet** continue to lead in this regard.

### 5. User experience: streaming text & readability

As mentioned above, across models, the time to first token can vary. However, after the first bit of text is rendered, some models stream text slowly, which can frustrate users waiting for an immediate response (**GPT 4o**). Others might chunk or batch the output, leading to a faster perceived experience (**o3-mini**).

Formatting remains a major differentiator. Models that produce concise bullet points, short summaries, or relevant headings score higher on **readability** — especially on mobile. This not only improves **observability** for end-users but can also highlight where errors might have occurred in the tool chain.

## What does this mean in practice

If you're building an AI agent that needs to do more than chat — like interacting with APIs, pulling real-time data, or executing blockchain transactions — choosing the right model can make or break your product. Our experience building Gina to satisfy crypto-specific tasks highlights a few key lessons:

- **It's not always about the "best" LLM in isolation** — it's about the one that plays nicest with your tool stack. Different models for different tools.
- **Speed, reliability, and the ability to handle multi-step tasks** are just as critical as raw language quality.
- **Real-world tests** (like bridging assets or fetching legitimate market data) expose nuance that simple text [benchmarks](https://lmarena.ai/?leaderboard) often miss.

![Gina executing a multi-step on-chain task](/images/writing/evaluating-6-llms-for-gina/03-827ce5c84ea73a1f2f6d18dee5068e50.mp4)

A practical challenge to consider is simply the cost of running comprehensive model evaluations in production. Running a thorough test suite across multiple models for each code deployment can quickly become expensive, especially when testing complex multi-step operations. This is still an ongoing field of discovery of what is best practice across the AI field in general.

We hope our data and learnings help you make more informed decisions when integrating LLMs into your workflows. As new models emerge, we'll keep testing and sharing updates. Feel free to shoot us a message — you can DM [@askgina.eth](https://warpcast.com/askgina.eth) or one of the Gina squad: [@sidshekhar](https://warpcast.com/sidshekhar), [@ericjuta](https://warpcast.com/ericjuta) on Farcaster or X.

And of course, as a friendly reminder, Gina is now live for early beta — sign up at [askgina.ai](https://www.askgina.ai/) for early trial access.
