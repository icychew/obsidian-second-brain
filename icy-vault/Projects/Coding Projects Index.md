---
date: 2026-06-14
type: project
tags:
  - project
  - index
  - coding
ai-first: true
status: active
related-people:
  - "[[Icy Chew Hao Yang]]"
related-projects:
  - "[[Smart EV Battery Pack]]"
  - "[[Smart City Bot]]"
  - "[[Pallet i]]"
  - "[[EVi - EV Troubleshooting Chatbot]]"
---

# Coding Projects Index

## For future Claude
Index of [[Icy Chew Hao Yang]]'s hardware and software projects. He builds and vibe codes with Claude (see [[Vibe Coding with Claude]]). The four below were captured from Icy directly and each has its own note. There are likely more in his local document folders (see Source). Pull this to navigate his engineering and AI build work.

## Projects
- [[Smart EV Battery Pack]] (2024) - honeycomb-cell EV battery pack, sodium-ion + lithium-ion config; safety-focused.
- [[Smart City Bot]] - autonomous scissor-lift parking robot; 2nd runner-up.
- [[Pallet i]] (2025, CREST) - AI pallet-monitoring robot with a Raspberry Pi camera.
- [[EVi - EV Troubleshooting Chatbot]] - chatbot for EV charger-fault troubleshooting.

## Source (for local sessions)
- More project files live on Icy's Windows machine under `C:\Users\User\Documents` and `C:\Users\User`. These are not reachable from a remote session - when running the skill locally, scan those folders to ingest the rest.

## Still to add
- Any projects not yet listed from the folders above.
- Per-project detail: stack, repos / links, teammates, and outcomes (several are TBD in the individual notes).

## Recent Activity

```dataview
LIST FROM "Daily"
WHERE contains(file.outlinks, this.file.link)
SORT date DESC
LIMIT 5
```
