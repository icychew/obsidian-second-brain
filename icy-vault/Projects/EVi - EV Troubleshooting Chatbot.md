---
date: 2026-06-14
type: project
tags:
  - project
  - ai
  - ev
ai-first: true
status: active
related-people:
  - "[[Icy Chew Hao Yang]]"
related-projects:
  - "[[Coding Projects Index]]"
---

# EV Eye (EVi) - EV Troubleshooting Chatbot

## For future Claude
EV Eye is [[Icy Chew Hao Yang]]'s AI-Powered EV Charger Troubleshooting System, built for the ESUM x RExharge (Recharge Xolutions) Case Study Competition, Theme 2. Users report an EV-charger fault over WhatsApp with a photo and get safe guided troubleshooting or a structured technician handoff. Source is in his local "small ev" folder; the full project report is in his Google Drive. This is his strongest full-stack / applied-AI build. Confidence: stated by Icy and sourced from his project report (Drive, as of 2026-06).

## Overview
- Full name: AI-Powered EV Charger Troubleshooting System. Team name: EV Eye.
- Competition: ESUM x RExharge Case Study Competition, Theme 2 (EV Charger Troubleshooting); pitched at a conference-level presentation to industry judges.
- Flow: user reports a fault on WhatsApp, submits charger info + a photo, and receives safe guided troubleshooting or a technician handoff.

## Architecture / stack
- Orchestration: n8n workflow (~68 nodes, ~75 connections) covering intake, diagnosis, ticketing, and booking.
- Messaging: WhatsApp via WPP Connect / Evolution API.
- State + data: Redis (session state) + Supabase (Postgres, Storage, pgvector).
- AI: OpenAI GPT-4V and a custom Roboflow vision model in parallel for fault classification; OpenAI embeddings + Supabase vector search for RAG (similar-case retrieval).
- Booking: Google Calendar OAuth2. Security: bearer-token webhook auth + deduplication logic.
- Decision engine: safety-first confidence threshold (about 0.40) + sanity checks to separate user-resolvable issues from technician-required faults.
- Extra: a multilingual (English / Malay / Mandarin) voice-enabled AR assistant.

## Status
- MVP built and pitched (2026). Judges included Mr. Haitham Alnaeb, Mr. Damon Leong, Mr. Aaron Lee, and Mr. Wuen Han Lee.

## Open questions
- Result / placing at the competition, and current deployment status?
- Teammates' names - see [[People to Add]].

## Recent Activity

```dataview
LIST FROM "Daily"
WHERE contains(file.outlinks, this.file.link)
SORT date DESC
LIMIT 5
```
