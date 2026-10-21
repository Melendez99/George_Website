---
title: How to automate lead follow-up with n8n
description: "A practical walkthrough of a lead follow-up workflow in n8n: capture, enrich, route and reply within minutes."
date: 2026-10-21
tags: [n8n, Lead generation, Automation]
---
Most leads go cold because nobody replies fast enough. A simple n8n workflow can respond in under a minute, route the lead to the right person, and keep following up until they answer.

## The workflow in four steps

1. **Capture.** A webhook receives the form submission or ad lead.
2. **Enrich.** Look up the company or role, so the reply and the routing make sense.
3. **Route.** Create the contact in your CRM and assign an owner.
4. **Reply.** Send a personal-sounding email or WhatsApp message with a booking link.

## Add a safety net

Add an error workflow that posts to Slack or email when a step fails. A lead you never hear about is a lead you lose.

## Where to go next

Add a follow-up branch that waits a day, checks whether the lead replied or booked, and sends a second message if not.

This is a starter post. Replace it with your own write-up, or delete this file.
