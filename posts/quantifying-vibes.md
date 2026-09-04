---
title: "Quantifying Vibes"
subtitle: A data-driven look into the gestation of a social network
description: A data-driven look at what makes Farcaster engaging — question askers, reply guys, long-form lovers, tippers and builders, measured across a week of open cast data.
date: 2024-02-27
tags: [data, farcaster, social]
era: gina
original_url: https://paragraph.com/@castaway/quantifying-vibes
original_name: Castaway
---

![A week's worth of reactions on Farcaster](/images/writing/quantifying-vibes/01-10fb2e01c856d9b3a08a98bc367b4b3e.jpg "A week's worth of reactions on Farcaster")

Crypto has always been a community sport. Communities are what define meaning in this industry - whether it is the meme of Bitcoin being seen as a hard asset or an NFT project being feted as the next big IP to capture minds across the globe after Pokemon and Barbie.

The communities that form around these assets rally around shared schelling points of interest, creating vibrant, albeit transient, ecosystems. As fascinating as these formations are, several often face the inevitable entropy - shifts in interest, dwindling participation, and a loss of vision, eventually fading into echoes of a once-lively "discord/telegram chat I used to know."

The fleeting nature of attention within these groups underscores a significant challenge: sustaining long-term engagement.

## How does Farcaster keep people engaged?

What's been interesting with Farcaster, which now stands at 200K+ users, is that even after the hockey stick growth this month off the back of [frame frenzy](https://blog.spindl.xyz/p/why-farcaster-frames-are-important), casts per day and engagement levels have not tailed off dramatically. While crypto is often a succession of financially motivated apps - where users strive after the next 10x or airdrop, Farcaster has had a different 'vibe'.

I dove into the [open source cast data](https://neynar.com/) to quantify what and who drives this vibe. A few of my favorite farcaster "personas" (with some fun stats along with it) below:

### Question Askers

Almost 38% of people who have ever casted, have asked a question on the network. Not just any question but often consistently thoughtful questions. Users are fundamentally interested in what others have to say and invite dialogue. In terms of sheer numbers: there nearly 400K casts with questions in them - around 6% of all casts!

![A selection of questions from the /philosophy channel](/images/writing/quantifying-vibes/02-efd428f883386414df710871b4b740d4.png "A selection of delectable questions from /philosophy channel")

### Reply Guys

In the true spirit of the [/replyguys](https://warpcast.com/~/channel/replyguys), a whopping 64% of all casts on Farcaster are replies. When grouping users into how many times they reply, a large majority seem to fall under the multiple-reply segment (as shown in the chart below) with some [extreme replyoors](https://warpcast.com/sidshekhar/0x210f44df) racking up several thousand replies (after just a few weeks of activity).

![Distribution of users by number of replies sent](/images/writing/quantifying-vibes/03-d788f8562266eff88a1f2f62d8ee555e.png)

### Long-form lovers

We know that casters are [avid book readers](https://warpcast.com/~/channel/books). Turns out the network as a whole also appreciates longer form writing in casts too. Looking at the data reveals that cast length significantly correlates with user engagement: longer casts generally receive more likes and recasts. Despite a general character limit of ~320 characters per cast, the data shows us that depth and detail resonate more with the Farcaster audience.

![Cast length plotted against likes and recasts](/images/writing/quantifying-vibes/04-fa243ab46f4bc3ffe98e1df104dd5d4a.png)

### Tippers

Last week a friend and I decided to hook up to a real-time stream of casts from a Farcaster Hub. We didn't have to have this up and running for too long to realize that much of our screen was filled with $DEGEN.

![Live feed from a gRPC subscription to a Farcaster Hub](/images/writing/quantifying-vibes/05-3e01bd9c83c1bb06195162ea8bc44943.mp4 "Live feed from a gRPC subscription to a Farcaster Hub")

The most used word on Farcaster by far, $DEGEN and it's dominant use case as a form of tipping currency (where folks can reply to a cast with a number and $DEGEN to tip the person who made the cast) is a massive presence on the network. While projects like [Steemit](https://steemit.com/steemit/@steemitblog/steemit-update-february-26th-2024-steemit-engagement-challenge-season-16-week-1) did have features to pay nominal amounts for posts, tipping for social media content isn't something that has been explored at scale and achieved success.

Some high level stats around this phenomenon:

Over 37K users have tipped $DEGEN at some point in time and nearly 16% of all casts have had "$DEGEN" in them.

![$DEGEN tipping activity over time](/images/writing/quantifying-vibes/06-d7cfd19f9c3d101a725684561335877a.png)

### Builders

Lastly, let's address the gorilla in the room. The launch of Frames and the frame-ification of NFT mints, apps, games, and more has unlocked a ton of creative and fun experiences on the feed both for users and developers. Not only have casts with Frames exploded this year (see below), but Frame casts received nearly 22% of all the likes given out on Farcaster in 2024.

![Growth in casts containing Frames through 2024](/images/writing/quantifying-vibes/07-735b9da52bcf5cdbfc4842e47aeaa144.png "Source: frames.spindl.xyz")

## Some takeaways

a) At this stage of its growth, what's kept Farcaster engaging is a core culture of people giving generously - their questions, answers, likes, tips, and ideas. Deeper engagement > shallow engagement.

b) The fact that the underlying protocol and its social graph are open and analyzable is awesome.

I'll likely be diving into more of this data down the line - including the evolving landscape of channels and how niche communities start to coalesce and grow. Feel free to comment here or shoot me a DM on [Warpcast](https://warpcast.com/sidshekhar) with ideas on what to explore next in this fascinating dataset.
