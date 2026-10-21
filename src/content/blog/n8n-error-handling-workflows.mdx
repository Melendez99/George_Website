---
title: "Error handling in n8n: how to build workflows that tell you when they break"
description: "Practical n8n error handling: error workflows, retries, Slack alerts, dead-letter tables and logging so failures never go unnoticed."
date: 2026-10-21
tags: [n8n, Error handling, Reliability]
---
A workflow that runs fine in testing can fail quietly in production. An API times out, a field arrives empty, a token expires, and a lead disappears. The fix is to plan for failure before you build the happy path.

## 1. Add a global error workflow

n8n lets you set one workflow as the error handler for others. Create it once: it receives the failing workflow's name, the node that broke, and the error message, then posts to Slack or email. Attach it to every production workflow.

## 2. Retry the things that fail randomly

Network calls fail for boring reasons. On HTTP and API nodes, turn on **Retry On Fail** with two or three attempts and a short wait. Most timeouts clear on the second try.

## 3. Branch on expected failures

Some failures are normal: no match found, empty list, invalid email. Use an IF node or the node's error output to route those cases somewhere useful instead of letting the run crash.

## 4. Keep a dead-letter table

When an item cannot be processed after retries, write it to an Airtable base or database table with the payload, the error and a timestamp. Nothing is lost, and you can replay the items once the problem is fixed.

## 5. Check for duplicates

Retries and re-runs create duplicate records. Before creating a contact or deal, search for an existing one by email or a unique ID. This is one of the most common edge cases I design around.

## 6. Make alerts readable

An alert that says "Workflow failed" wastes time. Include the client, the workflow, the step, the item ID and a link to the execution. Whoever reads it should know what to do in ten seconds.

## 7. Document it

Write a short note for each workflow: what triggers it, what it touches, what the alerts mean, and where the dead-letter table lives. Your future self, or the next developer, will thank you.

## A simple test

Before you ship, break the workflow on purpose: send an empty field, revoke a credential, disconnect an app. If you hear about it within a minute and lose no data, it is ready.
