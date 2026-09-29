---
title: 'Relay'
description: 'Events from different services form one clear chain.'
projectId: 'relay'
locale: en
year: 2023
order: 1
tone: accent
category: 'Integrations'
lead: 'An integration layer concept that lets services exchange events without losing them during failures.'
technologies:
  - 'Node.js'
  - 'TypeScript'
---

### The challenge

Each service has its own data format and pace. Direct connections soon become fragile and hard to diagnose.

### The approach

Events follow a shared contract, pass through a queue, and retain delivery history. Retries stay visible and manageable.
