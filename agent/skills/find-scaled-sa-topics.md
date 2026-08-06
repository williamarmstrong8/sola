---
description: Use when someone asks what the team should write, demo, or record based on recent customer calls, e.g. "@sola find topics from this week's calls", "what should we make content about?", "scan the last two weeks for article ideas". Sweeps org-wide calls, clusters recurring blockers and misconceptions into broad topics, discusses the shortlist in Slack, and on approval writes a Notion topic brief per approved topic that the demo/slides/graphics agent picks up next.
---

# Find scaled SA content topics from customer calls

The scaled SA team learns the same thing over and over on calls: a customer wants to build
something, believes it is not possible or not supported, and stalls. It usually **is**
possible today with a setup nobody has written down. Each of those is one article, one
short video, or one webinar that unblocks every future customer with the same belief.

Your job is to find those topics across many calls at once, generalize them past the
company that raised them, and hand back a small ranked shortlist worth the team's time.

The reference example: two startups (Archon, Lemma) wanted eve agents but ran Postgres on
AWS RDS and assumed it would not work. That became one broad topic, "give your agent
secure access to a private database in your own cloud", which became an article plus a
webinar. That is the target shape. **Not** "help Archon connect RDS".

## 1. Scope the sweep

Defaults, unless the user says otherwise:

- **Window:** the last 7 days.
- **Whose calls:** the entire org, not just the caller.
- **Account focus:** startups and emerging accounts are the priority audience. Enterprise
  calls stay in the sweep, but only keep an enterprise-sourced topic if the same question
  would land for a startup building on Vercel. Renewals, security reviews, QBRs, and pure
  commercial negotiations are almost never topics.

