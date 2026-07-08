---
date: 2026-06-13
tags:
  - home
aliases:
  - Dashboard
---

# 🧠 Icy Chew Hao Yang's Life OS

> Claude automatically saves everything important from every conversation.

---

## ⚡ Quick Navigation

| Work | Life | System |
|------|------|--------|
| [[Boards/Studies\|📋 Work Board]] | [[Goals/2026 Goals\|🎯 Goals]] | [[Templates/\|📝 Templates]] |
| [[Boards/Personal\|📋 Personal]] | [[Finances/Income Streams\|💵 Income]] | [[Mentions/Mentions Log\|💬 Mentions]] |
| [[Projects/\|🔨 Projects]] | [[Health/Health Dashboard\|🏋️ Health]] | [[People/\|👥 People]] |

---

## 📅 Recent Daily Notes

```dataview
TABLE WITHOUT ID file.link AS "Day", mood AS "Mood", energy AS "Energy"
FROM "Daily"
SORT date DESC
LIMIT 7
```

---

## 📊 Vault Stats

```dataviewjs
const all = dv.pages("");
dv.paragraph(`📝 **${all.length}** total notes`);
```