Echo the resolved scope in your first Slack reply ("swept 61 calls, Jul 30 - Aug 6,
org-wide") so the user can correct it before you go deep.

## 2. Pull the calls

Use the **Index connection**. Discover its tools with `connection_search`; they are exposed
as `index__...` and cover meeting search, granular call insights and objections, thematic
signals across accounts, and Salesforce account data. Read the tool schemas before calling,
and set the scope parameter to the org-wide value rather than the caller's own meetings.

Work in two passes so dozens of calls stay cheap:

1. **Triage pass.** List every call in the window with its recap, key points, and next
   steps. Drop anything with no technical content. Mark a call as a *candidate* when it
   shows one of the signals in section 3.
2. **Deep pass.** Only for candidates, pull the granular insights, objections, or
   transcript excerpts you need to quote accurately. Cap this at roughly 20 calls; if more
   qualify, take the ones with the strongest signals and **say in Slack how many you
   skipped**. Never let a cap silently read as full coverage.

Also try a thematic or cross-account search on your top one or two hypotheses. It can
confirm a pattern is bigger than the window you swept, which is strong evidence for
prioritizing it.

## 3. What counts as a signal

You are hunting for a **teachable blocker**: the customer wanted something, thought it was
not possible or not worth the effort, and it is solvable today with the current product.

Strong signals:

- "We didn't realize you could do that", "does Vercel support...", visible surprise.
- A described workaround that exists only because they did not know the real path (CSV
  exports, a proxy box, a separate cloud, manual config per project).
- An evaluation stalled on a belief about security, networking, compliance, isolation, or
  cost that a setup guide would resolve.
- The same setup question asked by unrelated accounts.
- A pattern the team has built internally and never externalized.

Not signals: pricing negotiation, contract and commit mechanics, account-specific bugs,
roadmap asks with no shippable answer today, and anything already well covered (section 5).

## 4. Cluster into broad topics

Group signals from different calls into one topic when the underlying question is the same,
even if the nouns differ. Snowflake, Benchling, and RDS are all "live access to governed
data in systems we do not host".

Name each topic as the thing a reader wants to accomplish, product-shaped and
company-neutral. Good: "Run isolated per-tenant services at 100k scale". Bad: "Manus
isolation questions". If a topic only makes sense with one company's name in it, you have
not generalized it yet.

A single high-signal call is enough to shortlist a topic. Repetition across accounts raises
its rank, it is not a requirement.

## 5. Check what already exists

Before shortlisting, avoid proposing something the team already shipped:

- The demo hub clone in the sandbox lists published content. Check `lib/demos/index.ts` and
  `content/g/_meta.js` with the sandbox tools (`bash`, `read_file`, `grep`).
- Ask the user if you suspect a Notion draft or past webinar covers it.

If close prior art exists, keep the topic only if the new angle is materially different,
and say what the delta is ("we have the RDS piece; this is the same pattern for warehouses
and SaaS APIs"). Otherwise drop it and mention it was already covered.

## 6. Rank

Score each topic 1-5 on five axes, and keep the rationale to one line each:

| Axis | Question |
| --- | --- |
| Reach | How many distinct accounts hit this, and how many more likely will? |
| Solvability | Can we fully answer it today with the shipped product? |
| Impact | Was it actually blocking adoption, expansion, or a build? |
| Novelty | Is it absent from the hub, docs, and past webinars? |
| Demo-ability | Is there a crisp thing to show on screen with a real aha moment? |

Shortlist 3 to 6 topics. A topic scoring low on Solvability is not a content topic, route
it instead (section 7).

## 7. The routing section

Some findings are real and worth surfacing but content cannot fix them. Give them one
compact section at the end of the Slack reply, one line each, no write-up:

- **Product gaps** (missing capability) with the accounts that hit them, for PM.
- **Pricing and commercial objections** for the sales and pricing partners.
- **Docs bugs** (the answer exists but the docs are wrong or unfindable) for docs.

## 8. Discuss in Slack, then write

Post the shortlist in Slack first. Keep each entry tight: topic title, the accounts and
call dates it came from, one line on the misconception versus the reality, the proposed
format, and the score. Then the routing section. Then ask which to write up, and offer to
merge, split, re-scope, or dig deeper into any of them.

**Do not create Notion pages until the user explicitly approves specific topics.** Expect a
few rounds of back and forth. When they approve, create one Notion page per approved topic
using the brief template below, and reply with the links.

Use the **Notion connection** (`connection_search`, tools are `notion__...`) to create each
page at the workspace root unless the user points you at a parent. It is user-scoped, so
the first time a person triggers it an authorization link appears in Slack; tell them to
click it once and the run resumes.

## The Notion topic brief

This brief is the handoff to the next agent, which builds the demo, slides, and graphics.
Write it so that agent can start without re-reading the calls, and mark every unknown with
an explicit `TODO:` rather than guessing. Keep the voice concise and **use no em dashes**.

The fields for **Title**, **Summary**, **Tags**, **At a glance**, **Requirements**, and
**Steps** deliberately match what `build-guide-from-doc` expects, so an approved brief can
be edited and published as a `/g/<slug>` build guide without restructuring.

- **Title** — action-oriented and company-neutral, e.g. "Give your eve agent secure access
  to your private AWS RDS database".
- **Summary** — one or two sentences: what a reader learns and the end result.
- **Tags** — 3 to 5 short tags (products, concepts).
- **Evidence** — a table of the calls behind this topic: account, date, call link, and a
  short near-verbatim quote of what they said. This is what makes the brief trustworthy.
  Do not paraphrase a quote into something stronger than what was said.
- **The misconception vs the reality** — two short paragraphs. What customers believe, and
  what is actually true today. This is the spine of the whole piece.
- **Audience** — who hits this (stage, stack, role) and what they are trying to build.
- **Recommended format** — one primary (article, short demo video, webinar, or docs PR)
  plus any secondary. Say why. Deep setup with many gotchas favors an article; a visible
  before and after favors video; a broad architectural shift favors a webinar.
- **At a glance** — four rows: what you build, what you need, what it covers, how long it
  takes.
- **Requirements** — accounts, plans, and tools needed, each with a one-line note and link.
  Call out plan gating explicitly (for example Enterprise-only features), since that
  changes who the piece is for.
- **Steps** — the ordered outline, 4 to 7 steps, each with a title, one or two sentences,
  and any command, prompt, or code. Follow the proven article shape:
  1. Why this is blocked today.
  2. The options and their tradeoffs, as a comparison table where there is a real choice.
  3. **The key gotcha** — the one thing people get wrong. Every strong piece has one.
  4. Setup, in order, including the step people skip.
  5. The code, minimal and real.
  6. What happens at runtime, as a numbered flow.
  7. A final checklist.
- **Demo plan** — what to show on screen and in what order, where the aha moment lands, and
  what must be built or provisioned in advance. Note anything slow or costly to set up.
- **Assets to produce** — the specific diagrams, screenshots, and slides the next agent
  should make. Name each one, e.g. "architecture diagram: agent function to peered VPC to
  private database, with the sandbox path marked as blocked".
- **Products and primitives** — the Vercel features involved, so the next agent knows what
  to be accurate about.
- **Prior art to reuse** — existing hub guides, docs pages, internal patterns, past
  recordings.
- **Open questions** — what must be verified before publishing, each with a suggested owner
  from Evan, Will, or Neha. Be honest here. A brief that hides its unknowns wastes more
  time than one that lists ten.
- **Effort** — a rough estimate and a suggested owner.

## Notes and failure modes

- **Index is user-scoped.** It resolves the caller's token per call, so it cannot run
  without a user principal. Scheduled and background runs fail with `principal_required`.
  This skill only works when a person triggers it.
- **Evidence or it did not happen.** Every topic cites the calls it came from. If you
  cannot point at a call, it is your idea, not a finding, so label it that way.
- **Do not invent customer intent.** If a recap is thin, say the signal is weak rather than
  inflating it. A shortlist of three real topics beats six padded ones.
- **Stay broad.** If a proposed topic only helps the one account that raised it, it belongs
  in that account's follow-up, not on this list.
- **Report the sweep honestly.** Say how many calls were in the window, how many you read
  deeply, and what you skipped.
- Do not build or publish anything to the demo hub here. This skill ends at the Notion
  briefs. Publishing happens later via `build-guide-from-doc`.
